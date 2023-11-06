import {ThemeConfig} from '../../config'
import {
  COLOR_BUTTON_MODES,
  COLOR_STATE_TONES,
  COLOR_STATES,
  ColorBaseTone,
  ColorButtonMode,
  ColorState,
  ColorStateTone,
} from '../../system'
import {
  ThemeColor,
  ThemeColorButton,
  ThemeColorButtonStates,
  ThemeColorButtonTones,
  ThemeColorCard,
  ThemeColorGenericState,
  ThemeColorInput,
  ThemeColorInputState,
  ThemeColorInputStates,
  ThemeColorScheme,
  ThemeColorSchemes,
  ThemeColorSpot,
  ThemeColorSyntax,
} from '../../types'
import {ColorTokenContext, resolveColorTokenValue as _color} from './colorToken'
import {defaultColorTokens} from './defaults/colorTokens'
import {resolveColorTokens} from './resolveColorTokens'

export function buildColorTheme(config?: ThemeConfig): ThemeColorSchemes {
  return {
    light: buildColorScheme({scheme: 'light'}, config),
    dark: buildColorScheme({scheme: 'dark'}, config),
  }
}

export function buildColorScheme(
  options: {scheme: 'light' | 'dark'},
  config?: ThemeConfig,
): ThemeColorScheme {
  const {scheme} = options

  const resolvedConfig = {
    ...config,
    color: {
      ...resolveColorTokens(config?.color ?? defaultColorTokens),
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
): ThemeColor {
  const {scheme, tone} = options
  const tokens = config?.color?.base?.[tone]
  const hue = tokens?._hue || 'gray'
  const context: ColorTokenContext = {hue, scheme}
  const bg = _color(context, tokens?.bg || ['gray/50', 'black'])
  const blendMode = tokens?._blend || ['screen', 'multiply']

  // Build `button` color theme
  // Also used for `solid` and `muted` color themes
  const button = buildButtonColorTheme({scheme}, config)

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    dark: scheme === 'dark',
    base: {
      bg,
      fg: _color(context, tokens?.fg || ['black', 'white']),
      border: _color(context, tokens?.border || ['black', 'white']),
      focusRing: _color(context, tokens?.focusRing || ['black', 'white']),
      shadow: {
        outline: _color(context, tokens?.shadow?.outline || ['500/0.3', '500/0.3']),
        umbra: _color(context, tokens?.shadow?.umbra || ['500/0.2', 'black/0.4']),
        penumbra: _color(context, tokens?.shadow?.penumbra || ['500/0.07', 'black/0.14']),
        ambient: _color(context, tokens?.shadow?.ambient || ['500/0.06', 'black/0.12']),
      },
      skeleton: {
        from: _color(context, tokens?.skeleton?.from || ['500/0.2', '500/0.2']),
        to: _color(context, tokens?.skeleton?.to || ['500/0.2', '500/0.2']),
      },
    },
    button,
    card: buildCardColorTheme({scheme, baseTone: tone}, config),
    input: buildInputColorTheme({scheme, tone}, config),
    spot: buildSpotColorTheme({scheme}, config),
    syntax: buildSyntaxColorTheme({scheme}, config),
    solid: {
      ...button.default,
      transparent: button.default.default,
    },
    muted: {
      ...button.bleed,
      transparent: button.bleed.default,
    },
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
  const tokens = config?.color?.button?.[mode]?.[tone]?.[state]
  const hue = tokens?._hue || 'gray'
  const blendMode = tokens?._blend || ['screen', 'multiply']
  const context: ColorTokenContext = {hue, scheme}

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    bg: _color(context, tokens?.bg || ['500', '400']),
    bg2: _color(context, tokens?.bg2 || ['950', '50']),
    fg: _color(context, tokens?.fg || ['white', 'black']),
    border: _color(context, tokens?.border || ['500', '400']),
    icon: _color(context, tokens?.fg || ['500', '400']),
    muted: {
      fg: _color(context, tokens?.muted?.fg || ['500', '400']),
    },
    accent: {
      fg: _color(context, tokens?.accent?.fg || ['500', '400']),
    },
    link: {
      fg: _color(context, tokens?.link?.fg || ['500', '400']),
    },
    code: {
      bg: _color(context, tokens?.code?.bg || ['500', '400']),
      fg: _color(context, tokens?.code?.fg || ['500', '400']),
    },
    skeleton: {
      from: _color(context, tokens?.skeleton?.from || ['500', '400']),
      to: _color(context, tokens?.skeleton?.to || ['500', '400']),
    },
  }
}

function buildCardColorTheme(
  options: {scheme: 'light' | 'dark'; baseTone: ColorBaseTone},
  config?: ThemeConfig,
): ThemeColorCard {
  const {scheme, baseTone} = options

  const states: Partial<ThemeColorCard> = {}

  for (const state of COLOR_STATES) {
    states[state] = buildCardStateColorTheme({scheme, state, baseTone}, config)
  }

  return states as ThemeColorCard
}

function buildCardStateColorTheme(
  options: {scheme: 'light' | 'dark'; state: ColorState; baseTone: ColorBaseTone},
  config?: ThemeConfig,
): ThemeColorGenericState {
  const {scheme, state, baseTone} = options
  const tokens = config?.color?.card?.[state]
  const hue = tokens?._hue || config?.color?.base?.[baseTone]?._hue || 'gray'
  const blendMode = tokens?._blend || ['screen', 'multiply']
  const context: ColorTokenContext = {hue, scheme}

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    bg: _color(context, tokens?.bg || ['50', '950']),
    bg2: _color(context, tokens?.bg2 || ['50', '950']),
    fg: _color(context, tokens?.fg || ['black', 'white']),
    border: _color(context, tokens?.border || ['200', '800']),
    icon: _color(context, tokens?.fg || ['500', '400']),
    muted: {
      fg: _color(context, tokens?.muted?.fg || ['600', '400']),
    },
    accent: {
      fg: _color(context, tokens?.accent?.fg || ['600', '400']),
    },
    link: {
      fg: _color(context, tokens?.link?.fg || ['600', '400']),
    },
    code: {
      bg: _color(context, tokens?.code?.bg || ['600', '400']),
      fg: _color(context, tokens?.code?.fg || ['600', '400']),
    },
    skeleton: {
      from: _color(context, tokens?.skeleton?.from || ['100', '900']),
      to: _color(context, tokens?.skeleton?.to || ['100/0.5', '900/0.5']),
    },
  }
}

function buildInputColorTheme(
  options: {scheme: 'light' | 'dark'; tone: ColorBaseTone},
  config?: ThemeConfig,
): ThemeColorInput {
  const {scheme, tone} = options

  return {
    default: buildInputStatesColorTheme({mode: 'default', scheme, tone}, config),
    invalid: buildInputStatesColorTheme({mode: 'invalid', scheme, tone}, config),
  }
}

function buildInputStatesColorTheme(
  options: {
    mode: 'default' | 'invalid'
    scheme: 'light' | 'dark'
    tone: ColorBaseTone
  },
  config?: ThemeConfig,
): ThemeColorInputStates {
  const {mode, scheme, tone} = options

  return {
    enabled: buildInputStateColorTheme({mode, scheme, state: 'enabled', tone}, config),
    hovered: buildInputStateColorTheme({mode, scheme, state: 'hovered', tone}, config),
    readOnly: buildInputStateColorTheme({mode, scheme, state: 'readOnly', tone}, config),
    disabled: buildInputStateColorTheme({mode, scheme, state: 'disabled', tone}, config),
  }
}

function buildInputStateColorTheme(
  options: {
    mode: 'default' | 'invalid'
    scheme: 'light' | 'dark'
    state: 'enabled' | 'hovered' | 'readOnly' | 'disabled'
    tone: ColorBaseTone
  },
  config?: ThemeConfig,
): ThemeColorInputState {
  const {mode, tone, scheme, state} = options
  const tokens = config?.color?.input?.[mode]?.[state]
  const hue = tokens?._hue || config?.color?.base?.[tone]?._hue || 'gray'
  const blendMode = tokens?._blend || ['screen', 'multiply']
  const context: ColorTokenContext = {hue, scheme}

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    bg: _color(context, tokens?.bg || ['white', 'black']),
    bg2: _color(context, tokens?.bg2 || ['50', '950']),
    fg: _color(context, tokens?.fg || ['black', 'white']),
    border: _color(context, tokens?.border || ['200', '900']),
    placeholder: _color(context, tokens?.placeholder || ['500', '400']),
  }
}

function buildSpotColorTheme(
  options: {scheme: 'light' | 'dark'},
  config?: ThemeConfig,
): ThemeColorSpot {
  const {scheme} = options
  const tokens = config?.color?.spot
  const context: ColorTokenContext = {hue: 'gray', scheme}

  return {
    gray: _color(context, tokens?.gray || ['gray/500', 'gray/500']),
    cyan: _color(context, tokens?.cyan || ['cyan/500', 'cyan/500']),
    blue: _color(context, tokens?.blue || ['blue/500', 'blue/500']),
    purple: _color(context, tokens?.purple || ['purple/500', 'purple/500']),
    magenta: _color(context, tokens?.magenta || ['magenta/500', 'magenta/500']),
    red: _color(context, tokens?.red || ['red/500', 'red/500']),
    orange: _color(context, tokens?.orange || ['orange/500', 'orange/500']),
    yellow: _color(context, tokens?.yellow || ['yellow/500', 'yellow/500']),
    green: _color(context, tokens?.green || ['green/500', 'green/500']),
  }
}

function buildSyntaxColorTheme(
  options: {scheme: 'light' | 'dark'},
  config?: ThemeConfig,
): ThemeColorSyntax {
  const {scheme} = options
  const tokens = config?.color?.syntax
  const context: ColorTokenContext = {hue: 'gray', scheme}

  return {
    atrule: _color(context, tokens?.atrule || ['purple/600', 'purple/300']),
    attrName: _color(context, tokens?.attrName || ['purple/600', 'purple/300']),
    attrValue: _color(context, tokens?.attrValue || ['purple/600', 'purple/300']),
    attribute: _color(context, tokens?.attribute || ['purple/600', 'purple/300']),
    boolean: _color(context, tokens?.boolean || ['purple/600', 'purple/300']),
    builtin: _color(context, tokens?.builtin || ['purple/600', 'purple/300']),
    cdata: _color(context, tokens?.cdata || ['purple/600', 'purple/300']),
    char: _color(context, tokens?.char || ['purple/600', 'purple/300']),
    class: _color(context, tokens?.class || ['purple/600', 'purple/300']),
    className: _color(context, tokens?.className || ['purple/600', 'purple/300']),
    comment: _color(context, tokens?.comment || ['purple/600', 'purple/300']),
    constant: _color(context, tokens?.constant || ['purple/600', 'purple/300']),
    deleted: _color(context, tokens?.deleted || ['purple/600', 'purple/300']),
    doctype: _color(context, tokens?.doctype || ['purple/600', 'purple/300']),
    entity: _color(context, tokens?.entity || ['purple/600', 'purple/300']),
    function: _color(context, tokens?.function || ['purple/600', 'purple/300']),
    hexcode: _color(context, tokens?.hexcode || ['purple/600', 'purple/300']),
    id: _color(context, tokens?.id || ['purple/600', 'purple/300']),
    important: _color(context, tokens?.important || ['purple/600', 'purple/300']),
    inserted: _color(context, tokens?.inserted || ['purple/600', 'purple/300']),
    keyword: _color(context, tokens?.keyword || ['purple/600', 'purple/300']),
    number: _color(context, tokens?.number || ['purple/600', 'purple/300']),
    operator: _color(context, tokens?.operator || ['purple/600', 'purple/300']),
    prolog: _color(context, tokens?.prolog || ['purple/600', 'purple/300']),
    property: _color(context, tokens?.property || ['purple/600', 'purple/300']),
    pseudoClass: _color(context, tokens?.pseudoClass || ['purple/600', 'purple/300']),
    pseudoElement: _color(context, tokens?.pseudoElement || ['purple/600', 'purple/300']),
    punctuation: _color(context, tokens?.punctuation || ['purple/600', 'purple/300']),
    regex: _color(context, tokens?.regex || ['purple/600', 'purple/300']),
    selector: _color(context, tokens?.selector || ['purple/600', 'purple/300']),
    string: _color(context, tokens?.string || ['purple/600', 'purple/300']),
    symbol: _color(context, tokens?.symbol || ['purple/600', 'purple/300']),
    tag: _color(context, tokens?.tag || ['purple/600', 'purple/300']),
    unit: _color(context, tokens?.unit || ['purple/600', 'purple/300']),
    url: _color(context, tokens?.url || ['purple/600', 'purple/300']),
    variable: _color(context, tokens?.variable || ['purple/600', 'purple/300']),
  }
}
