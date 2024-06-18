import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const paddingY: StyleRule[] = [
  {paddingTop: theme.vars.space[0], paddingBottom: theme.vars.space[0]},
  {paddingTop: theme.vars.space[1], paddingBottom: theme.vars.space[1]},
  {paddingTop: theme.vars.space[2], paddingBottom: theme.vars.space[2]},
  {paddingTop: theme.vars.space[3], paddingBottom: theme.vars.space[3]},
  {paddingTop: theme.vars.space[4], paddingBottom: theme.vars.space[4]},
  {paddingTop: theme.vars.space[5], paddingBottom: theme.vars.space[5]},
  {paddingTop: theme.vars.space[6], paddingBottom: theme.vars.space[6]},
  {paddingTop: theme.vars.space[7], paddingBottom: theme.vars.space[7]},
  {paddingTop: theme.vars.space[8], paddingBottom: theme.vars.space[8]},
  {paddingTop: theme.vars.space[9], paddingBottom: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 satisfies Space, paddingY[0]),
  ...responsiveStyles(1 satisfies Space, paddingY[1]),
  ...responsiveStyles(2 satisfies Space, paddingY[2]),
  ...responsiveStyles(3 satisfies Space, paddingY[3]),
  ...responsiveStyles(4 satisfies Space, paddingY[4]),
  ...responsiveStyles(5 satisfies Space, paddingY[5]),
  ...responsiveStyles(6 satisfies Space, paddingY[6]),
  ...responsiveStyles(7 satisfies Space, paddingY[7]),
  ...responsiveStyles(8 satisfies Space, paddingY[8]),
  ...responsiveStyles(9 satisfies Space, paddingY[9]),
}
