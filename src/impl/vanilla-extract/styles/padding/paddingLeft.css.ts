import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const paddingLeft: StyleRule[] = [
  {paddingLeft: theme.vars.space[0]},
  {paddingLeft: theme.vars.space[1]},
  {paddingLeft: theme.vars.space[2]},
  {paddingLeft: theme.vars.space[3]},
  {paddingLeft: theme.vars.space[4]},
  {paddingLeft: theme.vars.space[5]},
  {paddingLeft: theme.vars.space[6]},
  {paddingLeft: theme.vars.space[7]},
  {paddingLeft: theme.vars.space[8]},
  {paddingLeft: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 satisfies Space, paddingLeft[0]),
  ...responsiveStyles(1 satisfies Space, paddingLeft[1]),
  ...responsiveStyles(2 satisfies Space, paddingLeft[2]),
  ...responsiveStyles(3 satisfies Space, paddingLeft[3]),
  ...responsiveStyles(4 satisfies Space, paddingLeft[4]),
  ...responsiveStyles(5 satisfies Space, paddingLeft[5]),
  ...responsiveStyles(6 satisfies Space, paddingLeft[6]),
  ...responsiveStyles(7 satisfies Space, paddingLeft[7]),
  ...responsiveStyles(8 satisfies Space, paddingLeft[8]),
  ...responsiveStyles(9 satisfies Space, paddingLeft[9]),
}
