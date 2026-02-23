export interface SanityFigmaColor {
  type: 'color'
  r: number
  g: number
  b: number
  a?: number
}

export interface SanityFigmaColorAlias {
  type: 'color-alias'
  target: string
}
