import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const marginX: StyleRule[] = [
  {marginLeft: theme.vars.space[0], marginRight: theme.vars.space[0]},
  {marginLeft: theme.vars.space[1], marginRight: theme.vars.space[1]},
  {marginLeft: theme.vars.space[2], marginRight: theme.vars.space[2]},
  {marginLeft: theme.vars.space[3], marginRight: theme.vars.space[3]},
  {marginLeft: theme.vars.space[4], marginRight: theme.vars.space[4]},
  {marginLeft: theme.vars.space[5], marginRight: theme.vars.space[5]},
  {marginLeft: theme.vars.space[6], marginRight: theme.vars.space[6]},
  {marginLeft: theme.vars.space[7], marginRight: theme.vars.space[7]},
  {marginLeft: theme.vars.space[8], marginRight: theme.vars.space[8]},
  {marginLeft: theme.vars.space[9], marginRight: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 as Space, marginX[0]),
  ...responsiveStyles(1 as Space, marginX[1]),
  ...responsiveStyles(2 as Space, marginX[2]),
  ...responsiveStyles(3 as Space, marginX[3]),
  ...responsiveStyles(4 as Space, marginX[4]),
  ...responsiveStyles(5 as Space, marginX[5]),
  ...responsiveStyles(6 as Space, marginX[6]),
  ...responsiveStyles(7 as Space, marginX[7]),
  ...responsiveStyles(8 as Space, marginX[8]),
  ...responsiveStyles(9 as Space, marginX[9]),
}
