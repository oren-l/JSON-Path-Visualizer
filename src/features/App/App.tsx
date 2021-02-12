import styled from 'styled-components/macro'
import { Layout, Main, Toolbar, absoluteFill } from './Layout'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { FileDropzone } from 'src/features/FileLoader'
import { JsonViewer } from 'src/features/JsonViewer'
import { MainProgressBar } from 'src/features/UI/MainProgressBar'


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
            <JsonViewer />
          </Container>
        </Main>
      </Layout>
    </FileDropzoneArea>
  )
}
