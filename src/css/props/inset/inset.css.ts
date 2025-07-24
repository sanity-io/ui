import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {Inset} from './types'

export const insetOptions: ResponsiveRuleOptions<Inset> = {
  0: _responsiveStyle(layers.props, {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
}

export const insetTopOptions: ResponsiveRuleOptions<Inset> = {
  0: _responsiveStyle(layers.props, {
    top: 0,
  }),
}

export const insetRightOptions: ResponsiveRuleOptions<Inset> = {
  0: _responsiveStyle(layers.props, {
    right: 0,
  }),
}

export const insetBottomOptions: ResponsiveRuleOptions<Inset> = {
  0: _responsiveStyle(layers.props, {
    bottom: 0,
  }),
}

export const insetLeftOptions: ResponsiveRuleOptions<Inset> = {
  0: _responsiveStyle(layers.props, {
    left: 0,
  }),
}
