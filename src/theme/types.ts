import {CSSObject} from 'styled-components'
import {BaseTheme, ThemeColor} from './lib/theme'

export type RootTheme = BaseTheme<Styles>

export interface Styles {
  button?: {
    root?: CSSObject
  }
  card?: {
    root?: CSSObject
  }
}

export interface Theme {
  sanity: Omit<RootTheme, 'color'> & {
    color: ThemeColor
  }
}
