import { flow, makeAutoObservable } from 'mobx'
import { readFile } from 'src/features/FileLoader'
import { JSONPath } from 'jsonpath-plus'

export interface Snapshot {
  json: string | null,
  loading: boolean,
  query: string,
  queryResults: unknown[],
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
  queryResults!: unknown[]

  loadSnapshot: LoadSnapshot = state => {
    this.json = state.json
    this.loading = state.loading
    this.query = state.query
    this.queryResults = state.queryResults
  }

  getSnapshot: GetSnapshot = () => ({
    json: this.json,
    loading: this.loading,
    query: this.query,
    queryResults: this.queryResults,
  })

  constructor (initialState: Snapshot = defaultState) {
    this.loadSnapshot(initialState)
    makeAutoObservable(this, {
      loadFile: false
    })
  }

  get jsonAsObject () {
    return JSON.parse(this.json ?? '""')
  }

  loadFile = flow(function * (this: Store, file: File) {
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
    this.queryResults.push(result)
  }
}
