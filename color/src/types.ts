export interface ColorHueConfig {
  darkest: string
  mid: string
  lightest: string
  midPoint: number
  title: string
}

export interface ColorValue {
  hex: string
  title: string
}

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

export type ColorTints = {
  [key in ColorTintKey]: ColorValue
}

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

export interface ColorPalette {
  black: ColorValue
  white: ColorValue

  gray: ColorTints
  red: ColorTints
  orange: ColorTints
  yellow: ColorTints
  green: ColorTints
  cyan: ColorTints
  blue: ColorTints
  purple: ColorTints
  magenta: ColorTints
}
