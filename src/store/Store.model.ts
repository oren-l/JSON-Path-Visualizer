import { flow, makeAutoObservable } from 'mobx'

import { readFile } from 'src/features/FileLoader'
import { Query, Snapshot as QuerySnapshot } from 'src/features/Query/Query.model'
import { sleep } from 'src/utils/sleep'


export interface Snapshot {
  filename: string | null,
  json: string | null,
  loading: boolean,
  query: QuerySnapshot | null,
}

type GetSnapshot = (instance: Store) => Snapshot
type FromSnapshot = (snapshot: Snapshot) => Store

const defaultState: Snapshot = {
  filename: null,
  json: null,
  loading: false,
  query: null,
}


export class Store {
  filename: string | null
  json: string | null
  loading: boolean
  query: Query | null

  static fromSnapshot: FromSnapshot = snapshot => {
    return new Store(snapshot)
  }

  static getSnapshot: GetSnapshot = ({ filename, json, loading, query }) => ({
    filename,
    json,
    loading,
    query: query ? Query.getSnapshot(query) : null,
  })

  constructor(initialState: Snapshot = defaultState) {
    const { filename, json, loading, query } = initialState

    this.filename = filename
    this.json = json
    this.loading = loading
    this.query = query ? new Query(query) : null

    makeAutoObservable(this, {
      loadFile: false,
      setQuery: false,
    })
  }

  get jsonAsObject() {
    return JSON.parse(this.json ?? '""')
  }

  loadFile = flow(function* loadFile(this: Store, file: File) {
    this.filename = file.name
    this.loading = true
    this.json = null
    this.json = yield readFile(file)
    this.loading = false
    console.log('done loading')
    this.setQuery('$')

    // TODO: handle exception
    // TODO: implement abort
  }).bind(this)

  setQuery = flow(function* setQuery(this: Store, query: string) {
    this.query?.abort() // abort last query exec
    yield sleep() // hack that solves new query not being executed
    this.loading = true
    console.log('new query:', query)
    this.query = new Query({
      expression: query,
      results: [],
      resultsPerPage: 10,
      currentPage: 1,
    })
    try {
      yield this.query.exec(this.jsonAsObject)
      this.loading = false
    } catch (error) {
      if (error !== 'abort') {
        console.error(error)
      }
      console.warn('exec aborted')
      this.loading = false
    }
  }).bind(this)
}
