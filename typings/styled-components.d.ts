import {type Theme} from '../src/theme'

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
