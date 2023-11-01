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
import {ColorTokenContext, resolveColorTokenValue as _color} from '../helpers'

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
  const tokens = config?.color?.tokens?.[tone]
  const hue = tokens?._hue || 'gray'
  const context: ColorTokenContext = {hue, scheme}
  const bg = _color(context, tokens?.bg || ['gray/50', 'black'])
  const blendMode = tokens?._blend || ['screen', 'multiply']

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    dark: scheme === 'dark',
    base: {
      bg,
      fg: _color(context, tokens?.fg || ['black', 'white']),
      border: _color(context, tokens?.border || ['black', 'white']),
      focusRing: _color(context, tokens?.focusRing || ['black', 'white']),
      shadow: {
        outline: _color(context, tokens?.shadow?.outline || ['500/0.2', '500/0.2']),
        umbra: _color(context, tokens?.shadow?.umbra || ['500/0.2', '500/0.2']),
        penumbra: _color(context, tokens?.shadow?.penumbra || ['500/0.2', '500/0.2']),
        ambient: _color(context, tokens?.shadow?.ambient || ['500/0.2', '500/0.2']),
      },
      skeleton: {
        from: _color(context, tokens?.skeleton?.from || ['500/0.2', '500/0.2']),
        to: _color(context, tokens?.skeleton?.to || ['500/0.2', '500/0.2']),
      },
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
  const tokens = config?.color?.tokens?.button?.[tone]?.[mode]?.[state]
  const hue = tokens?._hue || 'gray'
  const blendMode = tokens?._blend || ['screen', 'multiply']
  const context: ColorTokenContext = {hue, scheme}

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    bg: _color(context, tokens?.bg || ['500', '400']),
    bg2: _color(context, tokens?.bg2 || ['500', '400']),
    fg: _color(context, tokens?.fg || ['white', 'black']),
    border: _color(context, tokens?.border || ['500', '400']),
    muted: {
      fg: _color(context, tokens?.fg || ['500', '400']),
    },
    accent: {
      fg: _color(context, tokens?.fg || ['500', '400']),
    },
    link: {
      fg: _color(context, tokens?.fg || ['500', '400']),
    },
    code: {
      bg: _color(context, tokens?.bg || ['500', '400']),
      fg: _color(context, tokens?.fg || ['500', '400']),
    },
  }
}
