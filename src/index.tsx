import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import 'fontsource-roboto'
import { App } from 'src/features/App'
import { ThemeProvider } from 'src/theme'
import { StoreProvider, Store } from 'src/store'

// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./worker/my.worker.ts'


configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
})


let store = new Store()

const renderApp = () => {
  ReactDOM.render(
    <ThemeProvider>
      <StoreProvider value={store}>
        <App />
      </StoreProvider>
    </ThemeProvider>,
    document.getElementById('root'),
  )
}


if (module.hot) {

  module.hot.accept([ 'src/features/App' ], () => {
    // only components code have changed, no need to reload state
    renderApp()
  })

  module.hot.accept([ 'src/store' ], () => {
    // store code have changed
    const snapshot = Store.getSnapshot(store)
    console.log('store reload from existing snapshot:', snapshot)
    store = Store.fromSnapshot(snapshot) // try create updated store from the existing snapshot
    renderApp()
  })

}


renderApp()

const worker = new Worker()

worker.postMessage({ a: 1 })
worker.onmessage = (event) => { console.log (event.data)}

worker.addEventListener('message', (event) => {})
