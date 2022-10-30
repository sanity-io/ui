import {CSSObject} from 'styled-components'
import {rem, ThemeProps} from '../../styles'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/internal'

export function radioBaseStyle(): CSSObject {
  return {
    position: 'relative',

    '&:not([hidden])': {
      display: 'inline-block',
    },

    '&[data-read-only]': {
      outline: '1px solid red',
    },
  }
}

export function inputElementStyle(props: ThemeProps): CSSObject {
  const {theme} = props
  const {focusRing, input} = theme.sanity
  const color = theme.sanity.color.input
  const dist = (input.radio.size - input.radio.markSize) / 2

  return {
    appearance: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    height: '100%',
    width: '100%',
    outline: 'none',
    zIndex: 1,
    padding: 0,
    margin: 0,
    borderRadius: rem(input.radio.size / 2),
    border: 'none',

    /* enabled */
    '& + span': {
      display: 'block',
      position: 'relative',
      height: rem(input.radio.size),
      width: rem(input.radio.size),
      borderRadius: rem(input.radio.size / 2),
      background: color.default.enabled.bg,
      boxShadow: focusRingBorderStyle({
        color: color.default.enabled.border,
        width: input.border.width,
      }),

      '&::after': {
        content: '""',
        position: 'absolute',
        top: rem(dist),
        left: rem(dist),
        height: rem(input.radio.markSize),
        width: rem(input.radio.markSize),
        borderRadius: rem(input.radio.markSize / 2),
        background: color.default.enabled.fg,
        opacity: 0,
      },
    },

    /* focused */
    '&:not(:disabled):focus + span': {
      boxShadow: focusRingStyle({
        border: {width: input.border.width, color: color.default.enabled.border},
        focusRing,
      }),
    },

    '&:not(:disabled):focus:not(:focus-visible) + span': {
      boxShadow: focusRingBorderStyle({
        color: color.default.enabled.border,
        width: input.border.width,
      }),
    },

    '&:checked + span::after': {
      opacity: 1,
    },

    /* read only */
    '&[data-read-only] + span': {
      boxShadow: `0 0 0 1px ${color.default.readOnly.border}`,
      background: color.default.readOnly.bg,

      '&::after': {
        background: color.default.readOnly.fg,
      },
    },

    /* disabled */
    '&:not([data-read-only]):disabled + span': {
      boxShadow: `0 0 0 1px ${color.default.disabled.border}`,
      background: color.default.disabled.bg,

      '&::after': {
        background: color.default.disabled.fg,
      },
    },
  }
}
