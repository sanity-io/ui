import {defineLazyProperty} from '../build/lib/lazy'
import {
  RootTheme,
  RootTheme_v2,
  ThemeColor,
  ThemeColorCard_v2,
  ThemeColorInputMode_v2,
  ThemeColorInputState,
  ThemeColorInputState_v2,
  ThemeColorInputStates,
  ThemeColorScheme,
} from '../system'

const cache = new WeakMap<RootTheme_v2, RootTheme>()

const V0_TONES = ['transparent', 'default', 'primary', 'positive', 'caution', 'critical'] as const

function lazyV0Scheme(schemeKey: 'light' | 'dark', color: RootTheme_v2['color']): ThemeColorScheme {
  const scheme = {} as ThemeColorScheme

  for (const tone of V0_TONES) {
    defineLazyProperty(scheme, tone, () => themeColor_v2_v0(color[schemeKey][tone]))
  }

  return scheme
}

/** @internal */
export function v2_v0(v2: RootTheme_v2): RootTheme {
  const cachedTheme = cache.get(v2)

  if (cachedTheme) return cachedTheme

  const {
    avatar,
    button,
    color,
    container,
    font: fonts,
    input,
    media,
    radius,
    shadow: shadows,
    space,
    style: styles,
  } = v2

  // Lazy v0 color — two-level lazy structure so we don't force-evaluate
  // the v2 lazy getters until a v0 tone is actually accessed.
  const v0Color = {} as RootTheme['color']

  defineLazyProperty(v0Color, 'light', () => lazyV0Scheme('light', color))
  defineLazyProperty(v0Color, 'dark', () => lazyV0Scheme('dark', color))

  const theme: RootTheme = {
    _version: 0,
    avatar,
    button,
    container,
    color: v0Color,
    focusRing: input.text.focusRing,
    fonts,
    input,
    media,
    radius,
    shadows,
    space,
    styles,

    v2,
  }

  cache.set(v2, theme)

  return theme
}

function themeColor_v2_v0(color_v2: ThemeColorCard_v2): ThemeColor {
  return {
    base: {
      bg: color_v2.bg,
      fg: color_v2.fg,
      border: color_v2.border,
      focusRing: color_v2.focusRing,
      shadow: color_v2.shadow,
    },
    button: color_v2.button,
    card: color_v2.selectable.default,
    dark: color_v2._dark,
    input: {
      default: inputStatesThemeColor_v2_v0(color_v2.input.default),
      invalid: inputStatesThemeColor_v2_v0(color_v2.input.invalid),
    },
    muted: {
      ...color_v2.button.ghost,
      transparent: color_v2.button.ghost.default,
    },
    solid: {
      ...color_v2.button.default,
      transparent: color_v2.button.default.default,
    },
    selectable: color_v2.selectable,
    spot: {
      gray: color_v2.avatar.gray.bg,
      blue: color_v2.avatar.blue.bg,
      purple: color_v2.avatar.purple.bg,
      magenta: color_v2.avatar.magenta.bg,
      red: color_v2.avatar.red.bg,
      orange: color_v2.avatar.orange.bg,
      yellow: color_v2.avatar.yellow.bg,
      green: color_v2.avatar.green.bg,
      cyan: color_v2.avatar.cyan.bg,
    },
    syntax: color_v2.syntax,
  }
}

function inputStatesThemeColor_v2_v0(t: ThemeColorInputMode_v2): ThemeColorInputStates {
  return {
    enabled: inputStateThemeColor_v2_v0(t.enabled),
    disabled: inputStateThemeColor_v2_v0(t.disabled),
    readOnly: inputStateThemeColor_v2_v0(t.readOnly),
    hovered: inputStateThemeColor_v2_v0(t.hovered),
  }
}

function inputStateThemeColor_v2_v0(t: ThemeColorInputState_v2): ThemeColorInputState {
  return {
    bg: t.bg,
    bg2: t.muted.bg,
    border: t.border,
    fg: t.fg,
    placeholder: t.placeholder,
  }
}
