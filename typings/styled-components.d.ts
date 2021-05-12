import {Theme} from '../src'

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
