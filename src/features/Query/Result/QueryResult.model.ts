import { makeAutoObservable } from 'mobx'

export interface Snapshot {
  id: string,
  data: string,
}

type GetSnapshot = (instance: QueryResult) => Snapshot
type FromSnapshot = (snapshot: Snapshot) => QueryResult


export class QueryResult {
  readonly id: string
  readonly data: unknown

  constructor(id: string, data: unknown) {
    this.id = id
    this.data = data

    makeAutoObservable(this, {
      id: false, // do not track id as it should never changes
      data: false, // do not track id as it should never changes
    })
  }

  static getSnapshot: GetSnapshot = instance => {
    return {
      id: instance.id,
      data: JSON.stringify(instance.data),
    }
  }

  static fromSnapshot: FromSnapshot = snapshot => {
    const { id, data } = snapshot
    return new QueryResult(id, JSON.parse(data))
  }
}
