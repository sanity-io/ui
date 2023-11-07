import {ThemeColorTokenValue, ThemeConfig} from '../config'
import {
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_STATES,
  THEME_COLOR_STATE_TONES,
  ThemeColorAvatarColorKey,
  ThemeColorBaseToneKey,
  ThemeColorButtonModeKey,
  ThemeColorStateKey,
  ThemeColorStateToneKey,
  ThemeColor,
  ThemeColorAvatar,
  ThemeColorBadge,
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
} from '../system'
import {ColorTokenContext, resolveColorTokenValue as _color} from './colorToken'
import {resolveColorTokens} from './resolveColorTokens'

const DEFAULT_COLOR_TOKEN_VALUE: ThemeColorTokenValue = ['500', '500']

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

  const resolvedConfig: ThemeConfig = {
    ...config,
    color: resolveColorTokens(config?.color),
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
  options: {scheme: 'light' | 'dark'; tone: ThemeColorBaseToneKey},
  config?: ThemeConfig,
): ThemeColor {
  const {scheme, tone} = options
  const tokens = config?.color?.base?.[tone]
  const hue = tokens?._hue || 'gray'
  const context: ColorTokenContext = {hue, scheme}
  const bg = _color(context, tokens?.bg || DEFAULT_COLOR_TOKEN_VALUE)
  const blendMode = tokens?._blend || ['screen', 'multiply']

  // Build `button` color theme
  // Also used for `solid` and `muted` color themes
  const button = buildButtonColorTheme({scheme}, config)

  const selectable = buildSelectableColorTheme({scheme}, config)

  const _dark = scheme === 'dark'

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    _dark,
    avatar: buildAvatarColorTheme({scheme}, config),
    badge: buildBadgeColorTheme({scheme}, config),
    base: {
      bg,
      fg: _color(context, tokens?.fg || DEFAULT_COLOR_TOKEN_VALUE),
      border: _color(context, tokens?.border || DEFAULT_COLOR_TOKEN_VALUE),
      focusRing: _color(context, tokens?.focusRing || DEFAULT_COLOR_TOKEN_VALUE),
      shadow: {
        outline: _color(context, tokens?.shadow?.outline || DEFAULT_COLOR_TOKEN_VALUE),
        umbra: _color(context, tokens?.shadow?.umbra || DEFAULT_COLOR_TOKEN_VALUE),
        penumbra: _color(context, tokens?.shadow?.penumbra || DEFAULT_COLOR_TOKEN_VALUE),
        ambient: _color(context, tokens?.shadow?.ambient || DEFAULT_COLOR_TOKEN_VALUE),
      },
      skeleton: {
        from: _color(context, tokens?.skeleton?.from || DEFAULT_COLOR_TOKEN_VALUE),
        to: _color(context, tokens?.skeleton?.to || DEFAULT_COLOR_TOKEN_VALUE),
      },
    },
    button,
    // card: buildCardColorTheme({scheme, baseTone: tone}, config),
    card: selectable.default satisfies ThemeColorCard,
    input: buildInputColorTheme({scheme, tone}, config),
    kbd: {
      _blend: (config?.color?.kbd?._blend || ['multiply', 'screen'])[scheme === 'light' ? 0 : 1],
      bg: _color(context, config?.color?.kbd?.bg || DEFAULT_COLOR_TOKEN_VALUE),
      fg: _color(context, config?.color?.kbd?.fg || DEFAULT_COLOR_TOKEN_VALUE),
      border: _color(context, config?.color?.kbd?.border || DEFAULT_COLOR_TOKEN_VALUE),
    },
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
    selectable,

    dark: _dark, // deprecated
  }
}

function buildAvatarColorTheme(
  options: {scheme: 'light' | 'dark'},
  config?: ThemeConfig,
): ThemeColorAvatar {
  const {scheme} = options

  return {
    gray: _buildAvatarColorTheme({color: 'gray', scheme}, config),
    blue: _buildAvatarColorTheme({color: 'blue', scheme}, config),
    purple: _buildAvatarColorTheme({color: 'purple', scheme}, config),
    magenta: _buildAvatarColorTheme({color: 'magenta', scheme}, config),
    red: _buildAvatarColorTheme({color: 'red', scheme}, config),
    orange: _buildAvatarColorTheme({color: 'orange', scheme}, config),
    yellow: _buildAvatarColorTheme({color: 'yellow', scheme}, config),
    green: _buildAvatarColorTheme({color: 'green', scheme}, config),
    cyan: _buildAvatarColorTheme({color: 'cyan', scheme}, config),
  }
}

function _buildAvatarColorTheme(
  options: {color: ThemeColorAvatarColorKey; scheme: 'light' | 'dark'},
  config?: ThemeConfig,
): ThemeColorAvatar['gray'] {
  const {color, scheme} = options
  const tokens = config?.color?.avatar?.[color]
  const context: ColorTokenContext = {hue: tokens?._hue || 'gray', scheme}
  const blendMode = tokens?._blend || ['multiply', 'screen']

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    bg: _color(context, tokens?.bg || DEFAULT_COLOR_TOKEN_VALUE),
    fg: _color(context, tokens?.fg || DEFAULT_COLOR_TOKEN_VALUE),
  }
}

function buildBadgeColorTheme(
  options: {scheme: 'light' | 'dark'},
  config?: ThemeConfig,
): ThemeColorBadge {
  const {scheme} = options

  return {
    default: _buildBadgeColorTheme({scheme, tone: 'default'}, config),
    primary: _buildBadgeColorTheme({scheme, tone: 'primary'}, config),
    positive: _buildBadgeColorTheme({scheme, tone: 'positive'}, config),
    caution: _buildBadgeColorTheme({scheme, tone: 'caution'}, config),
    critical: _buildBadgeColorTheme({scheme, tone: 'critical'}, config),
  }
}

function _buildBadgeColorTheme(
  options: {scheme: 'light' | 'dark'; tone: ThemeColorStateToneKey},
  config?: ThemeConfig,
): ThemeColorBadge['default'] {
  const {scheme, tone} = options
  const tokens = config?.color?.badge?.[tone]
  const hue = tokens?._hue || config?.color?.base?.[tone]?._hue || 'gray'
  const context: ColorTokenContext = {hue, scheme}
  const blendMode = tokens?._blend || ['multiply', 'screen']

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    bg: _color(context, tokens?.bg || DEFAULT_COLOR_TOKEN_VALUE),
    fg: _color(context, tokens?.fg || DEFAULT_COLOR_TOKEN_VALUE),
  }
}

function buildButtonColorTheme(
  options: {scheme: 'light' | 'dark'},
  config?: ThemeConfig,
): ThemeColorButton {
  const {scheme} = options

  const modes: Partial<ThemeColorButton> = {}

  for (const mode of THEME_COLOR_BUTTON_MODES) {
    modes[mode] = buildButtonTonesColorTheme({scheme, mode}, config)
  }

  return modes as ThemeColorButton
}

function buildButtonTonesColorTheme(
  options: {
    scheme: 'light' | 'dark'
    mode: ThemeColorButtonModeKey
  },
  config?: ThemeConfig,
): ThemeColorButtonTones {
  const {mode, scheme} = options

  const tones: Partial<ThemeColorButtonTones> = {}

  for (const tone of THEME_COLOR_STATE_TONES) {
    tones[tone] = buildButtonStatesColorTheme({mode, scheme, tone}, config)
  }

  return tones as ThemeColorButtonTones
}

function buildButtonStatesColorTheme(
  options: {
    mode: ThemeColorButtonModeKey
    scheme: 'light' | 'dark'
    tone: ThemeColorStateToneKey
  },
  config?: ThemeConfig,
): ThemeColorButtonStates {
  const {mode, scheme, tone} = options

  const states: Partial<ThemeColorButtonStates> = {}

  for (const state of THEME_COLOR_STATES) {
    states[state] = buildButtonStateColorTheme({mode, tone, scheme, state}, config)
  }

  return states as ThemeColorButtonStates
}

function buildButtonStateColorTheme(
  options: {
    mode: ThemeColorButtonModeKey
    tone: ThemeColorStateToneKey
    scheme: 'light' | 'dark'
    state: ThemeColorStateKey
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
    bg: _color(context, tokens?.bg || DEFAULT_COLOR_TOKEN_VALUE),
    bg2: _color(context, tokens?.bg2 || DEFAULT_COLOR_TOKEN_VALUE),
    fg: _color(context, tokens?.fg || DEFAULT_COLOR_TOKEN_VALUE),
    border: _color(context, tokens?.border || DEFAULT_COLOR_TOKEN_VALUE),
    icon: _color(context, tokens?.icon || DEFAULT_COLOR_TOKEN_VALUE),
    muted: {
      fg: _color(context, tokens?.muted?.fg || DEFAULT_COLOR_TOKEN_VALUE),
    },
    accent: {
      fg: _color(context, tokens?.accent?.fg || DEFAULT_COLOR_TOKEN_VALUE),
    },
    link: {
      fg: _color(context, tokens?.link?.fg || DEFAULT_COLOR_TOKEN_VALUE),
    },
    code: {
      bg: _color(context, tokens?.code?.bg || DEFAULT_COLOR_TOKEN_VALUE),
      fg: _color(context, tokens?.code?.fg || DEFAULT_COLOR_TOKEN_VALUE),
    },
    skeleton: {
      from: _color(context, tokens?.skeleton?.from || DEFAULT_COLOR_TOKEN_VALUE),
      to: _color(context, tokens?.skeleton?.to || DEFAULT_COLOR_TOKEN_VALUE),
    },
  }
}

// function buildCardColorTheme(
//   options: {scheme: 'light' | 'dark'; baseTone: ColorBaseTone},
//   config?: ThemeConfig,
// ): ThemeColorCard {
//   const {scheme, baseTone} = options

//   const states: Partial<ThemeColorCard> = {}

//   for (const state of COLOR_STATES) {
//     states[state] = buildCardStateColorTheme({scheme, state, baseTone}, config)
//   }

//   return states as ThemeColorCard
// }

// function buildCardStateColorTheme(
//   options: {scheme: 'light' | 'dark'; state: ColorState; baseTone: ColorBaseTone},
//   config?: ThemeConfig,
// ): ThemeColorGenericState {
//   const {scheme, state, baseTone} = options
//   const tokens = config?.color?.card?.[state]
//   const hue = tokens?._hue || config?.color?.base?.[baseTone]?._hue || 'gray'
//   const blendMode = tokens?._blend || ['screen', 'multiply']
//   const context: ColorTokenContext = {hue, scheme}

//   return {
//     _blend: blendMode[scheme === 'light' ? 0 : 1],
//     bg: _color(context, tokens?.bg || ['50', '950']),
//     bg2: _color(context, tokens?.bg2 || ['50', '950']),
//     fg: _color(context, tokens?.fg || ['black', 'white']),
//     border: _color(context, tokens?.border || ['200', '800']),
//     icon: _color(context, tokens?.icon || ['500', '400']),
//     muted: {
//       fg: _color(context, tokens?.muted?.fg || ['600', '400']),
//     },
//     accent: {
//       fg: _color(context, tokens?.accent?.fg || ['600', '400']),
//     },
//     link: {
//       fg: _color(context, tokens?.link?.fg || ['600', '400']),
//     },
//     code: {
//       bg: _color(context, tokens?.code?.bg || ['600', '400']),
//       fg: _color(context, tokens?.code?.fg || ['600', '400']),
//     },
//     skeleton: {
//       from: _color(context, tokens?.skeleton?.from || ['100', '900']),
//       to: _color(context, tokens?.skeleton?.to || ['100/0.5', '900/0.5']),
//     },
//   }
// }

function buildInputColorTheme(
  options: {scheme: 'light' | 'dark'; tone: ThemeColorBaseToneKey},
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
    tone: ThemeColorBaseToneKey
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
    tone: ThemeColorBaseToneKey
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
    bg: _color(context, tokens?.bg || DEFAULT_COLOR_TOKEN_VALUE),
    bg2: _color(context, tokens?.bg2 || DEFAULT_COLOR_TOKEN_VALUE),
    fg: _color(context, tokens?.fg || DEFAULT_COLOR_TOKEN_VALUE),
    border: _color(context, tokens?.border || DEFAULT_COLOR_TOKEN_VALUE),
    placeholder: _color(context, tokens?.placeholder || DEFAULT_COLOR_TOKEN_VALUE),
  }
}

function buildSelectableColorTheme(
  options: {
    scheme: 'light' | 'dark'
  },
  config?: ThemeConfig,
): ThemeColorButtonTones {
  const {scheme} = options

  const tones: Partial<ThemeColorButtonTones> = {}

  for (const tone of THEME_COLOR_STATE_TONES) {
    tones[tone] = buildSelectableStatesColorTheme({scheme, tone}, config)
  }

  return tones as ThemeColorButtonTones
}

function buildSelectableStatesColorTheme(
  options: {
    scheme: 'light' | 'dark'
    tone: ThemeColorStateToneKey
  },
  config?: ThemeConfig,
): ThemeColorButtonStates {
  const {scheme, tone} = options

  const states: Partial<ThemeColorButtonStates> = {}

  for (const state of THEME_COLOR_STATES) {
    states[state] = buildSelectableStateColorTheme({tone, scheme, state}, config)
  }

  return states as ThemeColorButtonStates
}

function buildSelectableStateColorTheme(
  options: {
    scheme: 'light' | 'dark'
    state: ThemeColorStateKey
    tone: ThemeColorStateToneKey
  },
  config?: ThemeConfig,
): ThemeColorGenericState {
  const {scheme, state, tone} = options
  const tokens = config?.color?.selectable?.[tone]?.[state]
  const hue = tokens?._hue || 'gray'
  const blendMode = tokens?._blend || ['screen', 'multiply']
  const context: ColorTokenContext = {hue, scheme}

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    bg: _color(context, tokens?.bg || DEFAULT_COLOR_TOKEN_VALUE),
    bg2: _color(context, tokens?.bg2 || DEFAULT_COLOR_TOKEN_VALUE),
    fg: _color(context, tokens?.fg || DEFAULT_COLOR_TOKEN_VALUE),
    border: _color(context, tokens?.border || DEFAULT_COLOR_TOKEN_VALUE),
    icon: _color(context, tokens?.icon || DEFAULT_COLOR_TOKEN_VALUE),
    muted: {
      fg: _color(context, tokens?.muted?.fg || DEFAULT_COLOR_TOKEN_VALUE),
    },
    accent: {
      fg: _color(context, tokens?.accent?.fg || DEFAULT_COLOR_TOKEN_VALUE),
    },
    link: {
      fg: _color(context, tokens?.link?.fg || DEFAULT_COLOR_TOKEN_VALUE),
    },
    code: {
      bg: _color(context, tokens?.code?.bg || DEFAULT_COLOR_TOKEN_VALUE),
      fg: _color(context, tokens?.code?.fg || DEFAULT_COLOR_TOKEN_VALUE),
    },
    skeleton: {
      from: _color(context, tokens?.skeleton?.from || DEFAULT_COLOR_TOKEN_VALUE),
      to: _color(context, tokens?.skeleton?.to || DEFAULT_COLOR_TOKEN_VALUE),
    },
  }
}

function buildSpotColorTheme(
  options: {scheme: 'light' | 'dark'},
  config?: ThemeConfig,
): ThemeColorSpot {
  const {scheme} = options
  const tokens = config?.color?.avatar
  const context: ColorTokenContext = {hue: 'gray', scheme}

  return {
    gray: _color(context, tokens?.gray?.bg || DEFAULT_COLOR_TOKEN_VALUE),
    cyan: _color(context, tokens?.cyan?.bg || DEFAULT_COLOR_TOKEN_VALUE),
    blue: _color(context, tokens?.blue?.bg || DEFAULT_COLOR_TOKEN_VALUE),
    purple: _color(context, tokens?.purple?.bg || DEFAULT_COLOR_TOKEN_VALUE),
    magenta: _color(context, tokens?.magenta?.bg || DEFAULT_COLOR_TOKEN_VALUE),
    red: _color(context, tokens?.red?.bg || DEFAULT_COLOR_TOKEN_VALUE),
    orange: _color(context, tokens?.orange?.bg || DEFAULT_COLOR_TOKEN_VALUE),
    yellow: _color(context, tokens?.yellow?.bg || DEFAULT_COLOR_TOKEN_VALUE),
    green: _color(context, tokens?.green?.bg || DEFAULT_COLOR_TOKEN_VALUE),
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
    atrule: _color(context, tokens?.atrule || DEFAULT_COLOR_TOKEN_VALUE),
    attrName: _color(context, tokens?.attrName || DEFAULT_COLOR_TOKEN_VALUE),
    attrValue: _color(context, tokens?.attrValue || DEFAULT_COLOR_TOKEN_VALUE),
    attribute: _color(context, tokens?.attribute || DEFAULT_COLOR_TOKEN_VALUE),
    boolean: _color(context, tokens?.boolean || DEFAULT_COLOR_TOKEN_VALUE),
    builtin: _color(context, tokens?.builtin || DEFAULT_COLOR_TOKEN_VALUE),
    cdata: _color(context, tokens?.cdata || DEFAULT_COLOR_TOKEN_VALUE),
    char: _color(context, tokens?.char || DEFAULT_COLOR_TOKEN_VALUE),
    class: _color(context, tokens?.class || DEFAULT_COLOR_TOKEN_VALUE),
    className: _color(context, tokens?.className || DEFAULT_COLOR_TOKEN_VALUE),
    comment: _color(context, tokens?.comment || DEFAULT_COLOR_TOKEN_VALUE),
    constant: _color(context, tokens?.constant || DEFAULT_COLOR_TOKEN_VALUE),
    deleted: _color(context, tokens?.deleted || DEFAULT_COLOR_TOKEN_VALUE),
    doctype: _color(context, tokens?.doctype || DEFAULT_COLOR_TOKEN_VALUE),
    entity: _color(context, tokens?.entity || DEFAULT_COLOR_TOKEN_VALUE),
    function: _color(context, tokens?.function || DEFAULT_COLOR_TOKEN_VALUE),
    hexcode: _color(context, tokens?.hexcode || DEFAULT_COLOR_TOKEN_VALUE),
    id: _color(context, tokens?.id || DEFAULT_COLOR_TOKEN_VALUE),
    important: _color(context, tokens?.important || DEFAULT_COLOR_TOKEN_VALUE),
    inserted: _color(context, tokens?.inserted || DEFAULT_COLOR_TOKEN_VALUE),
    keyword: _color(context, tokens?.keyword || DEFAULT_COLOR_TOKEN_VALUE),
    number: _color(context, tokens?.number || DEFAULT_COLOR_TOKEN_VALUE),
    operator: _color(context, tokens?.operator || DEFAULT_COLOR_TOKEN_VALUE),
    prolog: _color(context, tokens?.prolog || DEFAULT_COLOR_TOKEN_VALUE),
    property: _color(context, tokens?.property || DEFAULT_COLOR_TOKEN_VALUE),
    pseudoClass: _color(context, tokens?.pseudoClass || DEFAULT_COLOR_TOKEN_VALUE),
    pseudoElement: _color(context, tokens?.pseudoElement || DEFAULT_COLOR_TOKEN_VALUE),
    punctuation: _color(context, tokens?.punctuation || DEFAULT_COLOR_TOKEN_VALUE),
    regex: _color(context, tokens?.regex || DEFAULT_COLOR_TOKEN_VALUE),
    selector: _color(context, tokens?.selector || DEFAULT_COLOR_TOKEN_VALUE),
    string: _color(context, tokens?.string || DEFAULT_COLOR_TOKEN_VALUE),
    symbol: _color(context, tokens?.symbol || DEFAULT_COLOR_TOKEN_VALUE),
    tag: _color(context, tokens?.tag || DEFAULT_COLOR_TOKEN_VALUE),
    unit: _color(context, tokens?.unit || DEFAULT_COLOR_TOKEN_VALUE),
    url: _color(context, tokens?.url || DEFAULT_COLOR_TOKEN_VALUE),
    variable: _color(context, tokens?.variable || DEFAULT_COLOR_TOKEN_VALUE),
  }
}
