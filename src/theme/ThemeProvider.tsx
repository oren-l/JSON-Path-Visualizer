import { ReactNode } from 'react'
import { theme } from './theme'

import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  CssBaseline
} from '@material-ui/core'

import {
  ThemeProvider as StyledComponentsThemeProvider
} from 'styled-components/macro'

type Props = {
  children: ReactNode,
}

export function ThemeProvider ({
  children
}: Props) {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <StyledComponentsThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </StyledComponentsThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )
}
