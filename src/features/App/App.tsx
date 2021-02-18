import styled from 'styled-components/macro'
import { Layout, Main, Toolbar, absoluteFill } from './Layout'
import Container from '@material-ui/core/Container'
import { FileDropzone } from 'src/features/FileLoader'
import { MainProgressBar } from 'src/features/UI/MainProgressBar'


import { ResultsView } from 'src/features/Query/Result/ResultsView'
import { QueryInput } from 'src/features/Query/QueryInput'
import { AbortArea } from 'src/features/Query/Abort/AbortArea'
import { AppBar } from 'src/features/AppBar'


const FileDropzoneArea = styled(FileDropzone)`
  ${absoluteFill}
`

export function App() {
  return (
    <FileDropzoneArea>
      <Layout>
        <Toolbar>
          <AppBar />
        </Toolbar>
        <MainProgressBar />
        <Main>
          <Container>
            <QueryInput />
            <AbortArea />
            <ResultsView />
          </Container>
        </Main>
      </Layout>
    </FileDropzoneArea>
  )
}
