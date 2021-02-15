import { action, flow, makeAutoObservable } from 'mobx'
import { nanoid } from 'nanoid'

import { readFile } from 'src/features/FileLoader'
import { QueryResult, Snapshot as QueryResultSnapshot } from 'src/features/Query/Result/QueryResult.model'

import { evalQuery } from 'src/features/Query/evalQuery'

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
      loadFile: false,
      evaluateQuery: false,
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

  evaluateQuery = flow(function* (this: Store) {
    this.queryResults = []
    this.loading = true
    console.log('eval start')
    yield evalQuery(this.query, this.jsonAsObject, action('result node found', (data: any) => {
      this.addQueryResult(data.value)
      console.log('results:', this.queryResults.length)
      // console.log('node', {
      //   value,
      //   type,
      //   full
      // })
    }))
    console.log('eval done')
    this.loading = false
  }).bind(this)

  addQueryResult = (result: unknown) => {
    // console.log('add:', result)
    const qr = new QueryResult(nanoid(), result)
    this.queryResults.push(qr)
  }
}
