export type BoxSizing = 'content' | 'border'

export type BoxDisplay = 'none' | 'block'

export interface BoxStyleProps {
  display?: BoxDisplay | BoxDisplay[]
  height?: 'stretch' | 'fill'
  overflow?: 'visible' | 'hidden' | 'auto'
  sizing?: BoxSizing
}
