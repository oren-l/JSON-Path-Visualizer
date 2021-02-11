import styled from "styled-components/macro"
import { Layout, Main, Toolbar, absoluteFill } from "./Layout"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import { FileDropzone } from "src/features/FileLoader"

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
        <Main>
          <Container>
            Hello World!
          </Container>
        </Main>
      </Layout>
    </FileDropzoneArea>
  )
}
