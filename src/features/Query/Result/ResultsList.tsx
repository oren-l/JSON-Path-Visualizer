import { observer } from 'mobx-react-lite'
import Paper from '@material-ui/core/Paper'
import { QueryResult } from './QueryResult.model'


type Props = {
  list: QueryResult[]
}

export const ResultsList = observer(function ResultsList({
  list,
}: Props) {

  return (
    <>
      {
        list.map(result => (
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
