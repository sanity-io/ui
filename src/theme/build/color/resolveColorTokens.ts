import {ColorHueKey} from '@sanity/color'
import {
  BaseColorTokens,
  ButtonColorTokens,
  // ButtonModeColorTokens,
  ColorConfigBaseTone,
  ColorConfigInputMode,
  ColorConfigInputState,
  ColorConfigState,
  ColorConfigStateTone,
  ColorTokenValue,
  ColorTokens,
  InputColorTokens,
  InputStateColorTokens,
  StateColorTokens,
  StatesColorTokens,
} from '../../config'
import {
  COLOR_BASE_TONES,
  COLOR_BUTTON_MODES,
  COLOR_INPUT_MODES,
  COLOR_INPUT_STATES,
  COLOR_STATES,
  COLOR_STATE_TONES,
  ColorBaseTone,
  ColorButtonMode,
  ColorHueValue,
  ColorState,
  ColorStateTone,
} from '../../system'
import {ThemeColorSyntax} from '../../types'
import {defaultColorTokens} from './defaults/colorTokens'
import {merge} from './lib/merge'

/**
 * Convert a tree of color tokens from a sparse format to a dense format.
 */
export function resolveColorTokens(inputTokens?: ColorTokens): ColorTokens {
  const sparseTokens = merge(
    defaultColorTokens as unknown as Record<string, unknown>,
    (inputTokens ?? {}) as unknown as Record<string, unknown>,
  )

  return {
    base: resolveBaseColorTokens(sparseTokens),
    button: resolveButtonColorTokens(sparseTokens),
    card: resolveCardColorTokens(sparseTokens),
    input: resolveInputColorTokens(sparseTokens),
    selectable: resolveSelectableColorTokens(sparseTokens),
    spot: resolveSpotColorTokens(sparseTokens),
    syntax: resolveSyntaxColorTokens(sparseTokens),
  }
}

function resolveBaseColorTokens(sparseTokens: ColorTokens) {
  const tokens: Partial<Record<ColorConfigBaseTone, BaseColorTokens>> = {}

  // base tones
  for (const tone of COLOR_BASE_TONES) {
    tokens[tone] = resolveBaseColorTones(sparseTokens, tone)
  }

  return tokens
}

function resolveBaseColorTones(sparseTokens: ColorTokens, tone: ColorBaseTone): BaseColorTokens {
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
  sparseTokens: ColorTokens,
): Partial<Record<ColorButtonMode, ButtonColorTokens>> {
  const tokens: Partial<Record<ColorButtonMode, ButtonColorTokens>> = {}

  for (const mode of COLOR_BUTTON_MODES) {
    tokens[mode] = resolveButtonToneColorTokens(sparseTokens, mode)
  }

  return tokens
}

function resolveButtonToneColorTokens(
  sparseTokens: ColorTokens,
  mode: ColorButtonMode,
): ButtonColorTokens {
  const tokens: ButtonColorTokens = {}

  for (const tone of COLOR_STATE_TONES) {
    tokens[tone] = resolveButtonModeColorTokens(sparseTokens, mode, tone)
  }

  return tokens
}

function resolveButtonModeColorTokens(
  sparseTokens: ColorTokens,
  mode: ColorButtonMode,
  tone: ColorStateTone,
): StatesColorTokens {
  const spec0 = sparseTokens.button?.[mode]?.[tone]
  const spec1 = sparseTokens.button?.[mode]?.['*']
  const tokens = {...spec1, ...spec0}

  for (const state of COLOR_STATES) {
    tokens[state] = resolveButtonStateColorTokens(sparseTokens, tone, mode, state)
  }

  return tokens
}

function resolveButtonStateColorTokens(
  tokens: ColorTokens,
  tone: ColorStateTone,
  mode: ColorButtonMode,
  state: ColorState,
): StateColorTokens {
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
  sparseTokens: ColorTokens,
): Partial<Record<ColorConfigState, StateColorTokens>> {
  const tokens: Partial<Record<ColorConfigState, StateColorTokens>> = {}

  for (const state of COLOR_STATES) {
    tokens[state] = resolveCardStateColorTokens(sparseTokens, state)
  }

  return tokens
}

function resolveCardStateColorTokens(tokens: ColorTokens, state: ColorState): StateColorTokens {
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
  sparseTokens: ColorTokens,
): Partial<Record<ColorConfigInputMode, InputColorTokens>> {
  const tokens: Partial<Record<ColorConfigInputMode, InputColorTokens>> = {}

  for (const mode of COLOR_INPUT_MODES) {
    tokens[mode] = resolveInputModeColorTokens(sparseTokens, mode)
  }

  return tokens
}

function resolveInputModeColorTokens(
  sparseTokens: ColorTokens,
  mode: ColorConfigInputMode,
): InputColorTokens {
  const states: InputColorTokens = {}

  for (const state of COLOR_INPUT_STATES) {
    states[state] = resolveInputStateColorTokens(sparseTokens, mode, state)
  }

  return states
}

function resolveInputStateColorTokens(
  tokens: ColorTokens,
  mode: ColorConfigInputMode,
  state: ColorConfigInputState,
): InputStateColorTokens {
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
  sparseTokens: ColorTokens,
): Partial<Record<ColorConfigStateTone, {_hue?: ColorHueValue} & StatesColorTokens>> {
  const tokens: ButtonColorTokens = {}

  for (const tone of COLOR_STATE_TONES) {
    tokens[tone] = resolveSelectableToneColorTokens(sparseTokens, tone)
  }

  return tokens
}

function resolveSelectableToneColorTokens(
  sparseTokens: ColorTokens,
  tone: ColorStateTone,
): {_hue?: ColorHueValue} & StatesColorTokens {
  const states: {_hue?: ColorHueValue} & StatesColorTokens = {
    _hue: sparseTokens?.selectable?.[tone]?._hue || sparseTokens?.base?.[tone]?._hue,
  }

  for (const state of COLOR_STATES) {
    states[state] = resolveSelectableStateColorTokens(sparseTokens, state, tone)
  }

  return states
}

function resolveSelectableStateColorTokens(
  tokens: ColorTokens,
  state: ColorState,
  tone: ColorStateTone,
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
  sparseTokens: ColorTokens,
): Partial<Record<ColorHueKey, ColorTokenValue>> {
  return {
    ...sparseTokens.spot,
  }
}

function resolveSyntaxColorTokens(
  sparseTokens: ColorTokens,
): Partial<Record<keyof ThemeColorSyntax, ColorTokenValue>> {
  return {
    ...sparseTokens.syntax,
  }
}
