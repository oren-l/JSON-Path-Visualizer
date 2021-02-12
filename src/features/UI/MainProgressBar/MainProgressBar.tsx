import LinearProgress from '@material-ui/core/LinearProgress'
import { observer } from 'mobx-react-lite'
import { useStore } from 'src/store'


export const MainProgressBar = observer(function MainProgressBar() {
  const store = useStore()
  return <LinearProgress hidden={store.loading === false} />
})
