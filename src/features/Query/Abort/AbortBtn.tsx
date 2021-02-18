import styled from 'styled-components/macro'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'


const Spinner = styled(CircularProgress)`
  margin: ${props => props.theme.spacing(1)}px;
`


type Props = {
  onClick?: () => void
  isAborting: boolean
}

export function AbortBtn({
  onClick,
  isAborting,
}: Props) {

  return (
    <Button
      variant='contained'
      fullWidth
      onClick={onClick}
      disabled={isAborting}
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
