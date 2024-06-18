import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const padding: StyleRule[] = [
  {padding: theme.vars.space[0]},
  {padding: theme.vars.space[1]},
  {padding: theme.vars.space[2]},
  {padding: theme.vars.space[3]},
  {padding: theme.vars.space[4]},
  {padding: theme.vars.space[5]},
  {padding: theme.vars.space[6]},
  {padding: theme.vars.space[7]},
  {padding: theme.vars.space[8]},
  {padding: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 satisfies Space, padding[0]),
  ...responsiveStyles(1 satisfies Space, padding[1]),
  ...responsiveStyles(2 satisfies Space, padding[2]),
  ...responsiveStyles(3 satisfies Space, padding[3]),
  ...responsiveStyles(4 satisfies Space, padding[4]),
  ...responsiveStyles(5 satisfies Space, padding[5]),
  ...responsiveStyles(6 satisfies Space, padding[6]),
  ...responsiveStyles(7 satisfies Space, padding[7]),
  ...responsiveStyles(8 satisfies Space, padding[8]),
  ...responsiveStyles(9 satisfies Space, padding[9]),
}
