import {RootTheme} from '../types'
import {RootTheme_v2} from '../v2'

/** @internal */
export function is_v0(themeProp: RootTheme | RootTheme_v2): themeProp is RootTheme {
  return themeProp._version === 0
}
