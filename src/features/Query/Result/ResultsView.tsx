import { observer } from 'mobx-react-lite'

import { useStore } from 'src/store'
import { ResultsList } from './ResultsList'


export const ResultsView = observer(function ResultsView() {
  const store = useStore()

  const isPartialResults = Boolean(!store.loading && store.query?.isAborted)
  const resultsCount = store.query?.results.length

  return (
    <>
      <div>
        <span>
          {`#Results: ${resultsCount}`}
        </span>
        <span>
          {
            isPartialResults && (' (!) Partial results')
          }
        </span>
      </div>
      <ResultsList />
    </>
  )
})
