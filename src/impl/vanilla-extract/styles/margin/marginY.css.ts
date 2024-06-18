import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const marginY: StyleRule[] = [
  {marginTop: theme.vars.space[0], marginBottom: theme.vars.space[0]},
  {marginTop: theme.vars.space[1], marginBottom: theme.vars.space[1]},
  {marginTop: theme.vars.space[2], marginBottom: theme.vars.space[2]},
  {marginTop: theme.vars.space[3], marginBottom: theme.vars.space[3]},
  {marginTop: theme.vars.space[4], marginBottom: theme.vars.space[4]},
  {marginTop: theme.vars.space[5], marginBottom: theme.vars.space[5]},
  {marginTop: theme.vars.space[6], marginBottom: theme.vars.space[6]},
  {marginTop: theme.vars.space[7], marginBottom: theme.vars.space[7]},
  {marginTop: theme.vars.space[8], marginBottom: theme.vars.space[8]},
  {marginTop: theme.vars.space[9], marginBottom: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 as Space, marginY[0]),
  ...responsiveStyles(1 as Space, marginY[1]),
  ...responsiveStyles(2 as Space, marginY[2]),
  ...responsiveStyles(3 as Space, marginY[3]),
  ...responsiveStyles(4 as Space, marginY[4]),
  ...responsiveStyles(5 as Space, marginY[5]),
  ...responsiveStyles(6 as Space, marginY[6]),
  ...responsiveStyles(7 as Space, marginY[7]),
  ...responsiveStyles(8 as Space, marginY[8]),
  ...responsiveStyles(9 as Space, marginY[9]),
}
