import { JSONPath } from 'jsonpath-plus'
import * as Comlink from 'comlink'

type Callback = (data: any) => void

console.log('worker here')

class Foo {
  process(query: string, json: any, cb: Callback) {
    console.log('processData start', { query, json })
    try {
      JSONPath({
        path: query,
        json,
        callback: (value, type, full) => {
          cb({
            value,
            type,
            full,
          })
        },
      })
    } catch (error) {
      console.warn('oops!', error)
    }
    console.log('processData done')
  }
}

Comlink.expose(Foo)
