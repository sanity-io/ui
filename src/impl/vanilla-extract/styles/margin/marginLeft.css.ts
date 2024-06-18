import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const marginLeft: StyleRule[] = [
  {marginLeft: theme.vars.space[0]},
  {marginLeft: theme.vars.space[1]},
  {marginLeft: theme.vars.space[2]},
  {marginLeft: theme.vars.space[3]},
  {marginLeft: theme.vars.space[4]},
  {marginLeft: theme.vars.space[5]},
  {marginLeft: theme.vars.space[6]},
  {marginLeft: theme.vars.space[7]},
  {marginLeft: theme.vars.space[8]},
  {marginLeft: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 as Space, marginLeft[0]),
  ...responsiveStyles(1 as Space, marginLeft[1]),
  ...responsiveStyles(2 as Space, marginLeft[2]),
  ...responsiveStyles(3 as Space, marginLeft[3]),
  ...responsiveStyles(4 as Space, marginLeft[4]),
  ...responsiveStyles(5 as Space, marginLeft[5]),
  ...responsiveStyles(6 as Space, marginLeft[6]),
  ...responsiveStyles(7 as Space, marginLeft[7]),
  ...responsiveStyles(8 as Space, marginLeft[8]),
  ...responsiveStyles(9 as Space, marginLeft[9]),
}
