import {defaultThemeConfig} from '../defaults/config'
import {Theme, Theme_v2} from '../system'
import {themeColor_v0_v2} from './themeColor_v0_v2'

const cache = new WeakMap<Theme, Theme_v2>()

/** @public */
export function getTheme_v2(theme: Theme): Theme_v2 {
  if (theme.sanity.v2?._resolved) return theme.sanity.v2

  const cached_v2 = cache.get(theme)

  if (cached_v2) return cached_v2

  const v2: Theme_v2 = {
    _version: 2,
    _resolved: true,
    avatar: {
      ...defaultThemeConfig.avatar,
      ...theme.sanity.avatar,
    },
    button: {
      ...defaultThemeConfig.button,
      ...theme.sanity.button,
    },
    card: defaultThemeConfig.card,
    color: themeColor_v0_v2(theme.sanity.color),
    container: theme.sanity.container,
    font: theme.sanity.fonts,
    input: {
      ...defaultThemeConfig.input,
      ...theme.sanity.input,
      checkbox: {
        ...defaultThemeConfig.input.checkbox,
        ...theme.sanity.input.checkbox,
      },
      radio: {
        ...defaultThemeConfig.input.radio,
        ...theme.sanity.input.radio,
      },
      switch: {
        ...defaultThemeConfig.input.switch,
        ...theme.sanity.input.switch,
      },
    },
    layer: theme.sanity.layer ?? defaultThemeConfig.layer,
    media: theme.sanity.media,
    radius: theme.sanity.radius,
    shadow: theme.sanity.shadows,
    space: theme.sanity.space,
    style: theme.sanity.styles,
  }

  cache.set(theme, v2)

  return v2
}
