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
    avatar,
    button,
    color,
    container,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focusRing: _unused_focusRing,
    fonts: font,
    input,
    layer,
    media,
    radius,
    shadows: shadow,
    space,
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
