import { createMuiTheme } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    //  https://material-ui.com/customization/palette/
    type: 'dark',
    primary: {
      main: blue.A200,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
})
