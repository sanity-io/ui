import {type RootTheme} from '@sanity/ui/theme'

import {_compileTheme_v3} from './_compileTheme_v3'

/** @internal */
export function _compileTheme(theme: RootTheme): string {
  if (theme.v3) {
    return _compileTheme_v3(theme.v3)
  }

  if (theme.v2) {
    return `/* v2 - not supported */\n`
  }

  return `/* v0 - not supported */\n`
}
