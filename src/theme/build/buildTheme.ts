import {type ThemeConfig} from '../config'
import {type RootTheme} from '../types'
import {buildTheme_v3, type Theme_v3} from '../v3'
import {v2_v0} from '../versioning/v2_v0'
import {v3_v2} from '../versioning/v3_v2'

/** @internal */
export function buildTheme(_config?: ThemeConfig): RootTheme {
  const v3: Theme_v3 = buildTheme_v3({v2: _config})

  return v2_v0(v3_v2(v3), v3)
}
