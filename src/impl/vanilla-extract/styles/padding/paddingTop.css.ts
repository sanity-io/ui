import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const paddingTop: StyleRule[] = [
  {paddingTop: theme.vars.space[0]},
  {paddingTop: theme.vars.space[1]},
  {paddingTop: theme.vars.space[2]},
  {paddingTop: theme.vars.space[3]},
  {paddingTop: theme.vars.space[4]},
  {paddingTop: theme.vars.space[5]},
  {paddingTop: theme.vars.space[6]},
  {paddingTop: theme.vars.space[7]},
  {paddingTop: theme.vars.space[8]},
  {paddingTop: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 satisfies Space, paddingTop[0]),
  ...responsiveStyles(1 satisfies Space, paddingTop[1]),
  ...responsiveStyles(2 satisfies Space, paddingTop[2]),
  ...responsiveStyles(3 satisfies Space, paddingTop[3]),
  ...responsiveStyles(4 satisfies Space, paddingTop[4]),
  ...responsiveStyles(5 satisfies Space, paddingTop[5]),
  ...responsiveStyles(6 satisfies Space, paddingTop[6]),
  ...responsiveStyles(7 satisfies Space, paddingTop[7]),
  ...responsiveStyles(8 satisfies Space, paddingTop[8]),
  ...responsiveStyles(9 satisfies Space, paddingTop[9]),
}
