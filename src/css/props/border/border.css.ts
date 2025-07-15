import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import {vars} from '../../vars.css'
import type {BorderStyle} from './types'

export const borderOptions: ResponsiveRuleOptions<BorderStyle> = {
  solid: _responsiveStyle(layers.props, {
    border: `${vars.card.border.width} solid ${vars.color.border}`,
  }),
  muted: _responsiveStyle(layers.props, {
    border: `${vars.card.border.width} solid ${vars.color.muted.border}`,
  }),
  none: _responsiveStyle(layers.props, {
    border: 'none',
  }),
}

export const borderTopOptions: ResponsiveRuleOptions<BorderStyle> = {
  solid: _responsiveStyle(layers.props, {
    borderTop: `${vars.card.border.width} solid ${vars.color.border}`,
  }),
  muted: _responsiveStyle(layers.props, {
    borderTop: `${vars.card.border.width} solid ${vars.color.muted.border}`,
  }),
  none: _responsiveStyle(layers.props, {
    borderTop: 'none',
  }),
}

export const borderRightOptions: ResponsiveRuleOptions<BorderStyle> = {
  solid: _responsiveStyle(layers.props, {
    borderRight: `${vars.card.border.width} solid ${vars.color.border}`,
  }),
  muted: _responsiveStyle(layers.props, {
    borderRight: `${vars.card.border.width} solid ${vars.color.muted.border}`,
  }),
  none: _responsiveStyle(layers.props, {
    borderRight: 'none',
  }),
}

export const borderBottomOptions: ResponsiveRuleOptions<BorderStyle> = {
  solid: _responsiveStyle(layers.props, {
    borderBottom: `${vars.card.border.width} solid ${vars.color.border}`,
  }),
  muted: _responsiveStyle(layers.props, {
    borderBottom: `${vars.card.border.width} solid ${vars.color.muted.border}`,
  }),
  none: _responsiveStyle(layers.props, {
    borderBottom: 'none',
  }),
}

export const borderLeftOptions: ResponsiveRuleOptions<BorderStyle> = {
  solid: _responsiveStyle(layers.props, {
    borderLeft: `${vars.card.border.width} solid ${vars.color.border}`,
  }),
  muted: _responsiveStyle(layers.props, {
    borderLeft: `${vars.card.border.width} solid ${vars.color.muted.border}`,
  }),
  none: _responsiveStyle(layers.props, {
    borderLeft: 'none',
  }),
}
