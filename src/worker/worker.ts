import { JSONPath } from 'jsonpath-plus'

type Callback = (data: any) => void

export function processData(query: string, json: any, cb: Callback): void {
  console.log('eval start')
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
    console.log('eval done')
}
