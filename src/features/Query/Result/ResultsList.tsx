import { observer } from 'mobx-react-lite'
import { useStore } from 'src/store'
import Paper from '@material-ui/core/Paper'

export const ResultsList = observer(function ResultsList() {
  const store = useStore()

  return (
    <>
      {
        store.queryResults.map((result, idx) => (
          <Paper key={idx} >
            <pre>
              {JSON.stringify(result, null, 2)}
            </pre>
          </Paper>
        ))
      }
    </>
  )
})
