import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const marginRight: StyleRule[] = [
  {marginRight: theme.vars.space[0]},
  {marginRight: theme.vars.space[1]},
  {marginRight: theme.vars.space[2]},
  {marginRight: theme.vars.space[3]},
  {marginRight: theme.vars.space[4]},
  {marginRight: theme.vars.space[5]},
  {marginRight: theme.vars.space[6]},
  {marginRight: theme.vars.space[7]},
  {marginRight: theme.vars.space[8]},
  {marginRight: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 as Space, marginRight[0]),
  ...responsiveStyles(1 as Space, marginRight[1]),
  ...responsiveStyles(2 as Space, marginRight[2]),
  ...responsiveStyles(3 as Space, marginRight[3]),
  ...responsiveStyles(4 as Space, marginRight[4]),
  ...responsiveStyles(5 as Space, marginRight[5]),
  ...responsiveStyles(6 as Space, marginRight[6]),
  ...responsiveStyles(7 as Space, marginRight[7]),
  ...responsiveStyles(8 as Space, marginRight[8]),
  ...responsiveStyles(9 as Space, marginRight[9]),
}
