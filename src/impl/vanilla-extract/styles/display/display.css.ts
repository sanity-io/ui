import {responsiveStyles} from '../responsiveStyles'

export const styles = {
  ...responsiveStyles('none' as const, {display: 'none'}),
  ...responsiveStyles('block' as const, {display: 'block'}),
  ...responsiveStyles('grid' as const, {display: 'grid'}),
  ...responsiveStyles('flex' as const, {display: 'flex'}),
  ...responsiveStyles('inline-block' as const, {display: 'inline-block'}),
}
