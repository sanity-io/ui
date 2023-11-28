import {css} from 'styled-components'
import {rem, ThemeProps} from '../../styles'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/internal'

export function checkboxBaseStyles(): ReturnType<typeof css> {
  return css`
    position: relative;
    display: inline-block;
  `
}

export function inputElementStyles(props: ThemeProps): ReturnType<typeof css> {
  const {theme} = props
  const color = theme.sanity.color.input
  const {input, radius} = theme.sanity
  const {focusRing} = input.checkbox

  return css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    z-index: 1;
    padding: 0;
    margin: 0;

    & + span {
      position: relative;
      display: block;
      height: ${rem(input.checkbox.size)};
      width: ${rem(input.checkbox.size)};
      box-sizing: border-box;
      box-shadow: ${focusRingBorderStyle({
        color: color.default.enabled.border,
        width: input.border.width,
      })};
      border-radius: ${rem(radius[2])};
      line-height: 1;
      background-color: ${color.default.enabled.bg};

      & > svg {
        display: block;
        position: absolute;
        opacity: 0;
        height: 100%;
        width: 100%;

        & > path {
          vector-effect: non-scaling-stroke;
          stroke-width: 1.5px !important;
        }
      }
    }

    &:checked + span {
      background: ${color.default.enabled.fg};
      box-shadow: ${focusRingBorderStyle({
        color: color.default.enabled.fg,
        width: input.border.width,
      })};
      color: ${color.default.enabled.bg};
    }

    /* focus */
    &:not(:disabled):focus:focus-visible + span {
      box-shadow: ${focusRingStyle({focusRing})};
    }

    /* focus when checked - uses a different offset */
    &:not(:disabled):focus:focus-visible&:checked + span {
      box-shadow: ${focusRingStyle({focusRing: {width: 1, offset: 1}})};
    }

    &[data-error] + span {
      background-color: ${color.invalid.enabled.border};
      box-shadow: ${focusRingBorderStyle({
        width: input.border.width,
        color: color.invalid.enabled.bg2,
      })};
      color: ${color.default.disabled.fg};
    }
    &[data-error]&:checked + span {
      background-color: ${color.invalid.enabled.bg2};
      color: ${color.default.enabled.bg};
    }
    &[data-error]&:checked&:not(:disabled):focus:focus-visible + span {
      box-shadow: ${focusRingStyle({
        border: {width: input.border.width, color: color.invalid.readOnly.bg2},
        focusRing: {width: 1, offset: 1},
      })};
    }

    &:disabled + span {
      background-color: ${color.default.disabled.bg};
      box-shadow: ${focusRingBorderStyle({
        width: input.border.width,
        color: color.default.disabled.border,
      })};
      color: ${color.default.disabled.fg};
    }
    &:disabled&:checked + span {
      background-color: ${color.default.disabled.bg2};
    }

    &[data-read-only] + span {
      background-color: ${color.default.readOnly.bg};
      box-shadow: ${focusRingBorderStyle({
        width: input.border.width,
        color: color.default.readOnly.border,
      })};
      color: ${color.default.readOnly.fg};
    }

    &[data-read-only]&:checked + span {
      background-color: ${color.default.readOnly.bg2};
    }

    &:checked + span > svg:first-child {
      opacity: 1;
    }
    &:indeterminate + span > svg:last-child {
      opacity: 1;
    }
  `
}
