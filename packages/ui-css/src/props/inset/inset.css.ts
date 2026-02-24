import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {Inset} from './types'

export const insetOptions: ResponsiveRuleOptions<Inset> = {
  0: _responsiveStyle(_layers.prop, {top: 0, right: 0, bottom: 0, left: 0}, 'inset'),
}

export const insetTopOptions: ResponsiveRuleOptions<Inset> = {
  0: _responsiveStyle(_layers.prop, {top: 0}, 'top'),
}

export const insetRightOptions: ResponsiveRuleOptions<Inset> = {
  0: _responsiveStyle(_layers.prop, {right: 0}, 'right'),
}

export const insetBottomOptions: ResponsiveRuleOptions<Inset> = {
  0: _responsiveStyle(_layers.prop, {bottom: 0}, 'bottom'),
}

export const insetLeftOptions: ResponsiveRuleOptions<Inset> = {
  0: _responsiveStyle(_layers.prop, {left: 0}, 'left'),
}
