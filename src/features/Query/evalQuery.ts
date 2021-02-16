import * as Comlink from 'comlink'

import Worker from 'src/worker'

type Callback = (data: any) => void

let worker: Worker | null = null
let proxy: any = null
let exit: any

export async function evalQuery(query: string, json: any, cb: Callback) {
  const p = new Promise((resolve, reject) => {
    exit = reject
  })
  worker = new Worker()
  proxy = Comlink.wrap(worker)
  const w = await new proxy()
  await Promise.race([
    p,
    w.process(query, json, Comlink.proxy(cb)),
  ])
  console.log('done!')
  worker.terminate()
  proxy[Comlink.releaseProxy]()
  worker = null
}


export function abort () {
  if (worker) {
    console.log('aborting...')
    worker.terminate()
    proxy[Comlink.releaseProxy]()
    exit('abort')
  }
}
