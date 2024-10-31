// import {vars} from '@sanity/ui/css'

import {RootTheme_v2} from '../v2'
import {Theme_v3} from '../v3'
import {themeColor_v3_v2} from './themeColor_v3_v2'

export function v3_v2(theme_v3: Theme_v3): RootTheme_v2 {
  return {
    _version: 2,
    avatar: theme_v3.avatar,
    button: theme_v3.button,
    card: theme_v3.card,
    color: {
      dark: {
        transparent: themeColor_v3_v2({
          color: theme_v3.color.dark.card.transparent,
          dark: true,
          // vars: vars.color.dark.transparent,
        }),
        default: themeColor_v3_v2({
          color: theme_v3.color.dark.card.default,
          dark: true,
          // vars: vars.color.dark.default,
        }),
        neutral: themeColor_v3_v2({
          color: theme_v3.color.dark.card.neutral,
          dark: true,
          // vars: vars.color.dark.neutral,
        }),
        primary: themeColor_v3_v2({
          color: theme_v3.color.dark.card.primary,
          dark: true,
          // vars: vars.color.dark.primary,
        }),
        suggest: themeColor_v3_v2({
          color: theme_v3.color.dark.card.suggest,
          dark: true,
          // vars: vars.color.dark.suggest,
        }),
        positive: themeColor_v3_v2({
          color: theme_v3.color.dark.card.positive,
          dark: true,
          // vars: vars.color.dark.positive,
        }),
        caution: themeColor_v3_v2({
          color: theme_v3.color.dark.card.caution,
          dark: true,
          // vars: vars.color.dark.caution,
        }),
        critical: themeColor_v3_v2({
          color: theme_v3.color.dark.card.critical,
          dark: true,
          // vars: vars.color.dark.critical,
        }),
      },
      light: {
        transparent: themeColor_v3_v2({
          color: theme_v3.color.light.card.transparent,
          dark: false,
          // vars: vars.color.light.transparent,
        }),
        default: themeColor_v3_v2({
          color: theme_v3.color.light.card.default,
          dark: false,
          // vars: vars.color.light.default,
        }),
        neutral: themeColor_v3_v2({
          color: theme_v3.color.light.card.neutral,
          dark: false,
          // vars: vars.color.light.neutral,
        }),
        primary: themeColor_v3_v2({
          color: theme_v3.color.light.card.primary,
          dark: false,
          // vars: vars.color.light.primary,
        }),
        suggest: themeColor_v3_v2({
          color: theme_v3.color.light.card.suggest,
          dark: false,
          // vars: vars.color.light.suggest,
        }),
        positive: themeColor_v3_v2({
          color: theme_v3.color.light.card.positive,
          dark: false,
          // vars: vars.color.light.positive,
        }),
        caution: themeColor_v3_v2({
          color: theme_v3.color.light.card.caution,
          dark: false,
          // vars: vars.color.light.caution,
        }),
        critical: themeColor_v3_v2({
          color: theme_v3.color.light.card.critical,
          dark: false,
          // vars: vars.color.light.critical,
        }),
      },
    },
    container: theme_v3.container,
    font: theme_v3.font,
    input: theme_v3.input,
    layer: theme_v3.layer,
    media: theme_v3.media,
    radius: theme_v3.radius,
    shadow: theme_v3.shadow,
    space: theme_v3.space,
  }
}
