import {RootTheme, RootTheme_v2} from '../system'

/** @internal */
export function is_v0(themeProp: RootTheme | RootTheme_v2): themeProp is RootTheme {
  return themeProp._version === 0
}
