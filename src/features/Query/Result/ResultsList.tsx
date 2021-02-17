import { observer } from 'mobx-react-lite'
import { useStore } from 'src/store'
import Paper from '@material-ui/core/Paper'

export const ResultsList = observer(function ResultsList() {
  const store = useStore()

  return (
    <>
      {
        store.query?.results
          .slice(0, 10) // TODO: replace with pagination
          .map(result => (
            <Paper key={result.id} >
              <pre>
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </Paper>
          ))
      }
    </>
  )
})
