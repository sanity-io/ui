/* eslint-disable @typescript-eslint/no-explicit-any */

import {studioTheme} from '../src/theme'
import {buildTokenEntries} from './buildTokenEntries'
import {TokenEntry} from './types'

export function getThemeTokens(): TokenEntry[] {
  return buildTokenEntries(studioTheme as any)
}
