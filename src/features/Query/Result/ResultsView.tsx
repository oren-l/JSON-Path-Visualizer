import styled from 'styled-components/macro'
import { observer } from 'mobx-react-lite'
import Pagination from '@material-ui/lab/Pagination'

import { useStore } from 'src/store'
import { ResultsList } from './ResultsList'
import { action } from 'mobx'

const CenteredPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
`


export const ResultsView = observer(function ResultsView() {
  const store = useStore()

  const isPartialResults = Boolean(!store.loading && store.query?.isAborted)
  const resultsCount = store.query?.results.length
  const resultsPerPage = store.query?.resultsPerPage

  const numOfPages = resultsCount && resultsPerPage
    ? Math.ceil(resultsCount / resultsPerPage)
    : 0

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
      {
        store.query && (
          <>
            <CenteredPagination
              shape="rounded"
              count={numOfPages}
              page={store.query.currentPage}
              onChange={action('changeResultPage', (e: any, page: number) => store.query?.setCurrentPage(page))}
            />
            <ResultsList
              list={store.query.resultsOnCurrentPage}
            />
          </>
        )
      }
    </>
  )
})
