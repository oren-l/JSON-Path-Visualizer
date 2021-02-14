import { observer } from 'mobx-react-lite'
import { action } from 'mobx'
import TextField from '@material-ui/core/TextField'

import { useStore } from 'src/store'


export const QueryInput = observer(function QueryInput() {
  const store = useStore()

  return (
    <TextField
      label='Path'
      variant='outlined'
      fullWidth
      margin='normal'
      value={store.query}
      onChange={action('query change', event => store.setQuery(event.target.value))}
    />
  )
})
