import React from 'react'
import ReactDOM from 'react-dom'
import 'fontsource-roboto'
import App from './App'
import { ThemeProvider } from "src/theme"

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
