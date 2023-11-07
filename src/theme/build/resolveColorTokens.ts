import {ColorHueKey} from '@sanity/color'
import {
  ColorConfigAvatarColor,
  ColorConfigBaseTone,
  ColorConfigInputMode,
  ColorConfigInputState,
  ColorConfigState,
  ColorConfigStateTone,
  ThemeColorAvatarTokens,
  ThemeColorBadgeTokens,
  ThemeColorBaseTokens,
  ThemeColorButtonTokens,
  ThemeColorInputStateTokens,
  ThemeColorInputTokens,
  ThemeColorStateTokens,
  ThemeColorStatesTokens,
  ThemeColorTokenValue,
  ThemeColorTokens,
} from '../config'
import {
  THEME_COLOR_AVATAR_COLORS,
  THEME_COLOR_BASE_TONES,
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_INPUT_MODES,
  THEME_COLOR_INPUT_STATES,
  THEME_COLOR_STATES,
  THEME_COLOR_STATE_TONES,
  ThemeColorAvatarColorKey,
  ThemeColorBaseToneKey,
  ThemeColorButtonModeKey,
  ThemeColorStateKey,
  ThemeColorStateToneKey,
  ThemeColorSyntax,
} from '../system'
import {defaultColorTokens} from './defaults/colorTokens'
import {merge} from './merge'

/**
 * Convert a tree of color tokens from a sparse format to a dense format.
 */
export function resolveColorTokens(inputTokens?: ThemeColorTokens): ThemeColorTokens {
  const sparseTokens = merge(
    defaultColorTokens as unknown as Record<string, unknown>,
    (inputTokens ?? {}) as unknown as Record<string, unknown>,
  )

  return {
    avatar: resolveAvatarColorTokens(sparseTokens),
    badge: resolveBadgeColorTokens(sparseTokens),
    base: resolveBaseColorTokens(sparseTokens),
    button: resolveButtonColorTokens(sparseTokens),
    card: resolveCardColorTokens(sparseTokens),
    input: resolveInputColorTokens(sparseTokens),
    kbd: resolveKBDColorTokens(sparseTokens),
    selectable: resolveSelectableColorTokens(sparseTokens),
    spot: resolveSpotColorTokens(sparseTokens),
    syntax: resolveSyntaxColorTokens(sparseTokens),
  }
}

function resolveKBDColorTokens(sparseTokens: ThemeColorTokens) {
  return sparseTokens?.kbd
}

function resolveAvatarColorTokens(sparseTokens: ThemeColorTokens) {
  const tokens: Partial<Record<ColorConfigAvatarColor, ThemeColorAvatarTokens>> = {}

  for (const color of THEME_COLOR_AVATAR_COLORS) {
    tokens[color] = _resolveAvatarColorTokens(sparseTokens, color)
  }

  return tokens
}

function _resolveAvatarColorTokens(
  sparseTokens: ThemeColorTokens,
  color: ThemeColorAvatarColorKey,
): ThemeColorAvatarTokens {
  const spec0 = sparseTokens?.avatar?.[color]
  const spec1 = sparseTokens?.avatar?.['*']

  return {
    ...spec1,
    ...spec0,
  }
}

function resolveBadgeColorTokens(sparseTokens: ThemeColorTokens) {
  const tokens: Partial<Record<ColorConfigStateTone, ThemeColorAvatarTokens>> = {}

  for (const tone of THEME_COLOR_STATE_TONES) {
    tokens[tone] = _resolveBadgeColorTokens(sparseTokens, tone)
  }

  return tokens
}

function _resolveBadgeColorTokens(
  sparseTokens: ThemeColorTokens,
  tone: ThemeColorStateToneKey,
): ThemeColorBadgeTokens {
  const spec0 = sparseTokens?.badge?.[tone]
  const spec1 = sparseTokens?.badge?.['*']

  return {
    ...spec1,
    ...spec0,
  }
}

function resolveBaseColorTokens(sparseTokens: ThemeColorTokens) {
  const tokens: Partial<Record<ColorConfigBaseTone, ThemeColorBaseTokens>> = {}

  // base tones
  for (const tone of THEME_COLOR_BASE_TONES) {
    tokens[tone] = resolveBaseColorTones(sparseTokens, tone)
  }

  return tokens
}

function resolveBaseColorTones(
  sparseTokens: ThemeColorTokens,
  tone: ThemeColorBaseToneKey,
): ThemeColorBaseTokens {
  const spec0 = sparseTokens?.base?.[tone]
  const spec1 = sparseTokens?.base?.['*']

  return {
    ...spec1,
    ...spec0,
    shadow: {...spec1?.shadow, ...spec0?.shadow},
    skeleton: {...spec1?.skeleton, ...spec0?.skeleton},
  }
}

function resolveButtonColorTokens(
  sparseTokens: ThemeColorTokens,
): Partial<Record<ThemeColorButtonModeKey, ThemeColorButtonTokens>> {
  const tokens: Partial<Record<ThemeColorButtonModeKey, ThemeColorButtonTokens>> = {}

  for (const mode of THEME_COLOR_BUTTON_MODES) {
    tokens[mode] = resolveButtonToneColorTokens(sparseTokens, mode)
  }

  return tokens
}

function resolveButtonToneColorTokens(
  sparseTokens: ThemeColorTokens,
  mode: ThemeColorButtonModeKey,
): ThemeColorButtonTokens {
  const tokens: ThemeColorButtonTokens = {}

  for (const tone of THEME_COLOR_STATE_TONES) {
    tokens[tone] = resolveButtonModeColorTokens(sparseTokens, mode, tone)
  }

  return tokens
}

function resolveButtonModeColorTokens(
  sparseTokens: ThemeColorTokens,
  mode: ThemeColorButtonModeKey,
  tone: ThemeColorStateToneKey,
): ThemeColorStatesTokens {
  const spec0 = sparseTokens.button?.[mode]?.[tone]
  const spec1 = sparseTokens.button?.[mode]?.['*']
  const tokens = {...spec1, ...spec0}

  for (const state of THEME_COLOR_STATES) {
    tokens[state] = resolveButtonStateColorTokens(sparseTokens, tone, mode, state)
  }

  return tokens
}

function resolveButtonStateColorTokens(
  tokens: ThemeColorTokens,
  tone: ThemeColorStateToneKey,
  mode: ThemeColorButtonModeKey,
  state: ThemeColorStateKey,
): ThemeColorStateTokens {
  const spec0 = tokens?.button?.[mode]?.[tone]?.[state]
  const spec1 = tokens?.button?.[mode]?.['*']?.[state]
  const spec2 = tokens?.button?.[mode]?.[tone]?.['*']
  const spec3 = tokens?.button?.[mode]?.['*']?.['*']

  const hue = spec0?._hue || spec1?._hue || spec2?._hue || spec3?._hue || tokens?.base?.[tone]?._hue

  return {
    ...spec3,
    ...spec2,
    ...spec1,
    ...spec0,
    _hue: hue,
    muted: {...spec3?.muted, ...spec2?.muted, ...spec1?.muted, ...spec0?.muted},
    accent: {...spec3?.accent, ...spec2?.accent, ...spec1?.accent, ...spec0?.accent},
    link: {...spec3?.link, ...spec2?.link, ...spec1?.link, ...spec0?.link},
    code: {...spec3?.code, ...spec2?.code, ...spec1?.code, ...spec0?.code},
    skeleton: {...spec3?.skeleton, ...spec2?.skeleton, ...spec1?.skeleton, ...spec0?.skeleton},
  }
}

function resolveCardColorTokens(
  sparseTokens: ThemeColorTokens,
): Partial<Record<ColorConfigState, ThemeColorStateTokens>> {
  const tokens: Partial<Record<ColorConfigState, ThemeColorStateTokens>> = {}

  for (const state of THEME_COLOR_STATES) {
    tokens[state] = resolveCardStateColorTokens(sparseTokens, state)
  }

  return tokens
}

function resolveCardStateColorTokens(
  tokens: ThemeColorTokens,
  state: ThemeColorStateKey,
): ThemeColorStateTokens {
  const spec0 = tokens?.card?.[state]
  const spec1 = tokens?.card?.['*']

  const hue = spec0?._hue || spec1?._hue

  return {
    ...spec1,
    ...spec0,
    _hue: hue,
    muted: {...spec1?.muted, ...spec0?.muted},
    accent: {...spec1?.accent, ...spec0?.accent},
    link: {...spec1?.link, ...spec0?.link},
    code: {...spec1?.code, ...spec0?.code},
    skeleton: {...spec1?.skeleton, ...spec0?.skeleton},
  }
}

function resolveInputColorTokens(
  sparseTokens: ThemeColorTokens,
): Partial<Record<ColorConfigInputMode, ThemeColorInputTokens>> {
  const tokens: Partial<Record<ColorConfigInputMode, ThemeColorInputTokens>> = {}

  for (const mode of THEME_COLOR_INPUT_MODES) {
    tokens[mode] = resolveInputModeColorTokens(sparseTokens, mode)
  }

  return tokens
}

function resolveInputModeColorTokens(
  sparseTokens: ThemeColorTokens,
  mode: ColorConfigInputMode,
): ThemeColorInputTokens {
  const states: ThemeColorInputTokens = {}

  for (const state of THEME_COLOR_INPUT_STATES) {
    states[state] = resolveInputStateColorTokens(sparseTokens, mode, state)
  }

  return states
}

function resolveInputStateColorTokens(
  tokens: ThemeColorTokens,
  mode: ColorConfigInputMode,
  state: ColorConfigInputState,
): ThemeColorInputStateTokens {
  const spec0 = tokens?.input?.[mode]?.[state]
  const spec1 = tokens?.input?.['*']?.[state]
  const spec2 = tokens?.input?.[mode]?.['*']
  const spec3 = tokens?.input?.['*']?.['*']

  const hue =
    spec0?._hue || spec1?._hue || spec2?._hue || spec3?._hue || tokens?.input?.[mode]?._hue

  return {
    ...spec3,
    ...spec2,
    ...spec1,
    ...spec0,
    _hue: hue,
  }
}

function resolveSelectableColorTokens(
  sparseTokens: ThemeColorTokens,
): Partial<Record<ColorConfigStateTone, {_hue?: ColorHueKey} & ThemeColorStatesTokens>> {
  const tokens: ThemeColorButtonTokens = {}

  for (const tone of THEME_COLOR_STATE_TONES) {
    tokens[tone] = resolveSelectableToneColorTokens(sparseTokens, tone)
  }

  return tokens
}

function resolveSelectableToneColorTokens(
  sparseTokens: ThemeColorTokens,
  tone: ThemeColorStateToneKey,
): {_hue?: ColorHueKey} & ThemeColorStatesTokens {
  const states: {_hue?: ColorHueKey} & ThemeColorStatesTokens = {
    _hue: sparseTokens?.selectable?.[tone]?._hue || sparseTokens?.base?.[tone]?._hue,
  }

  for (const state of THEME_COLOR_STATES) {
    states[state] = resolveSelectableStateColorTokens(sparseTokens, state, tone)
  }

  return states
}

function resolveSelectableStateColorTokens(
  tokens: ThemeColorTokens,
  state: ThemeColorStateKey,
  tone: ThemeColorStateToneKey,
) {
  const spec0 = tokens?.selectable?.[tone]?.[state]
  const spec1 = tokens?.selectable?.['*']?.[state]
  const spec2 = tokens?.selectable?.[tone]?.['*']
  const spec3 = tokens?.selectable?.['*']?.['*']

  const hue = spec0?._hue || spec1?._hue || spec2?._hue || spec3?._hue || tokens?.base?.[tone]?._hue

  return {
    ...spec3,
    ...spec2,
    ...spec1,
    ...spec0,
    _hue: hue,
    muted: {...spec3?.muted, ...spec2?.muted, ...spec1?.muted, ...spec0?.muted},
    accent: {...spec3?.accent, ...spec2?.accent, ...spec1?.accent, ...spec0?.accent},
    link: {...spec3?.link, ...spec2?.link, ...spec1?.link, ...spec0?.link},
    code: {...spec3?.code, ...spec2?.code, ...spec1?.code, ...spec0?.code},
    skeleton: {...spec3?.skeleton, ...spec2?.skeleton, ...spec1?.skeleton, ...spec0?.skeleton},
  }
}

function resolveSpotColorTokens(
  sparseTokens: ThemeColorTokens,
): Partial<Record<ColorHueKey, ThemeColorTokenValue>> {
  return {
    ...sparseTokens.spot,
  }
}

function resolveSyntaxColorTokens(
  sparseTokens: ThemeColorTokens,
): Partial<Record<keyof ThemeColorSyntax, ThemeColorTokenValue>> {
  return {
    ...sparseTokens.syntax,
  }
}
