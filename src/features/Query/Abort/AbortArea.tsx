import { observer } from 'mobx-react-lite'

import { useStore } from 'src/store'
import { AbortBtn } from './AbortBtn'

export const AbortArea = observer(function AbortArea () {
  const store = useStore()

  const showAbortBtn = Boolean(store.loading && store.query)

  return showAbortBtn
    ? (
      <AbortBtn
        isAborting={Boolean(store.query?.isAborted)}
        onClick={store.query?.abort}
      />
    )
    : null
})
