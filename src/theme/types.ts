import type {ThemeColor} from './v0'
import type {RootTheme_v0} from './v0/theme'
import type {RootTheme_v2, Theme_v2} from './v2/theme'
import type {Theme_v3} from './v3'

/** @public */
export interface RootTheme extends RootTheme_v0 {
  v2?: RootTheme_v2
  v3?: Theme_v3
}

/** @public */
export type BaseTheme = RootTheme

/**
 * Used for the `theme` prop in `styled-components`’s `ThemeProvider`.
 *
 * @public
 */
export interface Theme {
  sanity: Omit<RootTheme, 'color' | 'v2'> & {
    /**
     * @deprecated Use `v2.color` instead
     */
    color: ThemeColor
    v2?: Theme_v2
  }
}
