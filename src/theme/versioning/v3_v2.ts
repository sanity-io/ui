import type {ThemeShadow} from '../v0'
import type {RootTheme_v2} from '../v2'
import type {Theme_v3} from '../v3'
import {themeColor_v3_v2} from './themeColor_v3_v2'

export function v3_v2(theme_v3: Theme_v3): RootTheme_v2 {
  const palette = theme_v3.palette

  return {
    _version: 2,
    avatar: theme_v3.avatar,
    button: theme_v3.button,
    card: theme_v3.card,
    color: {
      dark: {
        transparent: themeColor_v3_v2({
          color: theme_v3.color.transparent,
          dark: true,
          palette,
        }),
        default: themeColor_v3_v2({
          color: theme_v3.color.default,
          dark: true,
          palette,
        }),
        neutral: themeColor_v3_v2({
          color: theme_v3.color.neutral,
          dark: true,
          palette,
        }),
        primary: themeColor_v3_v2({
          color: theme_v3.color.primary,
          dark: true,
          palette,
        }),
        suggest: themeColor_v3_v2({
          color: theme_v3.color.suggest,
          dark: true,
          palette,
        }),
        positive: themeColor_v3_v2({
          color: theme_v3.color.positive,
          dark: true,
          palette,
        }),
        caution: themeColor_v3_v2({
          color: theme_v3.color.caution,
          dark: true,
          palette,
        }),
        critical: themeColor_v3_v2({
          color: theme_v3.color.critical,
          dark: true,
          palette,
        }),
      },
      light: {
        transparent: themeColor_v3_v2({
          color: theme_v3.color.transparent,
          dark: false,
          palette,
        }),
        default: themeColor_v3_v2({
          color: theme_v3.color.default,
          dark: false,
          palette,
        }),
        neutral: themeColor_v3_v2({
          color: theme_v3.color.neutral,
          dark: false,
          palette,
        }),
        primary: themeColor_v3_v2({
          color: theme_v3.color.primary,
          dark: false,
          palette,
        }),
        suggest: themeColor_v3_v2({
          color: theme_v3.color.suggest,
          dark: false,
          palette,
        }),
        positive: themeColor_v3_v2({
          color: theme_v3.color.positive,
          dark: false,
          palette,
        }),
        caution: themeColor_v3_v2({
          color: theme_v3.color.caution,
          dark: false,
          palette,
        }),
        critical: themeColor_v3_v2({
          color: theme_v3.color.critical,
          dark: false,
          palette,
        }),
      },
    },
    container: theme_v3.container,
    font: {
      code: {
        family: theme_v3.font.code.family,
        weights: theme_v3.font.code.weight,
        sizes: theme_v3.font.code.scale,
      },
      heading: {
        family: theme_v3.font.heading.family,
        weights: theme_v3.font.heading.weight,
        sizes: theme_v3.font.heading.scale,
      },
      label: {
        family: theme_v3.font.label.family,
        weights: theme_v3.font.label.weight,
        sizes: theme_v3.font.label.scale,
      },
      text: {
        family: theme_v3.font.text.family,
        weights: theme_v3.font.text.weight,
        sizes: theme_v3.font.text.scale,
      },
    },
    input: theme_v3.input,
    layer: theme_v3.layer,
    media: theme_v3.media,
    radius: Object.values(theme_v3.radius),
    shadow: Object.values(theme_v3.shadow) as unknown as Array<ThemeShadow | null>,
    space: Object.values(theme_v3.space),
  }
}
