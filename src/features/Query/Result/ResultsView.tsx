import styled from 'styled-components/macro'
import { observer } from 'mobx-react-lite'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useStore } from 'src/store'
import { ResultsList } from './ResultsList'


const Spinner = styled(CircularProgress)`
  margin: ${props => props.theme.spacing(1)}px;
`


export const ResultsView = observer(function ResultsView() {
  const store = useStore()

  const showAbortBtn = Boolean(store.loading && store.query)
  const isAborting = Boolean(store.query?.isAborted)
  const isPartialResults = Boolean(!store.loading && store.query?.isAborted)
  const resultsCount = store.query?.results.length

  return (
    <>
      {
        showAbortBtn && (
          <Button
            variant='contained'
            fullWidth
            onClick={store.query?.abort}
            disabled={store.query?.isAborted}
          >
            {
              isAborting
                ? (
                  <>
                    Aborting...
                    <Spinner size='1em' />
                  </>
                )
                : 'Abort'
            }
          </Button>
        )
      }
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
