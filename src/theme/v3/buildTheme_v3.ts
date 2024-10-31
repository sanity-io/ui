import {defaultThemeConfig} from '../defaults/config'
import {defaultThemeFonts} from '../defaults/fonts'
import {buildColor_v3} from './color/buildColor_v3'
import {defaultPalette, defaultTokens} from './defaults'
import {resolveTokens} from './resolveTokens'
import {Theme_v3, ThemeOptions} from './types'

export function buildTheme_v3(options?: ThemeOptions): Theme_v3 {
  const {v2} = options ?? {}

  const tokens = resolveTokens(options?.tokens ?? defaultTokens)

  return {
    _version: 3,
    _palette: options?.palette ?? defaultPalette,
    _tokens: tokens,
    avatar: v2?.avatar ?? defaultThemeConfig.avatar,
    button: v2?.button ?? defaultThemeConfig.button,
    card: v2?.card ?? defaultThemeConfig.card,
    color: buildColor_v3(tokens.color),
    container: v2?.container ?? defaultThemeConfig.container,
    font: v2?.font ?? defaultThemeFonts,
    input: v2?.input ?? defaultThemeConfig.input,
    layer: v2?.layer ?? defaultThemeConfig.layer,
    media: v2?.media ?? defaultThemeConfig.media,
    radius: v2?.radius ?? defaultThemeConfig.radius,
    shadow: v2?.shadow ?? defaultThemeConfig.shadow,
    space: v2?.space ?? defaultThemeConfig.space,
  }
}
