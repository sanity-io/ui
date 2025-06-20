import {black, hues, white} from '@sanity/color'

import {defaultColor} from './defaults/color'
import {defaultTheme} from './defaults/common'
import {defaultFonts} from './defaults/fonts'
import {resolveTokens} from './resolveTokens'
import type {Theme, ThemeOptions} from './types'

/** @public */
export function buildTheme(options?: ThemeOptions): Theme {
  const tokens = resolveTokens({
    ...options?.tokens,
    color: options?.tokens?.color ?? defaultColor,
  })

  return {
    _version: 3,
    _tokens: tokens,
    avatar: defaultTheme.avatar,
    button: defaultTheme.button,
    card: defaultTheme.card,
    color: tokens.color,
    container: defaultTheme.container,
    font: defaultFonts,
    input: defaultTheme.input,
    layer: defaultTheme.layer,
    media: defaultTheme.media,
    palette: {black, white, hues},
    radius: defaultTheme.radius,
    shadow: defaultTheme.shadow,
    space: defaultTheme.space,
  }
}
