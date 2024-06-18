import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const marginBottom: StyleRule[] = [
  {marginBottom: theme.vars.space[0]},
  {marginBottom: theme.vars.space[1]},
  {marginBottom: theme.vars.space[2]},
  {marginBottom: theme.vars.space[3]},
  {marginBottom: theme.vars.space[4]},
  {marginBottom: theme.vars.space[5]},
  {marginBottom: theme.vars.space[6]},
  {marginBottom: theme.vars.space[7]},
  {marginBottom: theme.vars.space[8]},
  {marginBottom: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 as Space, marginBottom[0]),
  ...responsiveStyles(1 as Space, marginBottom[1]),
  ...responsiveStyles(2 as Space, marginBottom[2]),
  ...responsiveStyles(3 as Space, marginBottom[3]),
  ...responsiveStyles(4 as Space, marginBottom[4]),
  ...responsiveStyles(5 as Space, marginBottom[5]),
  ...responsiveStyles(6 as Space, marginBottom[6]),
  ...responsiveStyles(7 as Space, marginBottom[7]),
  ...responsiveStyles(8 as Space, marginBottom[8]),
  ...responsiveStyles(9 as Space, marginBottom[9]),
}
