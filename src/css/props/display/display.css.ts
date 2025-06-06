import {_responsiveStyle} from '../../_responsiveStyle.css'
import {layers} from '../../layers.css'
import type {ResponsiveRuleOptions} from '../../types'
import type {Display} from './types'

export const options: ResponsiveRuleOptions<Display> = {
  'block': _responsiveStyle(layers.props, {
    selectors: {
      '&:not([hidden])': {
        display: 'block',
      },
    },
  }),
  'flex': _responsiveStyle(layers.props, {
    selectors: {
      '&:not([hidden])': {
        display: 'flex',
      },
    },
  }),
  'grid': _responsiveStyle(layers.props, {
    selectors: {
      '&:not([hidden])': {
        display: 'grid',
      },
    },
  }),
  'inline-block': _responsiveStyle(layers.props, {
    selectors: {
      '&:not([hidden])': {
        display: 'inline-block',
      },
    },
  }),
  'inline-flex': _responsiveStyle(layers.props, {
    selectors: {
      '&:not([hidden])': {
        display: 'inline-flex',
      },
    },
  }),
  'inline-grid': _responsiveStyle(layers.props, {
    selectors: {
      '&:not([hidden])': {
        display: 'inline-grid',
      },
    },
  }),
  'none': _responsiveStyle(layers.props, {
    selectors: {
      '&:not([hidden])': {
        display: 'none',
      },
    },
  }),
}
