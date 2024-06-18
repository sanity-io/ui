import {responsiveStyles} from '../responsiveStyles'

export const styles = {
  ...responsiveStyles('none' as const, {flex: 'none'}),
  ...responsiveStyles('auto' as const, {flex: 'auto'}),
  ...responsiveStyles('initial' as const, {flex: 'initial'}),

  // todo: number
  ...responsiveStyles('1' as const, {flex: '1'}),
  ...responsiveStyles('2' as const, {flex: '2'}),
  ...responsiveStyles('3' as const, {flex: '3'}),
}
