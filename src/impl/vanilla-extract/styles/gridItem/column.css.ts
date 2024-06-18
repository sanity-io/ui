import {responsiveStyles} from '../responsiveStyles'

export const styles = {
  ...responsiveStyles('auto' as const, {gridColumn: 'auto'}),
  ...responsiveStyles('full' as const, {gridColumn: '1 / -1'}),

  // todo: number
  ...responsiveStyles('1' as const, {gridColumn: 'span 1 / span 1'}),
  ...responsiveStyles('2' as const, {gridColumn: 'span 2 / span 2'}),
  ...responsiveStyles('3' as const, {gridColumn: 'span 3 / span 3'}),
}
