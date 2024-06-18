import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const marginTop: StyleRule[] = [
  {marginTop: theme.vars.space[0]},
  {marginTop: theme.vars.space[1]},
  {marginTop: theme.vars.space[2]},
  {marginTop: theme.vars.space[3]},
  {marginTop: theme.vars.space[4]},
  {marginTop: theme.vars.space[5]},
  {marginTop: theme.vars.space[6]},
  {marginTop: theme.vars.space[7]},
  {marginTop: theme.vars.space[8]},
  {marginTop: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 as Space, marginTop[0]),
  ...responsiveStyles(1 as Space, marginTop[1]),
  ...responsiveStyles(2 as Space, marginTop[2]),
  ...responsiveStyles(3 as Space, marginTop[3]),
  ...responsiveStyles(4 as Space, marginTop[4]),
  ...responsiveStyles(5 as Space, marginTop[5]),
  ...responsiveStyles(6 as Space, marginTop[6]),
  ...responsiveStyles(7 as Space, marginTop[7]),
  ...responsiveStyles(8 as Space, marginTop[8]),
  ...responsiveStyles(9 as Space, marginTop[9]),
}
