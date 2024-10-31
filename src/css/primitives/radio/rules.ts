import {Rules} from '../../types'

export const radioRules: Rules = {
  radio: {
    'position': 'relative',

    '@nest': {
      '&:not([hidden])': {
        display: 'inline-block',
      },

      '& input': {
        appearance: 'none',
        position: 'absolute',
        top: '0',
        left: '0',
        opacity: '0',
        height: '100%',
        width: '100%',
        outline: 'none',
        zIndex: '1',
        padding: '0',
        margin: '0',
        borderRadius: '9999px',
        border: 'none',
      },

      /* enabled */
      '& > input + span': {
        'display': 'block',
        'position': 'relative',
        'width': 'var(--input-radio-size)',
        'height': 'var(--input-radio-size)',
        'borderRadius': '9999px',
        'backgroundColor': 'var(--color-input-bg)',
        'boxShadow': 'inset 0 0 0 1px var(--color-input-border)',
        // border-radius: ${rem(input.radio.size / 2)};
        // background: ${color.input.default.enabled.bg};
        // box-shadow: ${focusRingBorderStyle({
        //   color: color.input.default.enabled.border,
        //   width: input.border.width,
        // })};

        '--color-input-fg': 'var(--color-tinted-default-fg-0)',
        '--color-input-bg': 'var(--color-tinted-default-bg-0)',
        '--color-input-border': 'var(--color-tinted-default-border-1)',
      },

      '& > input + span::after': {
        content: '""',
        position: 'absolute',
        top: `calc((var(--input-radio-size) - var(--input-radio-mark-size)) / 2)`,
        left: `calc((var(--input-radio-size) - var(--input-radio-mark-size)) / 2)`,
        width: 'var(--input-radio-mark-size)',
        height: 'var(--input-radio-mark-size)',
        backgroundColor: 'var(--color-input-fg)',
        borderRadius: '9999px',
        opacity: 0,
      },

      /* hovered */
      '& > input:not(:disabled):hover + span': {
        '--color-input-bg': 'var(--color-tinted-default-bg-1)',
        '--color-input-border': 'var(--color-tinted-default-border-2)',
      },

      /* focused */
      '& > input:not(:disabled):focus + span': {
        '--color-input-border': 'var(--color-tinted-default-border-2)',
        // box-shadow: ${focusRingStyle({
        //   border: {width: input.border.width, color: color.input.default.enabled.border},
        //   focusRing: input.radio.focusRing,
        // })};
      },

      '& > input:not(:disabled):focus:not(:focus-visible) + span': {
        // box-shadow: ${focusRingBorderStyle({
        //   color: color.input.default.enabled.border,
        //   width: input.border.width,
        // })};
      },

      '& > input:checked + span::after': {
        opacity: 1,
      },

      //   /* customValidity */
      //   &[data-error] + span {
      //     background-color: ${color.input.invalid.enabled.border};
      //     box-shadow: ${focusRingBorderStyle({
      //       width: input.border.width,
      //       color: color.input.invalid.enabled.muted.bg,
      //     })};
      //     &::after {
      //       background: ${color.input.invalid.enabled.muted.bg};
      //     }
      //   }

      //   /* read only */
      //   &[data-read-only] + span {
      //     box-shadow: 0 0 0 1px ${color.input.default.readOnly.border};
      //     background: ${color.input.default.readOnly.bg};

      //     &::after {
      //       background: ${color.input.default.readOnly.border};
      //     }
      //   }

      //   /* disabled */
      //   &:not([data-read-only]):disabled + span {
      //     box-shadow: 0 0 0 1px ${color.input.default.disabled.border};
      //     background: ${color.input.default.disabled.bg};

      //     &::after {
      //       background: ${color.input.default.disabled.border};
      //     }
      //   }
      // `
    },
  },
}
