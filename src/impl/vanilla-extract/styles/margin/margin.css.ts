import {StyleRule} from '@vanilla-extract/css'
import {theme} from '../../theme.css'
import {Space} from '../../types'
import {responsiveStyles} from '../responsiveStyles'

const margin: StyleRule[] = [
  {margin: theme.vars.space[0]},
  {margin: theme.vars.space[1]},
  {margin: theme.vars.space[2]},
  {margin: theme.vars.space[3]},
  {margin: theme.vars.space[4]},
  {margin: theme.vars.space[5]},
  {margin: theme.vars.space[6]},
  {margin: theme.vars.space[7]},
  {margin: theme.vars.space[8]},
  {margin: theme.vars.space[9]},
]

export const styles = {
  ...responsiveStyles(0 as Space, margin[0]),
  ...responsiveStyles(1 as Space, margin[1]),
  ...responsiveStyles(2 as Space, margin[2]),
  ...responsiveStyles(3 as Space, margin[3]),
  ...responsiveStyles(4 as Space, margin[4]),
  ...responsiveStyles(5 as Space, margin[5]),
  ...responsiveStyles(6 as Space, margin[6]),
  ...responsiveStyles(7 as Space, margin[7]),
  ...responsiveStyles(8 as Space, margin[8]),
  ...responsiveStyles(9 as Space, margin[9]),
}
