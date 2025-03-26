import {ThemeColorBadgeTokens, ThemeColorStateTokens, ThemeConfig} from '../config'
import {
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
  THEME_COLOR_STATES,
  ThemeColorAvatar_v2,
  ThemeColorAvatarColorKey,
  ThemeColorAvatarHue_v2,
  ThemeColorBadge_v2,
  ThemeColorButton_v2,
  ThemeColorButtonMode_v2,
  ThemeColorButtonModeKey,
  ThemeColorButtonTone_v2,
  ThemeColorCard_v2,
  ThemeColorCardToneKey,
  ThemeColorInput_v2,
  ThemeColorInputMode_v2,
  ThemeColorInputState_v2,
  ThemeColorScheme_v2,
  ThemeColorSchemeKey,
  ThemeColorSchemes_v2,
  ThemeColorShadow,
  ThemeColorState_v2,
  ThemeColorStateKey,
  ThemeColorStateToneKey,
  ThemeColorSyntax,
} from '../system'
import {ColorTokenContext, resolveColorTokenValue as _color} from './colorToken'
import {resolveColorTokens} from './resolveColorTokens'

export function buildColorTheme(config?: ThemeConfig): ThemeColorSchemes_v2 {
  const resolvedConfig: ThemeConfig = {
    ...config,
    color: resolveColorTokens(config?.color),
  }

  return {
    light: buildColorScheme({scheme: 'light'}, resolvedConfig),
    dark: buildColorScheme({scheme: 'dark'}, resolvedConfig),
  }
}

function buildColorScheme(
  options: {scheme: ThemeColorSchemeKey},
  config: ThemeConfig,
): ThemeColorScheme_v2 {
  const {scheme} = options

  const colorScheme = {} as ThemeColorScheme_v2

  for (const tone of THEME_COLOR_CARD_TONES) {
    colorScheme[tone] = buildCardColorTheme({scheme, tone}, config)
  }

  return colorScheme
}

function buildCardColorTheme(
  options: {scheme: ThemeColorSchemeKey; tone: ThemeColorCardToneKey},
  config?: ThemeConfig,
): ThemeColorCard_v2 {
  const {scheme, tone} = options
  const tokens = config?.color?.base?.[tone]
  const hue = tokens?._hue || 'gray'
  const context: ColorTokenContext = {hue, scheme}
  const blendMode = tokens?._blend || ['multiply', 'screen']

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    _dark: scheme === 'dark',
    accent: {
      fg: _color(context, tokens?.accent?.fg),
    },
    avatar: buildAvatarColorTheme({scheme}, tokens),
    backdrop: _color(context, tokens?.backdrop),
    badge: buildBadgeColorTheme(tokens?.badge, {scheme}, config),
    bg: _color(context, tokens?.bg),
    border: _color(context, tokens?.border),
    button: buildButtonColorTheme({scheme, tone}, config),
    code: {
      bg: _color(context, tokens?.code?.bg),
      fg: _color(context, tokens?.code?.fg),
    },
    fg: _color(context, tokens?.fg),
    focusRing: _color(context, tokens?.focusRing),
    icon: _color(context, tokens?.icon),
    input: buildInputColorTheme({scheme, tone}, config),
    kbd: {
      bg: _color(context, tokens?.kbd?.bg),
      fg: _color(context, tokens?.kbd?.fg),
      border: _color(context, tokens?.kbd?.border),
    },
    link: {
      fg: _color(context, tokens?.link?.fg),
    },
    muted: {
      bg: _color(context, tokens?.muted?.bg),
      fg: _color(context, tokens?.muted?.fg),
    },
    selectable: buildSelectableColorTheme({scheme, tone}, config),
    shadow: buildShadowColorTheme({scheme, tone}, config),
    skeleton: {
      from: _color(context, tokens?.skeleton?.from),
      to: _color(context, tokens?.skeleton?.to),
    },
    syntax: buildSyntaxColorTheme({scheme}, config),
  }
}

function buildShadowColorTheme(
  options: {scheme: ThemeColorSchemeKey; tone: ThemeColorCardToneKey},
  config?: ThemeConfig,
): ThemeColorShadow {
  const {scheme, tone} = options
  const tokens = config?.color?.base?.[tone]
  const hue = tokens?._hue || 'gray'
  const context: ColorTokenContext = {hue, scheme}

  return {
    outline: _color(context, tokens?.shadow?.outline),
    umbra: _color(context, tokens?.shadow?.umbra),
    penumbra: _color(context, tokens?.shadow?.penumbra),
    ambient: _color(context, tokens?.shadow?.ambient),
  }
}

function buildAvatarColorTheme(
  options: {scheme: ThemeColorSchemeKey},
  stateTokens?: ThemeColorStateTokens,
): ThemeColorAvatar_v2 {
  const {scheme} = options

  return {
    gray: _buildAvatarColorTheme({color: 'gray', scheme}, stateTokens),
    blue: _buildAvatarColorTheme({color: 'blue', scheme}, stateTokens),
    purple: _buildAvatarColorTheme({color: 'purple', scheme}, stateTokens),
    magenta: _buildAvatarColorTheme({color: 'magenta', scheme}, stateTokens),
    red: _buildAvatarColorTheme({color: 'red', scheme}, stateTokens),
    orange: _buildAvatarColorTheme({color: 'orange', scheme}, stateTokens),
    yellow: _buildAvatarColorTheme({color: 'yellow', scheme}, stateTokens),
    green: _buildAvatarColorTheme({color: 'green', scheme}, stateTokens),
    cyan: _buildAvatarColorTheme({color: 'cyan', scheme}, stateTokens),
  }
}

function _buildAvatarColorTheme(
  options: {color: ThemeColorAvatarColorKey; scheme: ThemeColorSchemeKey},
  stateTokens?: ThemeColorStateTokens,
): ThemeColorAvatarHue_v2 {
  const {color, scheme} = options
  const tokens = stateTokens?.avatar?.[color]
  const context: ColorTokenContext = {hue: tokens?._hue || 'gray', scheme}
  const blendMode = tokens?._blend || ['screen', 'multiply']

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    bg: _color(context, tokens?.bg),
    fg: _color(context, tokens?.fg),
  }
}

function buildBadgeColorTheme(
  tokens: ThemeColorBadgeTokens | undefined,
  options: {scheme: ThemeColorSchemeKey},
  config?: ThemeConfig,
): ThemeColorBadge_v2 {
  const {scheme} = options

  const colorBadge = {} as ThemeColorBadge_v2

  for (const tone of THEME_COLOR_STATE_TONES) {
    colorBadge[tone] = _buildBadgeColorTheme(tokens, {scheme, tone}, config)
  }

  return colorBadge
}

function _buildBadgeColorTheme(
  parentTokens: ThemeColorBadgeTokens | undefined,
  options: {scheme: ThemeColorSchemeKey; tone: ThemeColorStateToneKey},
  config?: ThemeConfig,
): ThemeColorBadge_v2['default'] {
  const {scheme, tone} = options
  const tokens = parentTokens?.[tone]
  const hue = tokens?._hue || config?.color?.base?.[tone]?._hue || 'gray'
  const context: ColorTokenContext = {hue, scheme}

  return {
    bg: _color(context, tokens?.bg),
    fg: _color(context, tokens?.fg),
    dot: _color(context, tokens?.dot),
    icon: _color(context, tokens?.icon),
  }
}

function buildButtonColorTheme(
  options: {scheme: ThemeColorSchemeKey; tone: ThemeColorCardToneKey},
  config?: ThemeConfig,
): ThemeColorButton_v2 {
  const {scheme, tone: cardTone} = options

  const modes: Partial<ThemeColorButton_v2> = {}

  for (const mode of THEME_COLOR_BUTTON_MODES) {
    modes[mode] = buildButtonTonesColorTheme({cardTone, scheme, mode}, config)
  }

  return modes as ThemeColorButton_v2
}

function buildButtonTonesColorTheme(
  options: {
    cardTone: ThemeColorCardToneKey
    scheme: ThemeColorSchemeKey
    mode: ThemeColorButtonModeKey
  },
  config?: ThemeConfig,
): ThemeColorButtonMode_v2 {
  const {cardTone, mode, scheme} = options

  const tones: Partial<ThemeColorButtonMode_v2> = {}

  for (const tone of THEME_COLOR_STATE_TONES) {
    tones[tone] = buildButtonStatesColorTheme({cardTone, mode, scheme, tone}, config)
  }

  return tones as ThemeColorButtonMode_v2
}

function buildButtonStatesColorTheme(
  options: {
    cardTone: ThemeColorCardToneKey
    mode: ThemeColorButtonModeKey
    scheme: ThemeColorSchemeKey
    tone: ThemeColorStateToneKey
  },
  config?: ThemeConfig,
): ThemeColorButtonTone_v2 {
  const {cardTone, mode, scheme, tone} = options

  const states: Partial<ThemeColorButtonTone_v2> = {}

  for (const state of THEME_COLOR_STATES) {
    states[state] = buildButtonStateColorTheme({cardTone, mode, tone, scheme, state}, config)
  }

  return states as ThemeColorButtonTone_v2
}

function buildButtonStateColorTheme(
  options: {
    cardTone: ThemeColorCardToneKey
    mode: ThemeColorButtonModeKey
    tone: ThemeColorStateToneKey
    scheme: ThemeColorSchemeKey
    state: ThemeColorStateKey
  },
  config?: ThemeConfig,
): ThemeColorState_v2 {
  const {cardTone, mode, tone, scheme, state} = options
  const cardTokens = config?.color?.base?.[cardTone]
  const tokens = config?.color?.button?.[mode]?.[tone]?.[state]
  const hue = tokens?._hue || cardTokens?._hue || 'gray'
  const blendMode = tokens?._blend || ['screen', 'multiply']
  const context: ColorTokenContext = {hue, scheme}

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    accent: {
      fg: _color(context, tokens?.accent?.fg),
    },
    avatar: buildAvatarColorTheme({scheme}, tokens),
    badge: buildBadgeColorTheme(tokens?.badge, {scheme}, config),
    bg: _color(context, tokens?.bg),
    border: _color(context, tokens?.border),
    code: {
      bg: _color(context, tokens?.code?.bg),
      fg: _color(context, tokens?.code?.fg),
    },
    fg: _color(context, tokens?.fg),
    icon: _color(context, tokens?.icon),
    muted: {
      bg: _color(context, tokens?.muted?.bg),
      fg: _color(context, tokens?.muted?.fg),
    },
    kbd: {
      bg: _color(context, tokens?.kbd?.bg),
      fg: _color(context, tokens?.kbd?.fg),
      border: _color(context, tokens?.kbd?.border),
    },
    link: {
      fg: _color(context, tokens?.link?.fg),
    },
    skeleton: {
      from: _color(context, tokens?.skeleton?.from),
      to: _color(context, tokens?.skeleton?.to),
    },
  }
}

function buildInputColorTheme(
  options: {scheme: ThemeColorSchemeKey; tone: ThemeColorCardToneKey},
  config?: ThemeConfig,
): ThemeColorInput_v2 {
  const {scheme, tone} = options

  return {
    default: buildInputStatesColorTheme({mode: 'default', scheme, tone}, config),
    invalid: buildInputStatesColorTheme({mode: 'invalid', scheme, tone}, config),
  }
}

function buildInputStatesColorTheme(
  options: {
    mode: 'default' | 'invalid'
    scheme: ThemeColorSchemeKey
    tone: ThemeColorCardToneKey
  },
  config?: ThemeConfig,
): ThemeColorInputMode_v2 {
  const {mode, scheme, tone} = options

  return {
    enabled: buildInputStateColorTheme({mode, scheme, state: 'enabled', cardTone: tone}, config),
    hovered: buildInputStateColorTheme({mode, scheme, state: 'hovered', cardTone: tone}, config),
    readOnly: buildInputStateColorTheme({mode, scheme, state: 'readOnly', cardTone: tone}, config),
    disabled: buildInputStateColorTheme({mode, scheme, state: 'disabled', cardTone: tone}, config),
  }
}

function buildInputStateColorTheme(
  options: {
    cardTone: ThemeColorCardToneKey
    mode: 'default' | 'invalid'
    scheme: ThemeColorSchemeKey
    state: 'enabled' | 'hovered' | 'readOnly' | 'disabled'
  },
  config?: ThemeConfig,
): ThemeColorInputState_v2 {
  const {cardTone, mode, scheme, state} = options
  const cardTokens = config?.color?.base?.[cardTone]
  const tokens = config?.color?.input?.[mode]?.[state]
  const hue = tokens?._hue || cardTokens?._hue || 'gray'
  const blendMode = tokens?._blend || ['screen', 'multiply']
  const context: ColorTokenContext = {hue, scheme}

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    bg: _color(context, tokens?.bg),
    border: _color(context, tokens?.border),
    fg: _color(context, tokens?.fg),
    muted: {
      bg: _color(context, tokens?.muted?.bg),
    },
    placeholder: _color(context, tokens?.placeholder),
  }
}

function buildSelectableColorTheme(
  options: {
    scheme: ThemeColorSchemeKey
    tone: ThemeColorCardToneKey
  },
  config?: ThemeConfig,
): ThemeColorButtonMode_v2 {
  const {scheme, tone: cardTone} = options

  const tones: Partial<ThemeColorButtonMode_v2> = {}

  for (const tone of THEME_COLOR_STATE_TONES) {
    tones[tone] = buildSelectableStatesColorTheme({cardTone, scheme, tone}, config)
  }

  return tones as ThemeColorButtonMode_v2
}

function buildSelectableStatesColorTheme(
  options: {
    cardTone: ThemeColorCardToneKey
    scheme: ThemeColorSchemeKey
    tone: ThemeColorStateToneKey
  },
  config?: ThemeConfig,
): ThemeColorButtonTone_v2 {
  const {cardTone, scheme, tone} = options

  const states: Partial<ThemeColorButtonTone_v2> = {}

  for (const state of THEME_COLOR_STATES) {
    states[state] = buildSelectableStateColorTheme({cardTone, tone, scheme, state}, config)
  }

  return states as ThemeColorButtonTone_v2
}

function buildSelectableStateColorTheme(
  options: {
    cardTone: ThemeColorCardToneKey
    scheme: ThemeColorSchemeKey
    state: ThemeColorStateKey
    tone: ThemeColorStateToneKey
  },
  config?: ThemeConfig,
): ThemeColorState_v2 {
  const {cardTone, scheme, state, tone} = options
  const cardTokens = config?.color?.base?.[cardTone]
  const tokens = config?.color?.selectable?.[tone]?.[state]

  const hue = tokens?._hue || cardTokens?._hue || 'gray'
  const blendMode = tokens?._blend || ['screen', 'multiply']
  const context: ColorTokenContext = {hue, scheme}

  return {
    _blend: blendMode[scheme === 'light' ? 0 : 1],
    accent: {
      fg: _color(context, tokens?.accent?.fg),
    },
    avatar: buildAvatarColorTheme({scheme}, tokens),
    badge: buildBadgeColorTheme(tokens?.badge, {scheme}, config),
    bg: _color(context, tokens?.bg),
    border: _color(context, tokens?.border),
    code: {
      bg: _color(context, tokens?.code?.bg),
      fg: _color(context, tokens?.code?.fg),
    },
    fg: _color(context, tokens?.fg),
    icon: _color(context, tokens?.icon),
    muted: {
      bg: _color(context, tokens?.muted?.bg),
      fg: _color(context, tokens?.muted?.fg),
    },
    kbd: {
      bg: _color(context, tokens?.kbd?.bg),
      fg: _color(context, tokens?.kbd?.fg),
      border: _color(context, tokens?.kbd?.border),
    },
    link: {
      fg: _color(context, tokens?.link?.fg),
    },
    skeleton: {
      from: _color(context, tokens?.skeleton?.from),
      to: _color(context, tokens?.skeleton?.to),
    },
  }
}

function buildSyntaxColorTheme(
  options: {scheme: ThemeColorSchemeKey},
  config?: ThemeConfig,
): ThemeColorSyntax {
  const {scheme} = options
  const tokens = config?.color?.syntax
  const context: ColorTokenContext = {hue: 'gray', scheme}

  return {
    atrule: _color(context, tokens?.atrule),
    attrName: _color(context, tokens?.attrName),
    attrValue: _color(context, tokens?.attrValue),
    attribute: _color(context, tokens?.attribute),
    boolean: _color(context, tokens?.boolean),
    builtin: _color(context, tokens?.builtin),
    cdata: _color(context, tokens?.cdata),
    char: _color(context, tokens?.char),
    class: _color(context, tokens?.class),
    className: _color(context, tokens?.className),
    comment: _color(context, tokens?.comment),
    constant: _color(context, tokens?.constant),
    deleted: _color(context, tokens?.deleted),
    doctype: _color(context, tokens?.doctype),
    entity: _color(context, tokens?.entity),
    function: _color(context, tokens?.function),
    hexcode: _color(context, tokens?.hexcode),
    id: _color(context, tokens?.id),
    important: _color(context, tokens?.important),
    inserted: _color(context, tokens?.inserted),
    keyword: _color(context, tokens?.keyword),
    number: _color(context, tokens?.number),
    operator: _color(context, tokens?.operator),
    prolog: _color(context, tokens?.prolog),
    property: _color(context, tokens?.property),
    pseudoClass: _color(context, tokens?.pseudoClass),
    pseudoElement: _color(context, tokens?.pseudoElement),
    punctuation: _color(context, tokens?.punctuation),
    regex: _color(context, tokens?.regex),
    selector: _color(context, tokens?.selector),
    string: _color(context, tokens?.string),
    symbol: _color(context, tokens?.symbol),
    tag: _color(context, tokens?.tag),
    unit: _color(context, tokens?.unit),
    url: _color(context, tokens?.url),
    variable: _color(context, tokens?.variable),
  }
}
