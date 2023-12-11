import {
  ThemeColor,
  ThemeColorGenericState,
  ThemeColorMuted,
  ThemeColorSelectable_v2,
  ThemeColorState_v2,
  ThemeColorCard_v2,
  ThemeColorInputStates,
  ThemeColorInputMode_v2,
  ThemeColorInputState,
  ThemeColorInputState_v2,
} from '../system'

const cache = new WeakMap<ThemeColor, ThemeColorCard_v2>()

/** @internal */
export function themeColor_v0_v2(color_v0: ThemeColor): ThemeColorCard_v2 {
  const cached_v2 = cache.get(color_v0)

  if (cached_v2) return cached_v2

  const base = stateThemeColor_v0_v2(color_v0, color_v0.card.enabled)

  const color_v2: ThemeColorCard_v2 = {
    _blend: color_v0._blend || (color_v0.dark ? 'screen' : 'multiply'),
    _dark: color_v0.dark,
    accent: base.accent,
    avatar: base.avatar,
    backdrop: color_v0.base.shadow.ambient,
    badge: base.badge,
    bg: color_v0.base.bg,
    border: color_v0.base.border,
    button: {
      default: stateTonesThemeColor_v0_v2(color_v0, color_v0.button.default),
      ghost: stateTonesThemeColor_v0_v2(color_v0, color_v0.button.ghost),
      bleed: stateTonesThemeColor_v0_v2(color_v0, color_v0.button.bleed),
    },
    code: base.code,
    fg: color_v0.base.fg,
    focusRing: color_v0.base.focusRing,
    icon: base.muted.fg,
    input: {
      default: inputStatesThemeColor_v0_v2(color_v0.input.default),
      invalid: inputStatesThemeColor_v0_v2(color_v0.input.invalid),
    },
    kbd: base.kbd,
    link: base.link,
    muted: {
      ...base.muted,
      bg: color_v0.selectable?.default.enabled.bg2 || color_v0.base.bg,
    },
    selectable: stateTonesThemeColor_v0_v2(color_v0, color_v0.selectable || color_v0.muted),
    shadow: color_v0.base.shadow,
    skeleton: {
      from: color_v0.skeleton?.from || color_v0.base.border,
      to: color_v0.skeleton?.to || color_v0.base.border,
    },
    syntax: color_v0.syntax,
  }

  cache.set(color_v0, color_v2)

  return color_v2
}

function stateTonesThemeColor_v0_v2(
  v0: ThemeColor,
  t: Omit<ThemeColorMuted, 'transparent'>,
): ThemeColorSelectable_v2 {
  return {
    default: {
      enabled: stateThemeColor_v0_v2(v0, t.default.enabled),
      hovered: stateThemeColor_v0_v2(v0, t.default.hovered),
      pressed: stateThemeColor_v0_v2(v0, t.default.pressed),
      selected: stateThemeColor_v0_v2(v0, t.default.selected),
      disabled: stateThemeColor_v0_v2(v0, t.default.disabled),
    },
    primary: {
      enabled: stateThemeColor_v0_v2(v0, t.primary.enabled),
      hovered: stateThemeColor_v0_v2(v0, t.primary.hovered),
      pressed: stateThemeColor_v0_v2(v0, t.primary.pressed),
      selected: stateThemeColor_v0_v2(v0, t.primary.selected),
      disabled: stateThemeColor_v0_v2(v0, t.primary.disabled),
    },
    positive: {
      enabled: stateThemeColor_v0_v2(v0, t.positive.enabled),
      hovered: stateThemeColor_v0_v2(v0, t.positive.hovered),
      pressed: stateThemeColor_v0_v2(v0, t.positive.pressed),
      selected: stateThemeColor_v0_v2(v0, t.positive.selected),
      disabled: stateThemeColor_v0_v2(v0, t.positive.disabled),
    },
    caution: {
      enabled: stateThemeColor_v0_v2(v0, t.caution.enabled),
      hovered: stateThemeColor_v0_v2(v0, t.caution.hovered),
      pressed: stateThemeColor_v0_v2(v0, t.caution.pressed),
      selected: stateThemeColor_v0_v2(v0, t.caution.selected),
      disabled: stateThemeColor_v0_v2(v0, t.caution.disabled),
    },
    critical: {
      enabled: stateThemeColor_v0_v2(v0, t.critical.enabled),
      hovered: stateThemeColor_v0_v2(v0, t.critical.hovered),
      pressed: stateThemeColor_v0_v2(v0, t.critical.pressed),
      selected: stateThemeColor_v0_v2(v0, t.critical.selected),
      disabled: stateThemeColor_v0_v2(v0, t.critical.disabled),
    },
  }
}

function stateThemeColor_v0_v2(v0: ThemeColor, state: ThemeColorGenericState): ThemeColorState_v2 {
  return {
    ...state,
    avatar: {
      gray: {
        bg: v0.spot.gray,
        fg: v0.base.bg,
      },
      blue: {
        bg: v0.spot.blue,
        fg: v0.base.bg,
      },
      purple: {
        bg: v0.spot.purple,
        fg: v0.base.bg,
      },
      magenta: {
        bg: v0.spot.magenta,
        fg: v0.base.bg,
      },
      red: {
        bg: v0.spot.red,
        fg: v0.base.bg,
      },
      orange: {
        bg: v0.spot.orange,
        fg: v0.base.bg,
      },
      yellow: {
        bg: v0.spot.yellow,
        fg: v0.base.bg,
      },
      green: {
        bg: v0.spot.green,
        fg: v0.base.bg,
      },
      cyan: {
        bg: v0.spot.cyan,
        fg: v0.base.bg,
      },
    },
    badge: {
      default: {
        bg: v0.muted.default.enabled.bg,
        fg: v0.muted.default.enabled.fg,
        dot: v0.muted.default.enabled.muted.fg,
        icon: v0.muted.default.enabled.muted.fg,
      },
      primary: {
        bg: v0.muted.primary.enabled.bg,
        fg: v0.muted.primary.enabled.fg,
        dot: v0.muted.primary.enabled.muted.fg,
        icon: v0.muted.primary.enabled.muted.fg,
      },
      positive: {
        bg: v0.muted.positive.enabled.bg,
        fg: v0.muted.positive.enabled.fg,
        dot: v0.muted.positive.enabled.muted.fg,
        icon: v0.muted.positive.enabled.muted.fg,
      },
      caution: {
        bg: v0.muted.caution.enabled.bg,
        fg: v0.muted.caution.enabled.fg,
        dot: v0.muted.caution.enabled.muted.fg,
        icon: v0.muted.caution.enabled.muted.fg,
      },
      critical: {
        bg: v0.muted.critical.enabled.bg,
        fg: v0.muted.critical.enabled.fg,
        dot: v0.muted.critical.enabled.muted.fg,
        icon: v0.muted.critical.enabled.muted.fg,
      },
    },
    kbd: {
      bg: v0.muted.default.enabled.bg,
      fg: v0.muted.default.enabled.fg,
      border: v0.muted.default.enabled.border,
    },
    muted: {
      ...v0.muted.default.enabled.muted,
      bg: state.bg2 || state.bg,
    },
    skeleton: {
      from: state.skeleton?.from || state.border,
      to: state.skeleton?.to || state.border,
    },
  }
}

function inputStatesThemeColor_v0_v2(states: ThemeColorInputStates): ThemeColorInputMode_v2 {
  return {
    enabled: inputStateThemeColor_v0_v2(states.enabled),
    disabled: inputStateThemeColor_v0_v2(states.disabled),
    readOnly: inputStateThemeColor_v0_v2(states.readOnly),
    hovered: inputStateThemeColor_v0_v2(states.hovered),
  }
}

function inputStateThemeColor_v0_v2(state: ThemeColorInputState): ThemeColorInputState_v2 {
  return {
    bg: state.bg,
    border: state.border,
    fg: state.fg,
    muted: {
      bg: state.bg2,
    },
    placeholder: state.placeholder,
  }
}
