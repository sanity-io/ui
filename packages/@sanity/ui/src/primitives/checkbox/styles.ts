import {CSSObject} from 'styled-components'
import {ThemeProps, rem} from '../../styles'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/internal'

export function checkboxBaseStyles(): CSSObject {
  return {
    position: 'relative',
    display: 'inline-block',
  }
}

export function inputElementStyles(props: ThemeProps): CSSObject {
  const {theme} = props
  const color = theme.sanity.color.input
  const {focusRing, input, radius} = theme.sanity

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    outline: 'none',
    opacity: 0,
    zIndex: 1,
    padding: 0,
    margin: 0,

    '& + span': {
      position: 'relative',
      display: 'block',
      height: rem(input.checkbox.size),
      width: rem(input.checkbox.size),
      boxSizing: 'border-box',
      boxShadow: focusRingBorderStyle({
        color: color.default.enabled.border,
        width: input.border.width,
      }),
      borderRadius: rem(radius[2]),
      lineHeight: 1,
      backgroundColor: color.default.enabled.bg,
      '& > svg': {
        display: 'block',
        position: 'absolute',
        opacity: 0,
        height: '100%',
        width: '100%',
        '& > path': {
          vectorEffect: 'non-scaling-stroke',
          strokeWidth: '2 !important',
        },
      },
    },

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

    '&:checked + span > svg:first-child': {
      opacity: 1,
    },

    '&[data-read-only] + span': {
      backgroundColor: color.default.readOnly.bg,
      boxShadow: focusRingBorderStyle({
        width: input.border.width,
        color: color.default.readOnly.border,
      }),
      color: color.default.readOnly.fg,
    },

    '&:not([data-read-only]):disabled + span': {
      backgroundColor: color.default.disabled.bg,
      boxShadow: focusRingBorderStyle({
        width: input.border.width,
        color: color.default.disabled.border,
      }),
      color: color.default.disabled.fg,
    },

    '&:indeterminate + span > svg:last-child': {
      opacity: 1,
    },
  }
}
