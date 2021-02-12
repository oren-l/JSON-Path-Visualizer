import { JSONPath } from 'jsonpath-plus'
import { observer } from 'mobx-react-lite'
import { useStore } from 'src/store'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { useState } from 'react'

export const JsonViewer = observer(function JsonViewer() {
  const [ path, setPath ] = useState<string>('$')
  const store = useStore()

  let result: any

  try {
    result = JSONPath({
      path,
      json: store.jsonAsObject,
      callback: (value, type, full) => {
        console.log('node', {
          value,
          type,
          full
        })
      }
    })
  } catch (error) {
    console.warn('oops!', error)
  }

  console.log('result:', result)


  return (
    <>
      <TextField
        label='Path'
        variant='outlined'
        fullWidth
        margin='normal'
        value={path}
        onChange={event => setPath(event.target.value)}
      />

      <Paper>
        <pre>
          {JSON.stringify(result, null, 2)}
        </pre>
      </Paper>
    </>
  )
})
