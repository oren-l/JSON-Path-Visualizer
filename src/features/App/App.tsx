import styled from 'styled-components/macro'
import { Layout, Main, Toolbar, absoluteFill } from './Layout'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { FileDropzone } from 'src/features/FileLoader'
import { MainProgressBar } from 'src/features/UI/MainProgressBar'


import { ResultsList } from 'src/features/Query/Result/ResultsList'
import { QueryInput } from 'src/features/Query/QueryInput'


const FileDropzoneArea = styled(FileDropzone)`
  ${absoluteFill}
`

export function App() {
  return (
    <FileDropzoneArea>
      <Layout>
        <Toolbar>
          <Container>
            <Typography>
              JSON Path Visualizer
            </Typography>
          </Container>
        </Toolbar>
        <MainProgressBar />
        <Main>
          <Container>
            <QueryInput />
            <ResultsList />
          </Container>
        </Main>
      </Layout>
    </FileDropzoneArea>
  )
}
