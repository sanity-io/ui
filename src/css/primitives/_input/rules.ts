import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const _inputRules: Rules = {
  'input': {
    position: 'relative',
  },

  ...responsiveRules('input-0', {
    '--input-font-size': 'var(--font-text-0-size)',
    '--input-line-height': 'var(--font-text-0-line-height)',
    '--input-ascender-height': 'var(--font-text-0-ascender-height)',
    '--input-descender-height': 'var(--font-text-0-descender-height)',
    '--input-cap-height': 'var(--font-text-0-cap-height)',
  }),
  ...responsiveRules('input-1', {
    '--input-font-size': 'var(--font-text-1-size)',
    '--input-line-height': 'var(--font-text-1-line-height)',
    '--input-ascender-height': 'var(--font-text-1-ascender-height)',
    '--input-descender-height': 'var(--font-text-1-descender-height)',
    '--input-cap-height': 'var(--font-text-1-cap-height)',
  }),
  ...responsiveRules('input-2', {
    '--input-font-size': 'var(--font-text-2-size)',
    '--input-line-height': 'var(--font-text-2-line-height)',
    '--input-ascender-height': 'var(--font-text-2-ascender-height)',
    '--input-descender-height': 'var(--font-text-2-descender-height)',
    '--input-cap-height': 'var(--font-text-2-cap-height)',
  }),
  ...responsiveRules('input-3', {
    '--input-font-size': 'var(--font-text-3-size)',
    '--input-line-height': 'var(--font-text-3-line-height)',
    '--input-ascender-height': 'var(--font-text-3-ascender-height)',
    '--input-descender-height': 'var(--font-text-3-descender-height)',
    '--input-cap-height': 'var(--font-text-3-cap-height)',
  }),
  ...responsiveRules('input-4', {
    '--input-font-size': 'var(--font-text-4-size)',
    '--input-line-height': 'var(--font-text-4-line-height)',
    '--input-ascender-height': 'var(--font-text-4-ascender-height)',
    '--input-descender-height': 'var(--font-text-4-descender-height)',
    '--input-cap-height': 'var(--font-text-4-cap-height)',
  }),

  ...responsiveRules('input-p-0', {'--input-padding': 'var(--space-0)'}),
  ...responsiveRules('input-p-1', {'--input-padding': 'var(--space-1)'}),
  ...responsiveRules('input-p-2', {'--input-padding': 'var(--space-2)'}),
  ...responsiveRules('input-p-3', {'--input-padding': 'var(--space-3)'}),
  ...responsiveRules('input-p-4', {'--input-padding': 'var(--space-4)'}),
  ...responsiveRules('input-p-5', {'--input-padding': 'var(--space-5)'}),
  ...responsiveRules('input-p-6', {'--input-padding': 'var(--space-6)'}),
  ...responsiveRules('input-p-7', {'--input-padding': 'var(--space-7)'}),
  ...responsiveRules('input-p-8', {'--input-padding': 'var(--space-8)'}),
  ...responsiveRules('input-p-9', {'--input-padding': 'var(--space-9)'}),

  ...responsiveRules('input-g-0', {'--input-gap': 'var(--space-0)'}),
  ...responsiveRules('input-g-1', {'--input-gap': 'var(--space-1)'}),
  ...responsiveRules('input-g-2', {'--input-gap': 'var(--space-2)'}),
  ...responsiveRules('input-g-3', {'--input-gap': 'var(--space-3)'}),
  ...responsiveRules('input-g-4', {'--input-gap': 'var(--space-4)'}),
  ...responsiveRules('input-g-5', {'--input-gap': 'var(--space-5)'}),
  ...responsiveRules('input-g-6', {'--input-gap': 'var(--space-6)'}),
  ...responsiveRules('input-g-7', {'--input-gap': 'var(--space-7)'}),
  ...responsiveRules('input-g-8', {'--input-gap': 'var(--space-8)'}),
  ...responsiveRules('input-g-9', {'--input-gap': 'var(--space-9)'}),

  'input-b': {
    '@nest': {
      '& .input-presentation': {
        boxShadow: 'inset 0 0 0 1px var(--input-border-color)',
      },
    },
  },

  'input-element': {
    '--input-fg-color': 'var(--color-tinted-default-fg-2)',
    '--input-placeholder-color': 'var(--color-tinted-default-border-4)',

    'WebkitFontSmoothing': 'inherit',
    'appearance': 'none',
    'border': 0,
    // 'width': '100%',
    'outline': 'none',
    'margin': 0,
    'fontFamily': 'var(--font-text-family)',
    'fontSize': 'var(--input-font-size)',
    'lineHeight': 'var(--input-line-height)',
    'backgroundColor': 'transparent',
    'color': 'var(--input-fg-color)',
    'padding': [
      'calc(var(--input-padding) - var(--input-ascender-height))',
      'var(--input-padding)',
      'calc(var(--input-padding) - var(--input-descender-height))',
      'var(--input-padding)',
    ].join(' '),
    'borderRadius': 'inherit',
    'position': 'relative',
    'zIndex': 1,
    'display': 'block',
    'boxSizing': 'border-box',
    'resize': 'none',
    'width': ['-moz-available', '-webkit-fill-available', 'stretch'],

    '@nest': {
      '.input[data-icon-left] &': {
        paddingLeft: `calc(var(--input-padding) + var(--input-cap-height) + var(--input-gap))`,
      },

      '.input[data-icon-right] &': {
        paddingRight: `calc(var(--input-padding) + var(--input-cap-height) + var(--input-gap))`,
      },

      '&::placeholder': {
        color: 'var(--input-placeholder-color)',
      },

      '&:hover': {
        '--input-fg-color': 'var(--color-tinted-default-fg-0)',
      },

      '&:focus': {
        '--input-fg-color': 'var(--color-tinted-default-fg-0)',
      },

      '&:disabled': {
        '--input-fg-color': 'var(--color-tinted-default-border-3)',
      },
    },
  },

  'input-presentation': {
    '--color-fg': 'var(--color-tinted-default-fg-4)',
    '--input-bg-color': 'var(--color-tinted-default-bg-0)',
    '--input-border-color': 'var(--color-tinted-default-border-1)',

    'borderRadius': 'inherit',
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'right': 0,
    'bottom': 0,
    'display': 'block',
    'pointerEvents': 'none',
    'zIndex': 0,

    '@nest': {
      '.input[data-prefix] &': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },

      '.input[data-suffix] &': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },

      '.input-element:placeholder-shown + &': {
        '--color-fg': 'var(--color-tinted-default-border-4)',
      },

      '.input-element:hover + &': {
        '--input-border-color': 'var(--color-tinted-default-border-2)',
        '--input-fg-color': 'var(--color-tinted-default-fg-1)',

        'boxShadow': 'inset 0 0 0 1px var(--input-border-color)',
      },

      '.input-element:focus + &': {
        '--input-border-color': 'var(--color-tinted-default-border-2)',
        '--input-fg-color': 'var(--color-tinted-default-fg-1)',

        'boxShadow': 'inset 0 0 0 1px var(--input-border-color)',
        'outlineOffset': 'var(--input-text-focus-ring-offset)',
        'outline': `var(--input-text-focus-ring-width) solid var(--color-focus-ring)`,
      },

      '.input-element:disabled + &': {
        '--input-bg-color': 'var(--color-tinted-default-bg-1)',
        '--input-border-color': 'var(--color-tinted-default-border-0)',

        'opacity': 1,
      },
    },
  },
}
