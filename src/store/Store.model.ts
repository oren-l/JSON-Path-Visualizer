import { flow, makeAutoObservable } from 'mobx'
import { JSONPath } from 'jsonpath-plus'
import { nanoid } from 'nanoid'

import { readFile } from 'src/features/FileLoader'
import { QueryResult, Snapshot as QueryResultSnapshot } from 'src/features/Query/Result/QueryResult.model'


export interface Snapshot {
  json: string | null,
  loading: boolean,
  query: string,
  queryResults: QueryResultSnapshot[],
}

type GetSnapshot = (instance: Store) => Snapshot
type FromSnapshot = (snapshot: Snapshot) => Store

const defaultState: Snapshot = {
  json: null,
  loading: false,
  query: '$',
  queryResults: [],
}


export class Store {
  json: string | null
  loading: boolean
  query: string
  queryResults: QueryResult[]

  static fromSnapshot: FromSnapshot = snapshot => {
    return new Store(snapshot)
  }

  static getSnapshot: GetSnapshot = ({ json, loading, query, queryResults }) => ({
    json,
    loading,
    query,
    queryResults: queryResults.map(QueryResult.getSnapshot),
  })

  constructor(initialState: Snapshot = defaultState) {
    const { json, loading, query, queryResults } = initialState

    this.json = json
    this.loading = loading
    this.query = query
    this.queryResults = queryResults.map(QueryResult.fromSnapshot)

    makeAutoObservable(this, {
      loadFile: false
    })
  }

  get jsonAsObject() {
    return JSON.parse(this.json ?? '""')
  }

  loadFile = flow(function* (this: Store, file: File) {
    this.loading = true
    this.json = null
    this.json = yield readFile(file)
    this.loading = false
    console.log('done loading')
    this.evaluateQuery()

    // TODO: handle exception
    // TODO: implement abort
  }).bind(this)

  setQuery = (query: string) => {
    this.query = query
    this.evaluateQuery()
  }

  evaluateQuery = () => {
    this.queryResults = []
    this.loading = true
    console.log('eval start')
    try {
      JSONPath({
        path: this.query,
        json: this.jsonAsObject,
        callback: (value, type, full) => {
          this.addQueryResult(value)
          console.log('results:', this.queryResults.length)
          // console.log('node', {
          //   value,
          //   type,
          //   full
          // })
        }
      })
    } catch (error) {
      console.warn('oops!', error)
    }
    console.log('eval done')
    this.loading = false
  }

  addQueryResult = (result: unknown) => {
    // console.log('add:', result)
    const qr = new QueryResult(nanoid(), result)
    this.queryResults.push(qr)
  }
}
