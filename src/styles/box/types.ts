export type BoxSizing = 'content' | 'border'
export type BoxDisplay = 'none' | 'block' | 'grid' | 'flex' | 'inline-block'
export type BoxHeight = 'stretch' | 'fill'
export type BoxOverflow = 'visible' | 'hidden' | 'auto'

export interface ResponsiveBoxStyleProps {
  $display?: BoxDisplay | BoxDisplay[]
  $height?: BoxHeight | BoxHeight[]
  $overflow?: BoxOverflow | BoxOverflow[]
  $sizing?: BoxSizing | BoxSizing[]
}
