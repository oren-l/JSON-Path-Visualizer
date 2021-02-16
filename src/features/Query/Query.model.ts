import { action, flow, makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'

import { QueryResult, Snapshot as QueryResultSnapshot } from './Result/QueryResult.model'
import { evalQuery, abort } from './evalQuery'


export interface Snapshot {
  expression: string,
  results: QueryResultSnapshot[],
}

type GetSnapshot = (instance: Query) => Snapshot
type FromSnapshot = (snapshot: Snapshot) => Query


export class Query {
  expression: string
  results: QueryResult[]
  isAborted: boolean = false

  constructor(initialState: Snapshot) {
    this.expression = initialState.expression
    this.results = initialState.results
    makeAutoObservable(this, {
      expression: false, // do not track id as it should never changes
      exec: false,
    })
  }

  static fromSnapshot: FromSnapshot = snapshot => {
    return new Query(snapshot)
  }

  static getSnapshot: GetSnapshot = ({ expression, results }) => ({
    expression,
    results: results.map(QueryResult.getSnapshot),
  })

  addQueryResult = (result: unknown) => {
    // console.log('add:', result)
    if (this.isAborted) {
      return
    }
    const qr = new QueryResult(nanoid(), result)
    this.results.push(qr)
    console.log('results:', this.results.length)
  }

  exec = flow(function* (this: Query, jsonObj: unknown) {
    this.isAborted = false
    yield evalQuery(this.expression, jsonObj, action('result node found', (data: any) => {
      this.addQueryResult(data.value)
      // console.log('node', {
      //   value,
      //   type,
      //   full
      // })
    }))
  }).bind(this)

  abort = () => {
    this.isAborted = true
    abort()
  }
}
