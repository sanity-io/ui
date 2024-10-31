import {type RootTheme} from '@sanity/ui/theme'

import {compileTheme_v3} from './compileTheme_v3'

export function compileTheme(theme: RootTheme): string {
  if (theme.v3) {
    return compileTheme_v3(theme.v3)
  }

  if (theme.v2) {
    return `/* v2 - not supported */\n`
  }

  return `/* v0 - not supported */\n`
}
