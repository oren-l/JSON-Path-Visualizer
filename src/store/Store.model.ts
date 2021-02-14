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

type GetSnapshot = () => Snapshot
type LoadSnapshot = (state: Snapshot) => void

const defaultState: Snapshot = {
  json: null,
  loading: false,
  query: '$',
  queryResults: [],
}


export class Store {
  json!: string | null
  loading!: boolean
  query!: string
  queryResults!: QueryResult[]

  loadSnapshot: LoadSnapshot = state => {
    this.json = state.json
    this.loading = state.loading
    this.query = state.query
    this.queryResults = state.queryResults.map(QueryResult.fromSnapshot)
  }

  getSnapshot: GetSnapshot = () => ({
    json: this.json,
    loading: this.loading,
    query: this.query,
    queryResults: this.queryResults.map(QueryResult.getSnapshot),
  })

  constructor(initialState: Snapshot = defaultState) {
    this.loadSnapshot(initialState)
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
