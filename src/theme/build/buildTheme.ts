import {ThemeConfig} from '../config'
import {RootTheme} from '../types'
import {buildColorTheme, renderColorTheme} from './color'
import {defaultThemeConfig} from './defaults/config'
import {defaultThemeFonts} from './defaults/fonts'

/** @internal */
export function buildTheme(config?: ThemeConfig): RootTheme {
  const colorTheme = buildColorTheme(config)

  return {
    ...defaultThemeConfig,
    color: renderColorTheme(colorTheme, config),
    fonts: defaultThemeFonts,
  }
}
