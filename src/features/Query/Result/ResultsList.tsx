import { observer } from 'mobx-react-lite'
import { useStore } from 'src/store'
import Paper from '@material-ui/core/Paper'
import { useVirtualList } from 'ahooks'

export const ResultsList = observer(function ResultsList() {
  const store = useStore()

  const { containerProps, wrapperProps, list } = useVirtualList(store.queryResults, {
    itemHeight: 60,
    overscan: 30
  })

  return (
    <div {...containerProps}>
      <div {...wrapperProps}>
        {
          list.map(({ data, index }) => (
            <Paper key={index} >
              <pre>
                {JSON.stringify(data, null, 2)}
              </pre>
            </Paper>
          ))
        }
      </div>
    </div>
  )
})
