import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const _inputRules: Rules = {
  '_input': {
    'position': 'relative',
    'width': ['-moz-available', '-webkit-fill-available', 'stretch'],

    '@nest': {
      '& input, & select, & textarea': {
        '--input-fg-color': 'var(--color-tinted-default-fg-2)',
        '--input-placeholder-color': 'var(--color-tinted-default-border-4)',

        'WebkitFontSmoothing': 'inherit',
        'appearance': 'none',
        'border': 0,
        'width': '100%',
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
      },

      '&[data-icon-left] input, &[data-icon-left] select, &[data-icon-left] textarea': {
        paddingLeft: `calc(var(--input-padding) + (var(--input-line-height) - var(--input-ascender-height) - var(--input-descender-height)) + var(--input-space))`,
      },

      '&[data-icon-right] input, &[data-icon-right] select, &[data-icon-right] textarea': {
        paddingRight: `calc(var(--input-padding) + (var(--input-line-height) - var(--input-ascender-height) - var(--input-descender-height)) + var(--input-space))`,
      },

      '& input::placeholder, & textarea::placeholder': {
        color: 'var(--input-placeholder-color)',
      },

      '& input:placeholder-shown + span, & textarea:placeholder-shown + span': {
        '--color-fg': 'var(--color-tinted-default-border-4)',
      },

      '& input + span, & select + span, & textarea + span': {
        '--color-fg': 'var(--color-tinted-default-fg-4)',
        '--input-bg-color': 'var(--color-tinted-default-bg-0)',
        '--input-border-color': 'var(--color-tinted-default-border-1)',

        'borderRadius': 'inherit',
        // 'display': 'block',

        'position': 'absolute',
        'top': 0,
        'left': 0,
        'right': 0,
        'bottom': 0,
        'display': 'block',
        'pointerEvents': 'none',
        'zIndex': 0,
      },

      '& input:hover, & select:hover, & textarea:hover': {
        '--input-fg-color': 'var(--color-tinted-default-fg-0)',
      },

      '& input:hover + span, & select:hover + span, & textarea:hover + span': {
        '--input-border-color': 'var(--color-tinted-default-border-2)',
        '--input-fg-color': 'var(--color-tinted-default-fg-1)',

        'boxShadow': 'inset 0 0 0 1px var(--input-border-color)',
      },

      '& input:focus, & select:focus, & textarea:focus': {
        '--input-fg-color': 'var(--color-tinted-default-fg-0)',
      },

      '& input:focus + span, & select:focus + span, & textarea:focus + span': {
        '--input-border-color': 'var(--color-tinted-default-border-2)',
        '--input-fg-color': 'var(--color-tinted-default-fg-1)',

        'boxShadow': 'inset 0 0 0 1px var(--input-border-color)',
      },

      '& input:disabled, & select:disabled, & textarea:disabled': {
        '--input-fg-color': 'var(--color-tinted-default-border-3)',
      },

      '& input:disabled + span, & select:disabled + span, & textarea:disabled + span': {
        '--input-bg-color': 'var(--color-tinted-default-bg-1)',
        '--input-border-color': 'var(--color-tinted-default-border-0)',

        'opacity': 1,
      },
    },
  },

  ...responsiveRules('_input-0', {
    '--input-font-size': 'var(--font-text-0-size)',
    '--input-line-height': 'var(--font-text-0-line-height)',
    '--input-ascender-height': 'var(--font-text-0-ascender-height)',
    '--input-descender-height': 'var(--font-text-0-descender-height)',
  }),
  ...responsiveRules('_input-1', {
    '--input-font-size': 'var(--font-text-1-size)',
    '--input-line-height': 'var(--font-text-1-line-height)',
    '--input-ascender-height': 'var(--font-text-1-ascender-height)',
    '--input-descender-height': 'var(--font-text-1-descender-height)',
  }),
  ...responsiveRules('_input-2', {
    '--input-font-size': 'var(--font-text-2-size)',
    '--input-line-height': 'var(--font-text-2-line-height)',
    '--input-ascender-height': 'var(--font-text-2-ascender-height)',
    '--input-descender-height': 'var(--font-text-2-descender-height)',
  }),
  ...responsiveRules('_input-3', {
    '--input-font-size': 'var(--font-text-3-size)',
    '--input-line-height': 'var(--font-text-3-line-height)',
    '--input-ascender-height': 'var(--font-text-3-ascender-height)',
    '--input-descender-height': 'var(--font-text-3-descender-height)',
  }),
  ...responsiveRules('_input-4', {
    '--input-font-size': 'var(--font-text-4-size)',
    '--input-line-height': 'var(--font-text-4-line-height)',
    '--input-ascender-height': 'var(--font-text-4-ascender-height)',
    '--input-descender-height': 'var(--font-text-4-descender-height)',
  }),

  ...responsiveRules('_input-p-0', {'--input-padding': 'var(--space-0)'}),
  ...responsiveRules('_input-p-1', {'--input-padding': 'var(--space-1)'}),
  ...responsiveRules('_input-p-2', {'--input-padding': 'var(--space-2)'}),
  ...responsiveRules('_input-p-3', {'--input-padding': 'var(--space-3)'}),
  ...responsiveRules('_input-p-4', {'--input-padding': 'var(--space-4)'}),
  ...responsiveRules('_input-p-5', {'--input-padding': 'var(--space-5)'}),
  ...responsiveRules('_input-p-6', {'--input-padding': 'var(--space-6)'}),
  ...responsiveRules('_input-p-7', {'--input-padding': 'var(--space-7)'}),
  ...responsiveRules('_input-p-8', {'--input-padding': 'var(--space-8)'}),
  ...responsiveRules('_input-p-9', {'--input-padding': 'var(--space-9)'}),

  ...responsiveRules('_input-space-0', {'--input-space': 'var(--space-0)'}),
  ...responsiveRules('_input-space-1', {'--input-space': 'var(--space-1)'}),
  ...responsiveRules('_input-space-2', {'--input-space': 'var(--space-2)'}),
  ...responsiveRules('_input-space-3', {'--input-space': 'var(--space-3)'}),
  ...responsiveRules('_input-space-4', {'--input-space': 'var(--space-4)'}),
  ...responsiveRules('_input-space-5', {'--input-space': 'var(--space-5)'}),
  ...responsiveRules('_input-space-6', {'--input-space': 'var(--space-6)'}),
  ...responsiveRules('_input-space-7', {'--input-space': 'var(--space-7)'}),
  ...responsiveRules('_input-space-8', {'--input-space': 'var(--space-8)'}),
  ...responsiveRules('_input-space-9', {'--input-space': 'var(--space-9)'}),

  '_input-border': {
    '@nest': {
      '& input + span, & select + span, & textarea + span': {
        boxShadow: 'inset 0 0 0 1px var(--input-border-color)',
      },
    },
  },
}
