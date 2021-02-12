import { flow, makeAutoObservable } from 'mobx'
import { readFile } from 'src/features/FileLoader'

export interface Snapshot {
  json: string | null,
  loading: boolean,
}

type GetSnapshot = () => Snapshot
type LoadSnapshot = (state: Snapshot) => void

const defaultState: Snapshot = {
  json: null,
  loading: false
}


export class Store {
  json!: string | null
  loading!: boolean

  loadSnapshot: LoadSnapshot = state => {
    this.json = state.json
    this.loading = state.loading
  }

  getSnapshot: GetSnapshot = () => ({
    json: this.json,
    loading: this.loading,
  })

  constructor (initialState: Snapshot = defaultState) {
    this.loadSnapshot(initialState)
    makeAutoObservable(this, {
      loadFile: false,
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

    // TODO: handle exception
    // TODO: implement abort
  }).bind(this)
}
