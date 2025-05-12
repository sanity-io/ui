import {_responsiveRule} from '../../_responsiveRule'
import type {Style, StyleRules} from '../../types'
import {vars} from '../../vars'

const util: StyleRules = {}

_responsiveRule(util, 'shadow-0', {boxShadow: 'none'})
_responsiveRule(util, 'shadow-1', {
  boxShadow: [
    `var(--shadow-outline) ${vars.color.shadow.outline}`,
    `var(--shadow-1-umbra) ${vars.color.shadow.umbra}`,
    `var(--shadow-1-penumbra) ${vars.color.shadow.penumbra}`,
    `var(--shadow-1-ambient) ${vars.color.shadow.ambient}`,
  ].join(', '),
})
_responsiveRule(util, 'shadow-2', {
  boxShadow: [
    `var(--shadow-outline) ${vars.color.shadow.outline}`,
    `var(--shadow-2-umbra) ${vars.color.shadow.umbra}`,
    `var(--shadow-2-penumbra) ${vars.color.shadow.penumbra}`,
    `var(--shadow-2-ambient) ${vars.color.shadow.ambient}`,
  ].join(', '),
})
_responsiveRule(util, 'shadow-3', {
  boxShadow: [
    `var(--shadow-outline) ${vars.color.shadow.outline}`,
    `var(--shadow-3-umbra) ${vars.color.shadow.umbra}`,
    `var(--shadow-3-penumbra) ${vars.color.shadow.penumbra}`,
    `var(--shadow-3-ambient) ${vars.color.shadow.ambient}`,
  ].join(', '),
})
_responsiveRule(util, 'shadow-4', {
  boxShadow: [
    `var(--shadow-outline) ${vars.color.shadow.outline}`,
    `var(--shadow-4-umbra) ${vars.color.shadow.umbra}`,
    `var(--shadow-4-penumbra) ${vars.color.shadow.penumbra}`,
    `var(--shadow-4-ambient) ${vars.color.shadow.ambient}`,
  ].join(', '),
})
_responsiveRule(util, 'shadow-5', {
  boxShadow: [
    `var(--shadow-outline) ${vars.color.shadow.outline}`,
    `var(--shadow-5-umbra) ${vars.color.shadow.umbra}`,
    `var(--shadow-5-penumbra) ${vars.color.shadow.penumbra}`,
    `var(--shadow-5-ambient) ${vars.color.shadow.ambient}`,
  ].join(', '),
})

export const shadowStyle: Style = {layers: {util}}
