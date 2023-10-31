import {ThemeConfig} from '../../config'
import {COLOR_BUTTON_MODES, COLOR_STATE_TONES, COLOR_STATES} from '../../constants'
import {
  ColorBaseTone,
  ColorButtonMode,
  ColorState,
  ColorStateTone,
  TMP_BaseColorTheme,
  TMP_ButtonColorTheme,
  TMP_ButtonModesColorTheme,
  TMP_ButtonStatesColorTheme,
  TMP_ColorTheme,
  TMP_StateColorTheme,
} from '../../types'
import {defaultColorTokens} from '../defaults/colorTokens'
import {resolveColorTokenValue} from '../helpers'

export function buildColorTheme(
  options: {scheme: 'light' | 'dark'},
  config?: ThemeConfig,
): TMP_ColorTheme {
  const {scheme} = options

  return {
    transparent: buildBaseColorTheme({scheme, tone: 'transparent'}, config),
    default: buildBaseColorTheme({scheme, tone: 'default'}, config),
    primary: buildBaseColorTheme({scheme, tone: 'primary'}, config),
    positive: buildBaseColorTheme({scheme, tone: 'positive'}, config),
    caution: buildBaseColorTheme({scheme, tone: 'caution'}, config),
    critical: buildBaseColorTheme({scheme, tone: 'critical'}, config),
  }
}

export function buildBaseColorTheme(
  options: {scheme: 'light' | 'dark'; tone: ColorBaseTone},
  config?: ThemeConfig,
): TMP_BaseColorTheme {
  const {scheme, tone} = options
  const tokens = config?.color?.tokens ?? defaultColorTokens
  const any = tokens?.['*']
  const toneTokens = tokens?.[tone]
  const hue = toneTokens?._hue || any?._hue || 'gray'

  const bg = resolveColorTokenValue({
    hue,
    scheme,
    value: toneTokens?.bg || any?.bg || ['gray/50', 'black'],
  })

  const _blend = toneTokens?._blend || any?._blend || ['screen', 'multiply']

  return {
    _blend: _blend[scheme === 'light' ? 0 : 1],
    dark: scheme === 'dark',
    base: {
      bg,
      fg: resolveColorTokenValue({
        hue,
        scheme,
        value: toneTokens?.fg || any?.fg || ['black', 'white'],
      }),
      border: resolveColorTokenValue({
        hue,
        scheme,
        value: toneTokens?.border || any?.border || ['black', 'white'],
      }),
    },
    button: buildButtonColorTheme({scheme}, config),
  }
}

function buildButtonColorTheme(
  options: {scheme: 'light' | 'dark'},
  config?: ThemeConfig,
): TMP_ButtonColorTheme {
  const {scheme} = options

  const tones = COLOR_STATE_TONES.map((tone): Partial<TMP_ButtonColorTheme> => {
    return {
      [tone]: buildButtonColorToneTheme({scheme, tone}, config),
    }
  })

  return Object.assign({}, ...tones) as TMP_ButtonColorTheme
}

function buildButtonColorToneTheme(
  options: {
    scheme: 'light' | 'dark'
    tone: ColorStateTone
  },
  config?: ThemeConfig,
): TMP_ButtonModesColorTheme {
  const {scheme, tone} = options

  const modes = COLOR_BUTTON_MODES.map((mode): Partial<TMP_ButtonModesColorTheme> => {
    return {
      [mode]: buildButtonModeColorTheme({mode, scheme, tone}, config),
    }
  })

  return Object.assign({}, ...modes) as TMP_ButtonModesColorTheme
}

function buildButtonModeColorTheme(
  options: {
    mode: ColorButtonMode
    scheme: 'light' | 'dark'
    tone: ColorStateTone
  },
  config?: ThemeConfig,
): TMP_ButtonStatesColorTheme {
  const {mode, scheme, tone} = options

  const states = COLOR_STATES.map((state): Partial<TMP_ButtonStatesColorTheme> => {
    return {
      [state]: buildButtonStateColorTheme({mode, tone, scheme, state}, config),
    }
  })

  return Object.assign({}, ...states) as TMP_ButtonStatesColorTheme
}

function buildButtonStateColorTheme(
  options: {
    mode: ColorButtonMode
    tone: ColorStateTone
    scheme: 'light' | 'dark'
    state: ColorState
  },
  config?: ThemeConfig,
): TMP_StateColorTheme {
  const {mode, tone, scheme, state} = options
  const tokens = config?.color?.tokens ?? defaultColorTokens
  const hue =
    tokens?.button?.[tone]?.[mode]?.[state]?._hue ||
    tokens?.button?.['*']?.[mode]?.[state]?._hue ||
    tokens?.button?.[tone]?._hue ||
    tokens?.[tone]?._hue ||
    'gray'
  const spec3 = tokens?.button?.['*']?.[mode]?.['*']
  const spec2 = tokens?.button?.['*']?.[mode]?.[state]
  const spec1 = tokens?.button?.[tone]?.[mode]?.['*']
  const spec0 = tokens?.button?.[tone]?.[mode]?.[state]

  const _blend = spec0?._blend ||
    spec1?._blend ||
    spec2?._blend ||
    spec3?._blend || ['screen', 'multiply']

  return {
    _blend: _blend[scheme === 'light' ? 0 : 1],
    bg: resolveColorTokenValue({
      hue,
      scheme,
      value: spec0?.bg || spec1?.bg || spec2?.bg || spec3?.bg || ['500', '400'],
    }),
    bg2: resolveColorTokenValue({
      hue,
      scheme,
      value: spec0?.bg2 || spec1?.bg2 || spec2?.bg2 || spec3?.bg2 || ['500', '400'],
    }),
    fg: resolveColorTokenValue({
      hue,
      scheme,
      value: spec0?.fg || spec1?.fg || spec2?.fg || spec3?.fg || ['white', 'black'],
    }),
    border: resolveColorTokenValue({
      hue,
      scheme,
      value: spec0?.border || spec1?.border || spec2?.border || spec3?.border || ['500', '400'],
    }),
    muted: {
      fg: resolveColorTokenValue({
        hue,
        scheme,
        value: spec0?.muted?.fg ||
          spec1?.muted?.fg ||
          spec2?.muted?.fg ||
          spec3?.muted?.fg || ['500', '400'],
      }),
    },
    accent: {
      fg: resolveColorTokenValue({
        hue,
        scheme,
        value: spec0?.accent?.fg ||
          spec1?.accent?.fg ||
          spec2?.accent?.fg ||
          spec3?.accent?.fg || ['500', '400'],
      }),
    },
    link: {
      fg: resolveColorTokenValue({
        hue,
        scheme,
        value: spec0?.link?.fg ||
          spec1?.link?.fg ||
          spec2?.link?.fg ||
          spec3?.link?.fg || ['500', '400'],
      }),
    },
    code: {
      bg: resolveColorTokenValue({
        hue,
        scheme,
        value: spec0?.code?.bg ||
          spec1?.code?.bg ||
          spec2?.code?.bg ||
          spec3?.code?.bg || ['500', '400'],
      }),
      fg: resolveColorTokenValue({
        hue,
        scheme,
        value: spec0?.code?.fg ||
          spec1?.code?.fg ||
          spec2?.code?.fg ||
          spec3?.code?.fg || ['500', '400'],
      }),
    },
  }
}
