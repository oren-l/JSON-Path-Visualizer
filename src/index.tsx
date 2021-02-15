import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import 'fontsource-roboto'
import { App } from 'src/features/App'
import { ThemeProvider } from 'src/theme'
import { StoreProvider, Store } from 'src/store'


import Worker from './worker'

import * as Comlink from 'comlink'


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

// Create new instance
const instance = new Worker()

function callback(data: any) {
  console.log('got data:', data)
}

async function init() {
  await instance.processData('$[*]', [ {}, {}, {}, {} ], Comlink.proxy(callback))
  console.log('done!')
}

init()
