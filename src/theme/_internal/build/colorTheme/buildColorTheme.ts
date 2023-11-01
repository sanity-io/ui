import {
  ThemeColorButton,
  ThemeColorButtonStates,
  ThemeColorButtonTones,
  ThemeColorCard,
  ThemeColorGenericState,
} from '../../../lib/theme'
import {ThemeConfig} from '../../config'
import {COLOR_BUTTON_MODES, COLOR_STATE_TONES, COLOR_STATES} from '../../constants'
import {
  ColorBaseTone,
  ColorButtonMode,
  ColorState,
  ColorStateTone,
  TMP_BaseColorTheme,
  TMP_ColorTheme,
} from '../../types'
import {defaultColorTokens} from '../defaults/colorTokens'
import {ColorTokenContext, resolveColorTokenValue as _color} from '../helpers'
import {resolveColorTokens} from './resolveColorTokens'

export function buildColorTheme(
  options: {scheme: 'light' | 'dark'},
  config?: ThemeConfig,
): TMP_ColorTheme {
  const {scheme} = options

  const resolvedConfig = {
    ...config,
    color: {
      ...config?.color,
      tokens: resolveColorTokens(config?.color?.tokens ?? defaultColorTokens),
    },
  }

  return {
    transparent: buildBaseColorTheme({scheme, tone: 'transparent'}, resolvedConfig),
    default: buildBaseColorTheme({scheme, tone: 'default'}, resolvedConfig),
    primary: buildBaseColorTheme({scheme, tone: 'primary'}, resolvedConfig),
    positive: buildBaseColorTheme({scheme, tone: 'positive'}, resolvedConfig),
    caution: buildBaseColorTheme({scheme, tone: 'caution'}, resolvedConfig),
    critical: buildBaseColorTheme({scheme, tone: 'critical'}, resolvedConfig),
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
    card: buildCardColorTheme({scheme, tone}, config),
  }
}

function buildButtonColorTheme(
  options: {scheme: 'light' | 'dark'},
  config?: ThemeConfig,
): ThemeColorButton {
  const {scheme} = options

  const modes: Partial<ThemeColorButton> = {}

  for (const mode of COLOR_BUTTON_MODES) {
    modes[mode] = buildButtonTonesColorTheme({scheme, mode}, config)
  }

  return modes as ThemeColorButton
}

function buildButtonTonesColorTheme(
  options: {
    scheme: 'light' | 'dark'
    mode: ColorButtonMode
  },
  config?: ThemeConfig,
): ThemeColorButtonTones {
  const {mode, scheme} = options

  const tones: Partial<ThemeColorButtonTones> = {}

  for (const tone of COLOR_STATE_TONES) {
    tones[tone] = buildButtonStatesColorTheme({mode, scheme, tone}, config)
  }

  return tones as ThemeColorButtonTones
}

function buildButtonStatesColorTheme(
  options: {
    mode: ColorButtonMode
    scheme: 'light' | 'dark'
    tone: ColorStateTone
  },
  config?: ThemeConfig,
): ThemeColorButtonStates {
  const {mode, scheme, tone} = options

  const states: Partial<ThemeColorButtonStates> = {}

  for (const state of COLOR_STATES) {
    states[state] = buildButtonStateColorTheme({mode, tone, scheme, state}, config)
  }

  return states as ThemeColorButtonStates
}

function buildButtonStateColorTheme(
  options: {
    mode: ColorButtonMode
    tone: ColorStateTone
    scheme: 'light' | 'dark'
    state: ColorState
  },
  config?: ThemeConfig,
): ThemeColorGenericState {
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
    iconColor: _color(context, tokens?.fg || ['500', '400']),
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

function buildCardColorTheme(
  options: {scheme: 'light' | 'dark'; tone: ColorBaseTone},
  config?: ThemeConfig,
): ThemeColorCard {
  const {scheme, tone} = options

  const states: Partial<ThemeColorCard> = {}

  for (const state of COLOR_STATES) {
    states[state] = buildCardStateColorTheme({scheme, state, tone}, config)
  }

  return states as ThemeColorCard
}

function buildCardStateColorTheme(
  options: {scheme: 'light' | 'dark'; state: ColorState; tone: ColorBaseTone},
  config?: ThemeConfig,
): ThemeColorGenericState {
  const {scheme, state, tone} = options
  const tokens = config?.color?.tokens?.card?.[state]
  const hue = tokens?._hue || config?.color?.tokens?.[tone]?._hue || 'gray'
  const blendMode = tokens?._blend || ['screen', 'multiply']
  const context: ColorTokenContext = {hue, scheme}

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    bg: _color(context, tokens?.bg || ['500', '400']),
    bg2: _color(context, tokens?.bg2 || ['500', '400']),
    fg: _color(context, tokens?.fg || ['white', 'black']),
    border: _color(context, tokens?.border || ['500', '400']),
    iconColor: _color(context, tokens?.fg || ['500', '400']),
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
