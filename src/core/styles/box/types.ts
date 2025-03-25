import { BoxDisplay, BoxHeight, BoxOverflow, BoxSizing } from '../../types/box'

/**
 * @internal
 */
export interface ResponsiveBoxStyleProps {
  $display: BoxDisplay[]
  $height: BoxHeight[]
  $overflow: BoxOverflow[]
  $sizing: BoxSizing[]
}
