import {black, hues, white} from '@sanity/color'

import {defaultThemeConfig} from '../v2/defaults/config'
import {defaultThemeFonts} from './defaultFonts'
import {defaultTokens} from './defaultTokens'
import {resolveTokens} from './resolveTokens'
import type {Radius, Space, Theme_v3, ThemeOptions} from './types'

/** @public */
export function buildTheme_v3(options?: ThemeOptions): Theme_v3 {
  const {v2} = options ?? {}

  const tokens = resolveTokens(options?.tokens ?? defaultTokens)

  return {
    _version: 3,
    _tokens: tokens,
    avatar: v2?.avatar ?? defaultThemeConfig.avatar,
    button: v2?.button ?? defaultThemeConfig.button,
    card: v2?.card ?? defaultThemeConfig.card,
    color: tokens.color,
    container: v2?.container ?? defaultThemeConfig.container,
    font: defaultThemeFonts,
    input: v2?.input ?? defaultThemeConfig.input,
    layer: v2?.layer ?? defaultThemeConfig.layer,
    media: v2?.media ?? defaultThemeConfig.media,
    palette: {black, white, hues},
    // TODO
    radius: (v2?.radius ?? defaultThemeConfig.radius) as unknown as Record<Radius, number>,
    shadow: v2?.shadow ?? defaultThemeConfig.shadow,
    // TODO
    space: (v2?.space ?? defaultThemeConfig.space) as unknown as Record<Space, number>,
  }
}
