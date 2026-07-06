import {COLOR_HUES, ColorHueKey} from '@sanity/color'

import {
  ColorConfigCardTone,
  ColorConfigInputMode,
  ColorConfigInputState,
  ColorConfigStateTone,
  ThemeColorAvatarTokens,
  ThemeColorBadgeTokens,
  ThemeColorBaseTokens,
  ThemeColorButtonTokens,
  ThemeColorInputStateTokens,
  ThemeColorInputTokens,
  ThemeColorStatesTokens,
  ThemeColorStateTokens,
  ThemeColorTokens,
} from '../config'
import {defaultColorTokens} from '../defaults/colorTokens'
import {
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_INPUT_MODES,
  THEME_COLOR_INPUT_STATES,
  THEME_COLOR_STATE_TONES,
  THEME_COLOR_STATES,
  ThemeColorButtonModeKey,
  ThemeColorCardToneKey,
  ThemeColorStateKey,
  ThemeColorStateToneKey,
} from '../system'
import {merge} from './merge'

/**
 * Convert a tree of color tokens from a sparse format to a dense format.
 */
export function resolveColorTokens(inputTokens?: ThemeColorTokens): ThemeColorTokens {
  const tokens = merge(defaultColorTokens, inputTokens)

  return {
    base: resolveBaseColorTokens(tokens),
    button: resolveButtonColorTokens(tokens),
    input: resolveInputColorTokens(tokens),
    selectable: resolveSelectableColorTokens(tokens),
    syntax: tokens.syntax,
  }
}

function resolveBaseColorTokens(sparseTokens: ThemeColorTokens) {
  const tokens: Partial<Record<ColorConfigCardTone, ThemeColorBaseTokens>> = {}

  // base tones
  for (const tone of THEME_COLOR_CARD_TONES) {
    tokens[tone] = resolveBaseColorTones(sparseTokens, tone)
  }

  return tokens
}

function resolveBaseColorTones(
  inputTokens: ThemeColorTokens,
  tone: ThemeColorCardToneKey,
): ThemeColorBaseTokens {
  const spec = merge(inputTokens?.base?.['*'], inputTokens?.base?.[tone])

  const hue = spec._hue || inputTokens?.base?.[tone]?._hue || 'gray'

  return {
    ...spec,
    _hue: hue,
    avatar: COLOR_HUES.reduce((acc, hue) => {
      return {
        ...acc,
        [hue]: merge({_hue: hue}, spec.avatar?.['*'], spec.avatar?.[hue]),
      }
    }, {} as ThemeColorAvatarTokens),
    badge: THEME_COLOR_STATE_TONES.reduce((acc, tone) => {
      return {
        ...acc,
        [tone]: {
          _hue: inputTokens?.base?.[tone]?._hue || hue,
          ...spec.badge?.['*'],
          ...spec.badge?.[tone],
        },
      }
    }, {} as ThemeColorBadgeTokens),
  }
}

function resolveButtonColorTokens(
  inputTokens: ThemeColorTokens,
): Partial<Record<ThemeColorButtonModeKey, ThemeColorButtonTokens>> {
  const tokens: Partial<Record<ThemeColorButtonModeKey, ThemeColorButtonTokens>> = {}

  for (const mode of THEME_COLOR_BUTTON_MODES) {
    tokens[mode] = resolveButtonToneColorTokens(inputTokens, mode)
  }

  return tokens
}

function resolveButtonToneColorTokens(
  inputTokens: ThemeColorTokens,
  mode: ThemeColorButtonModeKey,
): ThemeColorButtonTokens {
  const tokens: ThemeColorButtonTokens = {}

  for (const tone of THEME_COLOR_STATE_TONES) {
    tokens[tone] = resolveButtonModeColorTokens(inputTokens, mode, tone)
  }

  return tokens
}

function resolveButtonModeColorTokens(
  inputTokens: ThemeColorTokens,
  mode: ThemeColorButtonModeKey,
  tone: ThemeColorStateToneKey,
): ThemeColorStatesTokens {
  const tokens: ThemeColorStatesTokens = {}

  for (const state of THEME_COLOR_STATES) {
    tokens[state] = resolveButtonStateColorTokens(inputTokens, tone, mode, state)
  }

  return tokens
}

function resolveButtonStateColorTokens(
  inputTokens: ThemeColorTokens,
  tone: ThemeColorStateToneKey,
  mode: ThemeColorButtonModeKey,
  state: ThemeColorStateKey,
): ThemeColorStateTokens {
  const spec = merge(
    inputTokens?.button?.[mode]?.['*']?.['*'],
    inputTokens?.button?.[mode]?.[tone]?.['*'],
    inputTokens?.button?.[mode]?.['*']?.[state],
    inputTokens?.button?.[mode]?.[tone]?.[state],
  )

  const hue = spec._hue || inputTokens?.base?.[tone]?._hue

  return {
    ...spec,
    _hue: hue,
    avatar: COLOR_HUES.reduce((acc, hue) => {
      return {
        ...acc,
        [hue]: merge({_hue: hue}, spec.avatar?.['*'], spec.avatar?.[hue]),
      }
    }, {} as ThemeColorAvatarTokens),
    badge: THEME_COLOR_STATE_TONES.reduce((acc, tone) => {
      return {
        ...acc,
        [tone]: {
          _hue: inputTokens?.base?.[tone]?._hue || hue,
          ...spec.badge?.['*'],
          ...spec.badge?.[tone],
        },
      }
    }, {} as ThemeColorBadgeTokens),
  }
}

function resolveInputColorTokens(
  inputTokens: ThemeColorTokens,
): Partial<Record<ColorConfigInputMode, ThemeColorInputTokens>> {
  const tokens: Partial<Record<ColorConfigInputMode, ThemeColorInputTokens>> = {}

  for (const mode of THEME_COLOR_INPUT_MODES) {
    tokens[mode] = resolveInputModeColorTokens(inputTokens, mode)
  }

  return tokens
}

function resolveInputModeColorTokens(
  inputTokens: ThemeColorTokens,
  mode: ColorConfigInputMode,
): ThemeColorInputTokens {
  const states: ThemeColorInputTokens = {}

  for (const state of THEME_COLOR_INPUT_STATES) {
    states[state] = resolveInputStateColorTokens(inputTokens, mode, state)
  }

  return states
}

function resolveInputStateColorTokens(
  inputTokens: ThemeColorTokens,
  mode: ColorConfigInputMode,
  state: ColorConfigInputState,
): ThemeColorInputStateTokens {
  const spec = merge(
    inputTokens?.input?.['*']?.['*'],
    inputTokens?.input?.[mode]?.['*'],
    inputTokens?.input?.['*']?.[state],
    inputTokens?.input?.[mode]?.[state],
  )

  const hue = spec._hue || inputTokens?.input?.[mode]?._hue

  return {...spec, _hue: hue}
}

function resolveSelectableColorTokens(
  inputTokens: ThemeColorTokens,
): Partial<Record<ColorConfigStateTone, {_hue?: ColorHueKey} & ThemeColorStatesTokens>> {
  const tokens: ThemeColorButtonTokens = {}

  for (const tone of THEME_COLOR_STATE_TONES) {
    tokens[tone] = resolveSelectableToneColorTokens(inputTokens, tone)
  }

  return tokens
}

function resolveSelectableToneColorTokens(
  inputTokens: ThemeColorTokens,
  tone: ThemeColorStateToneKey,
): {_hue?: ColorHueKey} & ThemeColorStatesTokens {
  const states: {_hue?: ColorHueKey} & ThemeColorStatesTokens = {
    _hue: inputTokens?.selectable?.[tone]?._hue || inputTokens?.base?.[tone]?._hue,
  }

  for (const state of THEME_COLOR_STATES) {
    states[state] = resolveSelectableStateColorTokens(inputTokens, tone, state)
  }

  return states
}

function resolveSelectableStateColorTokens(
  inputTokens: ThemeColorTokens,
  tone: ThemeColorStateToneKey,
  state: ThemeColorStateKey,
) {
  const spec = merge(
    inputTokens?.selectable?.['*']?.['*'],
    inputTokens?.selectable?.[tone]?.['*'],
    inputTokens?.selectable?.['*']?.[state],
    inputTokens?.selectable?.[tone]?.[state],
  )

  const hue = spec._hue || inputTokens?.base?.[tone]?._hue

  return {
    ...spec,
    _hue: hue,
    avatar: COLOR_HUES.reduce((acc, hue) => {
      return {
        ...acc,
        [hue]: merge({_hue: hue}, spec.avatar?.['*'], spec.avatar?.[hue]),
      }
    }, {} as ThemeColorAvatarTokens),
    badge: THEME_COLOR_STATE_TONES.reduce((acc, tone) => {
      return {
        ...acc,
        [tone]: {
          _hue: inputTokens?.base?.[tone]?._hue || hue,
          ...spec.badge?.['*'],
          ...spec.badge?.[tone],
        },
      }
    }, {} as ThemeColorBadgeTokens),
  }
}
