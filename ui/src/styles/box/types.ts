export type BoxSizing = 'content' | 'border'

export interface BoxStyleProps {
  height?: 'stretch' | 'fill'
  overflow?: 'visible' | 'hidden' | 'auto'
  sizing?: BoxSizing
}
