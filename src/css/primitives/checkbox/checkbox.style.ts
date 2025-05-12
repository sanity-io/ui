import {Style, StyleRules} from '../../types'

const primitive: StyleRules = {
  '.checkbox': {
    position: 'relative',
    display: 'inline-block',
  },

  '.checkbox-input': {
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'width': '100%',
    'height': '100%',
    'outline': 'none',
    'opacity': 0,
    'zIndex': 1,
    'padding': 0,
    'margin': 0,

    '@nest': {
      '& + span': {
        'position': 'relative',
        'display': 'block',
        'width': `var(--input-checkbox-size)`,
        'height': `var(--input-checkbox-size)`,
        'boxSizing': 'border-box',
        'borderRadius': `var(--radius-2)`,
        'lineHeight': 1,
        'backgroundColor': `var(--color-checkbox-bg)`,
        'boxShadow': `inset 0 0 0 1px var(--color-checkbox-border)`,
        'color': `var(--color-checkbox-fg)`,

        // '--color-checkbox-bg': 'var(--color-input-default-enabled-bg)',
        // '--color-checkbox-border': 'var(--color-input-default-enabled-border)',
        // '--color-checkbox-fg': 'var(--color-input-default-enabled-fg)',

        '--color-checkbox-bg': 'var(--color-tinted-default-bg-0)',
        '--color-checkbox-border': 'var(--color-tinted-default-border-1)',
        '--color-checkbox-fg': 'var(--color-tinted-default-fg-0)',

        // box-shadow: ${focusRingBorderStyle({
        //   color: color.input.default.enabled.border,
        //   width: input.border.width,
        // })},
      },

      '& + span > svg': {
        display: 'block',
        position: 'absolute',
        opacity: 0,
        height: '100%',
        width: '100%',
      },

      '& + span > svg > path': {
        vectorEffect: 'non-scaling-stroke',
        strokeWidth: '1.5px !important',
      },

      '&:hover + span': {
        '--color-checkbox-bg': 'var(--color-tinted-default-bg-1)',
        '--color-checkbox-border': 'var(--color-tinted-default-border-2)',
        '--color-checkbox-fg': 'var(--color-tinted-default-fg-0)',
      },

      '&:checked + span': {
        '--color-checkbox-bg': 'var(--color-solid-default-bg-0)',
        '--color-checkbox-border': 'var(--color-solid-default-bg-0)',
        '--color-checkbox-fg': 'var(--color-solid-default-fg-0)',
        // '--color-checkbox-bg': 'var(--color-input-default-enabled-fg)',
        // '--color-checkbox-border': 'var(--color-input-default-enabled-fg)',
        // '--color-checkbox-fg': 'var(--color-input-default-enabled-bg)',
        // box-shadow: ${focusRingBorderStyle({
        //   color: color.input.default.enabled.fg,
        //   width: input.border.width,
        // })},
      },

      '&:checked + span > svg:first-child': {
        opacity: 1,
      },

      // focus
      '&:not(:disabled):focus:focus-visible + span': {
        // box-shadow: ${focusRingStyle({focusRing})},
      },

      // focus when checked - uses a different offset
      '&:not(:disabled):focus:focus-visible&:checked + span': {
        // box-shadow: ${focusRingStyle({focusRing: {width: 1, offset: 1}})},
      },

      '&[data-error] + span': {
        '--color-checkbox-bg': 'var(--color-input-invalid-enabled-border)',
        '--color-checkbox-border': 'var(--color-input-invalid-enabled-bg)',
        '--color-checkbox-fg': 'var(--color-input-invalid-enabled-fg)',
        // box-shadow: ${focusRingBorderStyle({
        //   width: input.border.width,
        //   color: color.input.invalid.enabled.muted.bg,
        // })},
      },

      '&[data-error]:checked + span': {
        '--color-checkbox-bg': 'var(--color-input-invalid-enabled-muted-bg)',
        '--color-checkbox-fg': 'var(--color-input-invalid-enabled-bg)',
      },

      '&[data-error]:checked:not(:disabled):focus:focus-visible + span': {
        '--color-checkbox-border': 'var(--color-input-invalid-readOnly-muted-bg)',
        // box-shadow: ${focusRingStyle({
        //   border: {width: input.border.width, color: color.input.invalid.readOnly.muted.bg},
        //   focusRing: {width: 1, offset: 1},
        // })},
      },

      '&:disabled + span': {
        '--color-checkbox-bg': 'var(--color-tinted-default-bg-1)',
        '--color-checkbox-border': 'var(--color-tinted-default-border-0)',
        '--color-checkbox-fg': 'var(--color-tinted-default-border-2)',
      },

      '&:checked:disabled + span': {
        '--color-checkbox-bg': 'var(--color-tinted-default-border-2)',
        '--color-checkbox-border': 'var(--color-tinted-default-border-2)',
        '--color-checkbox-fg': 'var(--color-tinted-default-bg-0)',
      },

      // '&:disabled:checked + span': {
      //   '--color-checkbox-bg': 'var(--color-input-default-disabled-muted-bg)',
      // },

      '&[data-read-only] + span': {
        '--color-checkbox-bg': 'var(--color-input-default-readOnly-bg)',
        '--color-checkbox-border': 'var(--color-input-default-readOnly-border)',
        '--color-checkbox-fg': 'var(--color-input-default-readOnly-fg)',
        // box-shadow: ${focusRingBorderStyle({
        //   width: input.border.width,
        //   color: color.input.default.readOnly.border,
        // })},
      },

      '&[data-read-only]:checked + span': {
        '--color-checkbox-bg': 'var(--color-input-default-readOnly-muted-bg)',
      },

      '&:indeterminate + span > svg:last-child': {
        opacity: 1,
      },
    },
  },
}

export const checkboxStyle: Style = {layers: {primitive}}
