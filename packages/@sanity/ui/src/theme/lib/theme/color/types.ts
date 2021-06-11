import {ThemeColorSyntax} from './syntax'

/**
 * @public
 */
export type ThemeColorSchemeKey = 'dark' | 'light'

/**
 * @public
 */
export type ThemeColorName =
  | 'default'
  | 'transparent'
  | 'primary'
  | 'positive'
  | 'caution'
  | 'critical'

/**
 * @public
 */
export type ThemeColorButtonModeKey = 'default' | 'ghost' | 'bleed'

/**
 * @public
 */
export type ThemeColorToneKey =
  | 'default'
  | 'transparent'
  | 'primary'
  | 'positive'
  | 'caution'
  | 'critical'

/**
 * @public
 */
export type ThemeColorSpotKey =
  | 'gray'
  | 'blue'
  | 'purple'
  | 'magenta'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'

/**
 * @public
 */
export interface ThemeColorButtonState {
  bg: string
  fg: string
  border: string
}

/**
 * @public
 */
export interface ThemeColorButtonStates {
  enabled: ThemeColorButtonState
  hovered: ThemeColorButtonState
  pressed: ThemeColorButtonState
  selected: ThemeColorButtonState
  disabled: ThemeColorButtonState
}

/**
 * @public
 */
export interface ThemeColorCardState {
  bg: string
  fg: string
  border: string
  muted: {
    fg: string
  }
  accent: {
    fg: string
  }
  link: {
    fg: string
  }
  code: {
    bg: string
    fg: string
  }
  skeleton: {
    from: string
    to: string
  }
}

/**
 * @public
 */
export interface ThemeColorCard {
  enabled: ThemeColorCardState
  hovered: ThemeColorCardState
  pressed: ThemeColorCardState
  selected: ThemeColorCardState
  disabled: ThemeColorCardState
}

/**
 * @public
 */
export interface ThemeColorBase {
  bg: string
  fg: string
  border: string
  focusRing: string
  shadow: {
    outline: string
    umbra: string
    penumbra: string
    ambient: string
  }
  skeleton: {
    from: string
    to: string
  }
}

/**
 * @public
 */
export interface ThemeColorGenericState {
  bg: string
  border: string
  fg: string
}

/**
 * @public
 */
export interface ThemeColorSolidTone {
  enabled: ThemeColorGenericState
  disabled: ThemeColorGenericState
  hovered: ThemeColorGenericState
  pressed: ThemeColorGenericState
  selected: ThemeColorGenericState
}

/**
 * @public
 */
export interface ThemeColorSolid {
  default: ThemeColorSolidTone
  transparent: ThemeColorSolidTone
  primary: ThemeColorSolidTone
  positive: ThemeColorSolidTone
  caution: ThemeColorSolidTone
  critical: ThemeColorSolidTone
}

/**
 * @public
 */
export interface ThemeColorMutedTone {
  enabled: ThemeColorGenericState
  disabled: ThemeColorGenericState
  hovered: ThemeColorGenericState
  pressed: ThemeColorGenericState
  selected: ThemeColorGenericState
}

/**
 * @public
 */
export interface ThemeColorMuted {
  default: ThemeColorMutedTone
  transparent: ThemeColorMutedTone
  primary: ThemeColorMutedTone
  positive: ThemeColorMutedTone
  caution: ThemeColorMutedTone
  critical: ThemeColorMutedTone
}

/**
 * @public
 */
export interface ThemeColorButtonTones {
  default: ThemeColorButtonStates
  primary: ThemeColorButtonStates
  positive: ThemeColorButtonStates
  caution: ThemeColorButtonStates
  critical: ThemeColorButtonStates
}

/**
 * @public
 */
export interface ThemeColorButton {
  default: ThemeColorButtonTones
  ghost: ThemeColorButtonTones
  bleed: ThemeColorButtonTones
}

/**
 * @public
 */
export interface ThemeColorInputState {
  bg: string
  fg: string
  border: string
  placeholder: string
}

/**
 * @public
 */
export interface ThemeColorInputStates {
  enabled: ThemeColorInputState
  disabled: ThemeColorInputState
  hovered: ThemeColorInputState
  readOnly: ThemeColorInputState
}

/**
 * @public
 */
export interface ThemeColorInput {
  default: ThemeColorInputStates
  invalid: ThemeColorInputStates
}

/**
 * @public
 */
export interface ThemeColorSpot {
  gray: string
  blue: string
  purple: string
  magenta: string
  red: string
  orange: string
  yellow: string
  green: string
  cyan: string
}

/**
 * @public
 */
export interface ThemeColor {
  dark: boolean
  base: ThemeColorBase
  button: ThemeColorButton
  card: ThemeColorCard
  input: ThemeColorInput
  spot: ThemeColorSpot
  syntax: ThemeColorSyntax
  solid: ThemeColorSolid
  muted: ThemeColorMuted
}

/**
 * @public
 */
export interface ThemeColorScheme {
  default: ThemeColor
  transparent: ThemeColor
  primary: ThemeColor
  positive: ThemeColor
  caution: ThemeColor
  critical: ThemeColor
}

/**
 * @public
 */
export interface ThemeColorSchemes {
  dark: ThemeColorScheme
  light: ThemeColorScheme
}

/**
 * @public
 */
export interface ThemeColorBuilderOpts {
  base: (opts: {dark: boolean; name: ThemeColorName}) => ThemeColorBase
  solid: (opts: {
    base: ThemeColorBase
    dark: boolean
    tone: ThemeColorToneKey
    name: ThemeColorName
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorGenericState
  muted: (opts: {
    base: ThemeColorBase
    dark: boolean
    tone: ThemeColorToneKey
    name: ThemeColorName
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorGenericState
  card: (opts: {
    base: ThemeColorBase
    dark: boolean
    muted: ThemeColorMutedTone
    name: ThemeColorName
    solid: ThemeColorSolidTone
    state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected'
  }) => ThemeColorCardState
  button: (opts: {
    dark: boolean
    mode: ThemeColorButtonModeKey
    base: ThemeColorBase
    solid: ThemeColorSolidTone
    muted: ThemeColorMutedTone
  }) => ThemeColorButtonStates
  input: (opts: {
    base: ThemeColorBase
    solid: ThemeColorSolidTone
    muted: ThemeColorMutedTone
    dark: boolean
    mode: 'default' | 'invalid'
    state: 'enabled' | 'disabled' | 'hovered' | 'readOnly'
  }) => ThemeColorInputState
  syntax: (opts: {base: ThemeColorBase; dark: boolean}) => ThemeColorSyntax
  spot: (opts: {base: ThemeColorBase; dark: boolean; key: ThemeColorSpotKey}) => string
}
