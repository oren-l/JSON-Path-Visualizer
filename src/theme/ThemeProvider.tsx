import { ReactNode } from "react"
import { theme } from "./theme"
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  CssBaseline
} from '@material-ui/core'

type Props = {
  children: ReactNode,
}

export function ThemeProvider ({
  children
}: Props) {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
      </MuiThemeProvider>
    </StylesProvider>
  )
}
