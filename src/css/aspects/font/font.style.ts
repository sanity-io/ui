import {_responsiveRule} from '../../_responsiveRule'
import {Style, StyleRules} from '../../types'

export const primitive: StyleRules = {
  '.font': {
    'fontFamily': 'var(--font-family)',
    'fontFeatureSettings': 'var(--font-feature-settings)',
    'fontSize': 'var(--font-size)',
    'lineHeight': 'var(--font-line-height)',
    'letterSpacing': 'var(--font-letter-spacing)',
    'fontWeight': 'var(--font-weight)',
    'transform': `translateY(var(--font-descender-height))`,
    'padding': '1px 0',
    'margin': '0',

    '--font-icon-offset':
      'calc(((var(--font-line-height) - var(--font-ascender-height) - var(--font-descender-height)) - var(--font-icon-size)) / 2)',
    '--font-weight': 'var(--font-weight-regular)',

    '@nest': {
      '&:before': {
        content: '""',
        display: 'block',
        height: 0,
        marginTop: `calc((0px - var(--font-ascender-height) - var(--font-descender-height)) - 1px)`,
      },

      '&:after': {
        content: '""',
        display: 'block',
        height: 0,
        marginBottom: '-1px',
      },

      '& svg': {
        // Certain popular CSS libraries changes the defaults for SVG display
        // Make sure SVGs are rendered as inline elements
        display: 'inline',
      },

      // todo
      // '& svg:not([data-sanity-icon])': {
      //   fontSize: 'calc(var(--custom-icon-size) / 16 * 1rem)',
      //   margin: 'var(--custom-icon-offset)',
      // },

      '& [data-sanity-icon]': {
        fontSize: 'var(--font-icon-size)',
        margin: 'var(--font-icon-offset)',
        vectorEffect: 'non-scaling-stroke',
      },
    },
  },

  '.font-regular': {
    '--font-weight': 'var(--font-weight-regular)',
  },

  '.font-medium': {
    '--font-weight': 'var(--font-weight-medium)',
  },

  '.font-semibold': {
    '--font-weight': 'var(--font-weight-semibold)',
  },

  '.font-bold': {
    '--font-weight': 'var(--font-weight-bold)',
  },
}

_responsiveRule(primitive, `text-align-initial`, {
  textAlign: 'initial',
})

_responsiveRule(primitive, `text-align-left`, {
  textAlign: 'left',
})

_responsiveRule(primitive, `text-align-center`, {
  textAlign: 'center',
})

_responsiveRule(primitive, `text-align-right`, {
  textAlign: 'right',
})

_responsiveRule(primitive, `text-align-justify`, {
  textAlign: 'justify',
})

export const fontStyle: Style = {layers: {primitive}}
