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
      // oxlint-disable-next-line no-deprecated
      ...theme.sanity.avatar,
    },
    button: {
      ...defaultThemeConfig.button,
      // oxlint-disable-next-line no-deprecated
      ...theme.sanity.button,
    },
    card: defaultThemeConfig.card,
    // oxlint-disable-next-line no-deprecated
    color: themeColor_v0_v2(theme.sanity.color),
    // oxlint-disable-next-line no-deprecated
    container: theme.sanity.container,
    // oxlint-disable-next-line no-deprecated
    font: theme.sanity.fonts,
    input: {
      ...defaultThemeConfig.input,
      // oxlint-disable-next-line no-deprecated
      ...theme.sanity.input,
      checkbox: {
        ...defaultThemeConfig.input.checkbox,
        // oxlint-disable-next-line no-deprecated
        ...theme.sanity.input.checkbox,
      },
      radio: {
        ...defaultThemeConfig.input.radio,
        // oxlint-disable-next-line no-deprecated
        ...theme.sanity.input.radio,
      },
      switch: {
        ...defaultThemeConfig.input.switch,
        // oxlint-disable-next-line no-deprecated
        ...theme.sanity.input.switch,
      },
    },
    // oxlint-disable-next-line no-deprecated
    layer: theme.sanity.layer ?? defaultThemeConfig.layer,
    // oxlint-disable-next-line no-deprecated
    media: theme.sanity.media,
    // oxlint-disable-next-line no-deprecated
    radius: theme.sanity.radius,
    // oxlint-disable-next-line no-deprecated
    shadow: theme.sanity.shadows,
    // oxlint-disable-next-line no-deprecated
    space: theme.sanity.space,
    // oxlint-disable-next-line no-deprecated
    style: theme.sanity.styles,
  }

  cache.set(theme, v2)

  return v2
}
