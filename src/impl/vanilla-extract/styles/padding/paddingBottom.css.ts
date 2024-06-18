import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const paddingBottom: StyleRule[] = [
  {paddingBottom: theme.vars.space[0]},
  {paddingBottom: theme.vars.space[1]},
  {paddingBottom: theme.vars.space[2]},
  {paddingBottom: theme.vars.space[3]},
  {paddingBottom: theme.vars.space[4]},
  {paddingBottom: theme.vars.space[5]},
  {paddingBottom: theme.vars.space[6]},
  {paddingBottom: theme.vars.space[7]},
  {paddingBottom: theme.vars.space[8]},
  {paddingBottom: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 satisfies Space, paddingBottom[0]),
  ...responsiveStyles(1 satisfies Space, paddingBottom[1]),
  ...responsiveStyles(2 satisfies Space, paddingBottom[2]),
  ...responsiveStyles(3 satisfies Space, paddingBottom[3]),
  ...responsiveStyles(4 satisfies Space, paddingBottom[4]),
  ...responsiveStyles(5 satisfies Space, paddingBottom[5]),
  ...responsiveStyles(6 satisfies Space, paddingBottom[6]),
  ...responsiveStyles(7 satisfies Space, paddingBottom[7]),
  ...responsiveStyles(8 satisfies Space, paddingBottom[8]),
  ...responsiveStyles(9 satisfies Space, paddingBottom[9]),
}
