import { action, flow, makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'

import { QueryResult, Snapshot as QueryResultSnapshot } from './Result/QueryResult.model'
import { evalQuery, abort } from './evalQuery'


export interface Snapshot {
  expression: string,
  results: QueryResultSnapshot[],
  resultsPerPage: number,
  currentPage: number,
}

type GetSnapshot = (instance: Query) => Snapshot
type FromSnapshot = (snapshot: Snapshot) => Query


export class Query {
  expression: string
  results: QueryResult[]
  resultsPerPage: number
  currentPage: number
  isAborted: boolean = false

  constructor(initialState: Snapshot) {
    this.expression = initialState.expression
    this.results = initialState.results
    this.resultsPerPage = initialState.resultsPerPage
    this.currentPage = initialState.currentPage

    makeAutoObservable(this, {
      expression: false, // do not track id as it should never changes
      exec: false,
    })
  }

  static fromSnapshot: FromSnapshot = snapshot => {
    return new Query(snapshot)
  }

  static getSnapshot: GetSnapshot = instance => {
    const { expression, results, resultsPerPage, currentPage } = instance
    return {
      expression,
      results: results.map(QueryResult.getSnapshot),
      resultsPerPage,
      currentPage,
    }
  }

  addQueryResult = (result: unknown) => {
    // console.log('add:', result)
    if (this.isAborted) {
      return
    }
    const qr = new QueryResult(nanoid(), result)
    this.results.push(qr)
    console.log('results:', this.results.length)
  }

  exec = flow(function* exec(this: Query, jsonObj: unknown) {
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

  setCurrentPage = (page: number) => {
    this.currentPage = page
  }

  get resultsOnCurrentPage () {
    const start = (this.currentPage - 1) * this.resultsPerPage
    const end = start + this.resultsPerPage
    return this.results.slice(start, end)
  }
}
