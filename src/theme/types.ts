import type {StyledObject} from 'styled-components'
import {BaseTheme, ThemeColor} from './lib/theme'

/**
 * Workaround types that are missing in v6
 * https://github.com/styled-components/styled-components/issues/4062
 * @internal
 * */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CSSObject = StyledObject<any>

/**
 * @public
 */
export type RootTheme = BaseTheme<Styles>

/**
 * TODO: Rename to `ThemeStyles`
 * @public
 */
export interface Styles {
  button?: {
    root?: CSSObject
  }
  card?: {
    root?: CSSObject
  }
}

/**
 * @public
 */
export interface Theme {
  sanity: Omit<RootTheme, 'color'> & {
    color: ThemeColor
  }
}

/**
 * @public
 */
export interface FocusRing {
  offset: number
  width: number
}
