import { observer } from 'mobx-react-lite'
import { useStore } from 'src/store'

export const JsonViewer = observer(function JsonViewer() {
  const store = useStore()

  return (
    <pre>
      {store.json?.slice(0, 10000)}
    </pre>
  )
})
