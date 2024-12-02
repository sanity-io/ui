import {responsiveRules} from '../../responsiveRules'
import {Rules} from '../../types'

export const _inputRules: Rules = {
  _input: {
    'position': 'relative',
    'width': ['-moz-available', '-webkit-fill-available', 'stretch'],

    '@nest': {
      '& input, & select, & textarea': {
        'WebkitFontSmoothing': 'inherit',
        'appearance': 'none',
        'border': 0,
        // 'color': 'inherit',
        'width': '100%',
        'outline': 'none',
        'margin': 0,
        'fontSize': 'var(--input-font-size)',
        'lineHeight': 'var(--input-line-height)',
        // backgroundColor: '#ddd',
        'backgroundColor': 'transparent',
        // 'backgroundColor': 'var(--input-bg-color)',
        'color': 'var(--input-fg-color)',
        'boxShadow': 'inset 0 0 0 1px var(--input-border-color)',
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
        // '--input-padding': '8px',
        // -webkit-font-smoothing: antialiased;
        // appearance: none;
        // border: 0;
        // font-family: ${font.text.family};
        // color: inherit;
        // width: 100%;
        // outline: none;
        // margin: 0;

        '--input-bg-color': 'var(--color-tinted-default-bg-0)',
        '--input-border-color': 'var(--color-tinted-default-border-1)',
        '--input-fg-color': 'var(--color-tinted-default-fg-2)',
      },

      '& input::placeholder, & textarea::placeholder': {
        color: 'var(--color-tinted-default-border-4)',
      },

      '& input:hover, & select:hover, & textarea:hover': {
        // '--input-bg-color': 'var(--color-tinted-default-bg-0)',
        '--input-border-color': 'var(--color-tinted-default-border-2)',
        '--input-fg-color': 'var(--color-tinted-default-fg-1)',
      },

      '& input:focus, & select:focus, & textarea:focus': {
        // '--input-bg-color': 'var(--color-tinted-default-bg-0)',
        '--input-border-color': 'var(--color-tinted-default-border-2)',
        '--input-fg-color': 'var(--color-tinted-default-fg-1)',
      },

      '& input:disabled, & select:disabled, & textarea:disabled': {
        '--input-bg-color': 'var(--color-tinted-default-bg-1)',
        '--input-border-color': 'var(--color-tinted-default-border-0)',
        '--input-fg-color': 'var(--color-tinted-default-border-3)',
        // 'opacity': 1,
        // '&:disabled': {
        //   opacity: 1;
        // }
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
}
