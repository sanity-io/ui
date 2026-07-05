import {defaultThemeConfig} from '../defaults/config'
import {RootTheme, RootTheme_v2} from '../system'
import {themeColor_v0_v2} from './themeColor_v0_v2'

const cache = new WeakMap<RootTheme, RootTheme_v2>()

/** @internal */
export function v0_v2(v0: RootTheme): RootTheme_v2 {
  if (v0.v2) return v0.v2

  const cached_v2 = cache.get(v0)

  if (cached_v2) return cached_v2

  const {
    // oxlint-disable-next-line no-deprecated
    avatar,
    // oxlint-disable-next-line no-deprecated
    button,
    // oxlint-disable-next-line no-deprecated
    color,
    // oxlint-disable-next-line no-deprecated
    container,
    // oxlint-disable-next-line no-deprecated
    focusRing: _unused_focusRing,
    // oxlint-disable-next-line no-deprecated
    fonts: font,
    // oxlint-disable-next-line no-deprecated
    input,
    // oxlint-disable-next-line no-deprecated
    layer,
    // oxlint-disable-next-line no-deprecated
    media,
    // oxlint-disable-next-line no-deprecated
    radius,
    // oxlint-disable-next-line no-deprecated
    shadows: shadow,
    // oxlint-disable-next-line no-deprecated
    space,
    // oxlint-disable-next-line no-deprecated
    styles: style,
  } = v0

  const v2: RootTheme_v2 = {
    _version: 2,
    avatar: {
      ...defaultThemeConfig.avatar,
      ...avatar,
    },
    button: {
      ...defaultThemeConfig.button,
      ...button,
    },
    card: defaultThemeConfig.card,
    color: {
      light: {
        transparent: themeColor_v0_v2(color.light.transparent),
        default: themeColor_v0_v2(color.light.default),
        neutral: themeColor_v0_v2(color.light.transparent),
        primary: themeColor_v0_v2(color.light.primary),
        suggest: themeColor_v0_v2(color.light.primary),
        positive: themeColor_v0_v2(color.light.positive),
        caution: themeColor_v0_v2(color.light.caution),
        critical: themeColor_v0_v2(color.light.critical),
      },
      dark: {
        transparent: themeColor_v0_v2(color.dark.transparent),
        default: themeColor_v0_v2(color.dark.default),
        neutral: themeColor_v0_v2(color.dark.transparent),
        primary: themeColor_v0_v2(color.dark.primary),
        suggest: themeColor_v0_v2(color.dark.primary),
        positive: themeColor_v0_v2(color.dark.positive),
        caution: themeColor_v0_v2(color.dark.caution),
        critical: themeColor_v0_v2(color.dark.critical),
      },
    },
    container,
    font,
    input: {
      ...defaultThemeConfig.input,
      ...input,
      checkbox: {
        ...defaultThemeConfig.input.checkbox,
        ...input.checkbox,
      },
      radio: {
        ...defaultThemeConfig.input.radio,
        ...input.radio,
      },
      switch: {
        ...defaultThemeConfig.input.switch,
        ...input.switch,
      },
    },
    layer: layer ?? defaultThemeConfig.layer,
    media,
    radius,
    shadow,
    space,
    style,
  }

  cache.set(v0, v2)

  return v2
}
