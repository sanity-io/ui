import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {JustifyContent} from './types'

export const options: ResponsiveRuleOptions<JustifyContent> = {
  'flex-start': _responsiveStyle(layers.props, {
    justifyContent: 'flex-start',
  }),
  'flex-end': _responsiveStyle(layers.props, {
    justifyContent: 'flex-end',
  }),
  'center': _responsiveStyle(layers.props, {
    justifyContent: 'center',
  }),
  'space-between': _responsiveStyle(layers.props, {
    justifyContent: 'space-between',
  }),
  'space-around': _responsiveStyle(layers.props, {
    justifyContent: 'space-around',
  }),
  'space-evenly': _responsiveStyle(layers.props, {
    justifyContent: 'space-evenly',
  }),
}
