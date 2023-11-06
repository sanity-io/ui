import {ThemeConfig} from '../config'
import {RootTheme} from '../types'
import {buildColorTheme, renderThemeColorSchemes} from './color'
import {defaultThemeConfig} from './defaults/config'
import {defaultThemeFonts} from './defaults/fonts'

/** @internal */
export function buildTheme(config?: ThemeConfig): RootTheme {
  const colorTheme = buildColorTheme(config)

  return {
    ...defaultThemeConfig,
    color: renderThemeColorSchemes(colorTheme, config),
    fonts: defaultThemeFonts,
  }
}
