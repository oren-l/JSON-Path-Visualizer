import * as Comlink from 'comlink'

import Worker from 'src/worker'

type Callback = (data: any) => void

// Create new instance
const instance = new Worker()

export async function evalQuery(query: string, json: any, cb: Callback) {
  await instance.processData(query, json, Comlink.proxy(cb))
  console.log('done!')
}
