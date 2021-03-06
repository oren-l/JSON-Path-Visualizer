import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { action } from 'mobx'
import TextField from '@material-ui/core/TextField'
import { useDebounceEffect } from 'ahooks'

import { useStore } from 'src/store'
import { useAutorun } from 'src/utils/mobx-hooks'


export const QueryInput = observer(function QueryInput() {
  const store = useStore()
  const [ temp, setTemp ] = useState<string>('')

  useAutorun(
    () => {
      if (store.query) {
        setTemp(store.query.expression)
      }
    },
    [ store ],
    { name: 'update query input from store' },
  )

  useDebounceEffect(
    action('query change', () => {
      store.setQuery(temp)
    }),
    [ store, temp ],
    { wait: 300 },
  )

  return (
    <TextField
      label='Path'
      variant='outlined'
      fullWidth
      margin='normal'
      value={temp}
      onChange={event => setTemp(event.target.value)}
    />
  )
})
