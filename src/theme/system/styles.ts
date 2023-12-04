import {CSSObject} from './css'

/**
 * @internal
 */
export interface ThemeStyles {
  button?: {
    root?: CSSObject
  }
  card?: {
    root?: CSSObject
  }
}

/**
 * @deprecated Use `ThemeStyles` instead
 * @internal
 */
export type Styles = ThemeStyles
