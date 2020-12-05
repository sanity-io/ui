export type ThemeFontKey = 'code' | 'heading' | 'label' | 'text'
export type ThemeFontWeightKey = 'regular' | 'medium' | 'semibold' | 'bold'

export interface ThemeFontSize {
  ascenderHeight: number
  descenderHeight: number
  fontSize: number
  iconSize: number
  letterSpacing: number
  lineHeight: number
}

export interface ThemeFontWeight {
  regular: number
  medium: number
  semibold: number
  bold: number
}

export interface ThemeFont {
  family: string
  weights: ThemeFontWeight
  sizes: ThemeFontSize[]
}

export interface ThemeFonts {
  code: ThemeFont
  heading: ThemeFont
  label: ThemeFont
  text: ThemeFont
}
