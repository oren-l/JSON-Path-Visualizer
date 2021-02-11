import styled from 'styled-components/macro'
import BackdropBase from '@material-ui/core/Backdrop'

export const Backdrop = styled(BackdropBase)`
  z-index: ${props => props.theme.zIndex.modal};
`
