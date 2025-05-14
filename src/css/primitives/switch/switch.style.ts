import {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.switch': {},

  '.switch-element': {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
    height: '100%',
    width: '100%',
    outline: 'none',
    padding: 0,
    margin: 0,

    // place the input element on top of the representation element
    zIndex: 1,
  },

  '.switch-presentation': {
    '--switch-bg-color': 'var(--color-tinted-default-border-2)',
    '--switch-fg-color': 'var(--color-tinted-default-bg-0)',
    '--switch-thumb-offset': '0',
    '--switch-thumb-size': 'calc(var(--input-switch-height) - var(--input-switch-padding) * 2)',
    'display': 'block',
    'position': 'relative',
    'width': 'var(--input-switch-width)',
    'height': 'var(--input-switch-height)',
    'borderRadius': 'calc(var(--input-switch-height) / 2)',
    'outlineOffset': 'var(--input-switch-focus-ring-offset)',

    // Make sure it’s not possible to interact with the presentation element
    'pointerEvents': 'none',

    '@nest': {
      '.switch-element:focus + &': {
        outline: 'var(--input-switch-focus-ring-width) solid var(--color-focus-ring)',
      },

      'input:focus:not(:focus-visible) + &': {
        outline: 'none',
      },

      'input:checked + &': {
        '--switch-bg-color': 'var(--color-solid-default-bg-0)',
        '--switch-fg-color': 'var(--color-solid-default-fg-0)',
      },

      '.switch-element:checked + &': {
        '--switch-thumb-offset':
          'calc(var(--input-switch-width) - (var(--input-switch-padding) * 2) - var(--switch-thumb-size))',
      },

      '[data-indeterminate] > .switch-element + &': {
        '--switch-thumb-offset':
          'calc(var(--input-switch-width) / 2 - var(--switch-thumb-size) / 2 - var(--input-switch-padding))',
      },
    },
  },

  '.switch-track': {
    display: 'block',
    backgroundColor: 'var(--switch-bg-color)',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',

    transition:
      'box-shadow, background-color var(--input-switch-transition-duration-ms) var(--input-switch-transition-timing-function)',
  },

  '.switch-thumb': {
    display: 'block',
    position: 'absolute',
    left: 'var(--input-switch-padding)',
    top: 'var(--input-switch-padding)',
    width: 'var(--switch-thumb-size)',
    height: 'var(--switch-thumb-size)',
    backgroundColor: 'var(--switch-fg-color)',
    borderRadius: '9999px',
    boxShadow: '0 0 0 0.5px var(--color-shadow-umbra), 0 0.5px 2px 0.5px var(--color-shadow-umbra)',
    transform: 'translate3d(var(--switch-thumb-offset), 0, 0)',
    transition:
      'transform var(--input-switch-transition-duration-ms) var(--input-switch-transition-timing-function)',
  },
}

export const switchStyle: Style = {layers: {primitive}}
