import React from 'react'
import { Store } from './Store.model'


const storeContext = React.createContext<Store | null>(null)

export const StoreProvider = storeContext.Provider

export function useStore () {
  const store = React.useContext(storeContext)
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return store
}
