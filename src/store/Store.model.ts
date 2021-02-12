import { flow, makeAutoObservable } from 'mobx'
import { readFile } from 'src/features/FileLoader'

export interface Snapshot {
  json: string | null
}

type GetSnapshot = () => Snapshot
type LoadSnapshot = (state: Snapshot) => void


export class Store {
  json!: string | null

  loadSnapshot: LoadSnapshot = state => {
    this.json = state.json
  }

  getSnapshot: GetSnapshot = () => ({
    json: this.json,
  })

  constructor (initialState: Snapshot) {
    this.loadSnapshot(initialState)
    makeAutoObservable(this, {
      loadFile: false,
    })
  }

  loadFile = flow(function * (this: Store, file: File) {
    this.json = yield readFile(file)
    // TODO: handle exception
    // TODO: show spinner
    // TODO: implement abort
  }).bind(this)
}
