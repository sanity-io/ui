import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const paddingX: StyleRule[] = [
  {paddingLeft: theme.vars.space[0], paddingRight: theme.vars.space[0]},
  {paddingLeft: theme.vars.space[1], paddingRight: theme.vars.space[1]},
  {paddingLeft: theme.vars.space[2], paddingRight: theme.vars.space[2]},
  {paddingLeft: theme.vars.space[3], paddingRight: theme.vars.space[3]},
  {paddingLeft: theme.vars.space[4], paddingRight: theme.vars.space[4]},
  {paddingLeft: theme.vars.space[5], paddingRight: theme.vars.space[5]},
  {paddingLeft: theme.vars.space[6], paddingRight: theme.vars.space[6]},
  {paddingLeft: theme.vars.space[7], paddingRight: theme.vars.space[7]},
  {paddingLeft: theme.vars.space[8], paddingRight: theme.vars.space[8]},
  {paddingLeft: theme.vars.space[9], paddingRight: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 satisfies Space, paddingX[0]),
  ...responsiveStyles(1 satisfies Space, paddingX[1]),
  ...responsiveStyles(2 satisfies Space, paddingX[2]),
  ...responsiveStyles(3 satisfies Space, paddingX[3]),
  ...responsiveStyles(4 satisfies Space, paddingX[4]),
  ...responsiveStyles(5 satisfies Space, paddingX[5]),
  ...responsiveStyles(6 satisfies Space, paddingX[6]),
  ...responsiveStyles(7 satisfies Space, paddingX[7]),
  ...responsiveStyles(8 satisfies Space, paddingX[8]),
  ...responsiveStyles(9 satisfies Space, paddingX[9]),
}
