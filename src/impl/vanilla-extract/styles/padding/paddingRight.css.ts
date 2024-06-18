import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const paddingRight: StyleRule[] = [
  {paddingRight: theme.vars.space[0]},
  {paddingRight: theme.vars.space[1]},
  {paddingRight: theme.vars.space[2]},
  {paddingRight: theme.vars.space[3]},
  {paddingRight: theme.vars.space[4]},
  {paddingRight: theme.vars.space[5]},
  {paddingRight: theme.vars.space[6]},
  {paddingRight: theme.vars.space[7]},
  {paddingRight: theme.vars.space[8]},
  {paddingRight: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 satisfies Space, paddingRight[0]),
  ...responsiveStyles(1 satisfies Space, paddingRight[1]),
  ...responsiveStyles(2 satisfies Space, paddingRight[2]),
  ...responsiveStyles(3 satisfies Space, paddingRight[3]),
  ...responsiveStyles(4 satisfies Space, paddingRight[4]),
  ...responsiveStyles(5 satisfies Space, paddingRight[5]),
  ...responsiveStyles(6 satisfies Space, paddingRight[6]),
  ...responsiveStyles(7 satisfies Space, paddingRight[7]),
  ...responsiveStyles(8 satisfies Space, paddingRight[8]),
  ...responsiveStyles(9 satisfies Space, paddingRight[9]),
}
