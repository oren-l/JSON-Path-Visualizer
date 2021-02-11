import React from 'react'
import ReactDOM from 'react-dom'
import 'fontsource-roboto'
import { App } from "src/features/App"
import { ThemeProvider } from "src/theme"

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
