import { theme } from './theme'

/**
 * Extends styled-components theme declaration to use our material-ui theme
 * @see https://styled-components.com/docs/api#create-a-declarations-file
 */

type Theme = typeof theme

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
