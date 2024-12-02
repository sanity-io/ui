import {defaultThemeConfig} from '../defaults/config'
import {defaultThemeFonts} from '../defaults/fonts'
import {buildColor_v3} from './color/buildColor_v3'
import {resolveTokens} from './resolveTokens'
import {ThemeOptions, Theme_v3} from './types'

export function buildTheme_v3(options?: ThemeOptions): Theme_v3 {
  const tokens = resolveTokens(options?.tokens)

  return {
    _version: 3,
    _tokens: tokens,
    avatar: defaultThemeConfig.avatar,
    button: defaultThemeConfig.button,
    card: defaultThemeConfig.card,
    color: buildColor_v3(tokens.color),
    container: defaultThemeConfig.container,
    font: defaultThemeFonts,
    input: defaultThemeConfig.input,
    layer: defaultThemeConfig.layer,
    radius: defaultThemeConfig.radius,
    shadow: defaultThemeConfig.shadow,
    space: defaultThemeConfig.space,
  }
}
