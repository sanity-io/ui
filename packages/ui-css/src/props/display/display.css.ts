import {_responsiveStyle} from '../../_responsiveStyle.css'
import {_layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {Display} from './types'

export const options: ResponsiveRuleOptions<Display> = {
  'block': _responsiveStyle(
    _layers.prop,
    {selectors: {'&:not([hidden])': {display: 'block'}}},
    'block',
  ),
  'flex': _responsiveStyle(
    _layers.prop,
    {selectors: {'&:not([hidden])': {display: 'flex'}}},
    'flex',
  ),
  'grid': _responsiveStyle(
    _layers.prop,
    {selectors: {'&:not([hidden])': {display: 'grid'}}},
    'grid',
  ),
  'inline-block': _responsiveStyle(
    _layers.prop,
    {selectors: {'&:not([hidden])': {display: 'inline-block'}}},
    'inline-block',
  ),
  'inline-flex': _responsiveStyle(
    _layers.prop,
    {selectors: {'&:not([hidden])': {display: 'inline-flex'}}},
    'inline-flex',
  ),
  'inline-grid': _responsiveStyle(
    _layers.prop,
    {selectors: {'&:not([hidden])': {display: 'inline-grid'}}},
    'inline-grid',
  ),
  'none': _responsiveStyle(
    _layers.prop,
    {selectors: {'&:not([hidden])': {display: 'none'}}},
    'none',
  ),
}
