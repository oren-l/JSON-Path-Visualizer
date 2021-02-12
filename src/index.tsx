import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import 'fontsource-roboto'
import { App } from 'src/features/App'
import { ThemeProvider } from 'src/theme'
import { StoreProvider, Store } from 'src/store'


configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true
})


const store = new Store({
  json: null
})


ReactDOM.render(
  <ThemeProvider>
    <StoreProvider value={store}>
      <App />
    </StoreProvider>
  </ThemeProvider>,
  document.getElementById('root')
)
