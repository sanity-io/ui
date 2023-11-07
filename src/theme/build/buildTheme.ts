import {ThemeConfig} from '../config'
import {RootTheme} from '../system'
import {buildColorTheme} from './buildColorTheme'
import {defaultThemeConfig} from './defaults/config'
import {defaultThemeFonts} from './defaults/fonts'
import {renderThemeColorSchemes} from './renderColorTheme'

/** @internal */
export function buildTheme(config?: ThemeConfig): RootTheme {
  const colorTheme = buildColorTheme(config)

  return {
    avatar: config?.avatar ?? defaultThemeConfig.avatar,
    button: config?.button ?? defaultThemeConfig.button,
    card: config?.card ?? defaultThemeConfig.card,
    color: renderThemeColorSchemes(colorTheme, config),
    container: config?.container ?? defaultThemeConfig.container,
    focusRing: config?.focusRing ?? defaultThemeConfig.focusRing,
    fonts: config?.fonts ?? defaultThemeFonts,
    input: config?.input ?? defaultThemeConfig.input,
    media: config?.media ?? defaultThemeConfig.media,
    radius: config?.radius ?? defaultThemeConfig.radius,
    shadows: config?.shadows ?? defaultThemeConfig.shadows,
    space: config?.space ?? defaultThemeConfig.space,

    styles: config?.styles ?? defaultThemeConfig.styles,
  }
}
