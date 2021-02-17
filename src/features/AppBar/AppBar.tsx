import styled from 'styled-components/macro'
import { observer } from 'mobx-react-lite'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useTitle } from 'ahooks'

import { useStore } from 'src/store'


const FileText = styled.span`
  font-style: italic;
`

export const AppBar = observer(function AppBar() {
  const store = useStore()

  const loadedFile = store.filename ?? 'no file loaded'

  useTitle(`JSON Path Visualizer - ${loadedFile}`)

  return (
    <Container>
      <Typography>
        JSON Path Visualizer -
        <FileText>
          {` ${loadedFile}`}
        </FileText>
      </Typography>
    </Container>
  )
})
