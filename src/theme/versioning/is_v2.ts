import {RootTheme, RootTheme_v2} from '../system'

/** @internal */
export function is_v2(themeProp: RootTheme | RootTheme_v2): themeProp is RootTheme_v2 {
  return themeProp._version === 2
}
