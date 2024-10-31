import {responsiveRules} from '../../responsiveRules'
import {type Rules} from '../../types'

export const flexRules: Rules = {
  // direction
  ...responsiveRules('row', {flexDirection: 'row'}),
  ...responsiveRules('column', {flexDirection: 'column'}),

  // align
  ...responsiveRules('align-flex-start', {alignItems: 'flex-start'}),
  ...responsiveRules('align-flex-end', {alignItems: 'end'}),
  ...responsiveRules('align-center', {alignItems: 'center'}),
  ...responsiveRules('align-stretch', {alignItems: 'stretch'}),
  ...responsiveRules('align-baseline', {alignItems: 'baseline'}),

  // justify
  ...responsiveRules('justify-flex-start', {justifyContent: 'flex-start'}),
  ...responsiveRules('justify-flex-end', {justifyContent: 'flex-end'}),
  ...responsiveRules('justify-center', {justifyContent: 'center'}),
  ...responsiveRules('justify-between', {justifyContent: 'space-between'}),
  ...responsiveRules('justify-around', {justifyContent: 'space-around'}),
  ...responsiveRules('justify-evenly', {justifyContent: 'space-evenly'}),

  // wrap
  ...responsiveRules('wrap-nowrap', {flexWrap: 'nowrap'}),
  ...responsiveRules('wrap-wrap', {flexWrap: 'wrap'}),
  ...responsiveRules('wrap-reverse', {flexWrap: 'wrap-reverse'}),
}
