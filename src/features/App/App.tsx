import { Layout, Main, Toolbar } from "./Layout"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"


export function App() {
  return (
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
  )
}
