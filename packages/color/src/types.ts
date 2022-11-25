/** @internal */
export type RGB = [number, number, number]

/** @internal */
export type HSL = [number, number, number]

/** @internal */
export interface ColorTintConfig {
  title: string
  hsl: HSL
}

/** @internal */
export interface ColorHueConfig {
  title: string
  tints: {
    [key in ColorTintKey]: ColorTintConfig
  }
}

/** @internal */
export interface ColorConfig {
  black: ColorTintConfig
  white: ColorTintConfig

  gray: ColorHueConfig
  blue: ColorHueConfig
  purple: ColorHueConfig
  magenta: ColorHueConfig
  red: ColorHueConfig
  orange: ColorHueConfig
  yellow: ColorHueConfig
  green: ColorHueConfig
  cyan: ColorHueConfig
}

/** @public */
export interface ColorTint {
  hex: string
  title: string
}

/** @public */
export type ColorTintKey =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950'

/** @public */
export type ColorTints = {
  [key in ColorTintKey]: ColorTint
}

/** @public */
export type ColorHueKey =
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'magenta'

/** @public */
export type ColorHues = {
  [key in ColorHueKey]: ColorTints
}

/** @public */
export interface Color extends ColorHues {
  black: ColorTint
  white: ColorTint
}
