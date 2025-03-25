import type { Theme } from '../src/theme/system/theme'

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
