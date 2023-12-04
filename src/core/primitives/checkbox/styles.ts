import {getTheme_v2} from '@sanity/ui/theme'
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
  const {color, input, radius} = getTheme_v2(props.theme)
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
        color: color.input.default.enabled.border,
        width: input.border.width,
      })};
      border-radius: ${rem(radius[2])};
      line-height: 1;
      background-color: ${color.input.default.enabled.bg};

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
      background: ${color.input.default.enabled.fg};
      box-shadow: ${focusRingBorderStyle({
        color: color.input.default.enabled.fg,
        width: input.border.width,
      })};
      color: ${color.input.default.enabled.bg};
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
      background-color: ${color.input.invalid.enabled.border};
      box-shadow: ${focusRingBorderStyle({
        width: input.border.width,
        color: color.input.invalid.enabled.muted.bg,
      })};
      color: ${color.input.default.disabled.fg};
    }
    &[data-error]&:checked + span {
      background-color: ${color.input.invalid.enabled.muted.bg};
      color: ${color.input.default.enabled.bg};
    }
    &[data-error]&:checked&:not(:disabled):focus:focus-visible + span {
      box-shadow: ${focusRingStyle({
        border: {width: input.border.width, color: color.input.invalid.readOnly.muted.bg},
        focusRing: {width: 1, offset: 1},
      })};
    }

    &:disabled + span {
      background-color: ${color.input.default.disabled.bg};
      box-shadow: ${focusRingBorderStyle({
        width: input.border.width,
        color: color.input.default.disabled.border,
      })};
      color: ${color.input.default.disabled.fg};
    }
    &:disabled&:checked + span {
      background-color: ${color.input.default.disabled.muted.bg};
    }

    &[data-read-only] + span {
      background-color: ${color.input.default.readOnly.bg};
      box-shadow: ${focusRingBorderStyle({
        width: input.border.width,
        color: color.input.default.readOnly.border,
      })};
      color: ${color.input.default.readOnly.fg};
    }

    &[data-read-only]&:checked + span {
      background-color: ${color.input.default.readOnly.muted.bg};
    }

    &:checked + span > svg:first-child {
      opacity: 1;
    }
    &:indeterminate + span > svg:last-child {
      opacity: 1;
    }
  `
}
