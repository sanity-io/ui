import {css} from 'styled-components'
import {rem, ThemeProps} from '../../styles'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/internal'
import {cssVars} from '../../theme/lib/theme/color/cssVars'

export function checkboxBaseStyles(): ReturnType<typeof css> {
  return css`
    position: relative;
    display: inline-block;
  `
}

export function inputElementStyles(props: ThemeProps): ReturnType<typeof css> {
  const {theme} = props
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
        color: cssVars.default.border_base,
        width: input.border.width,
      })};
      border-radius: ${rem(radius[2])};
      line-height: 1;
      background-color: ${cssVars.default.bg_base};

      & > svg {
        display: block;
        position: absolute;
        opacity: 0;
        height: 100%;
        width: 100%;

        & > path {
          vector-effect: non-scaling-stroke;
          stroke-width: 1.2 !important;
        }
      }
    }
    &:checked + span {
      background: ${cssVars.default.text_secondary};
      box-shadow: ${focusRingBorderStyle({
        color: cssVars.default.text_secondary,
        width: input.border.width,
      })};
      color: ${cssVars.default.bg_base};
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
      background-color: ${cssVars.critical.border_base};
      box-shadow: ${focusRingBorderStyle({
        width: input.border.width,
        color: cssVars.critical.text_secondary,
      })};
      color: ${cssVars.default.text_secondary};
    }
    &[data-error]&:checked + span {
      background-color: ${cssVars.critical.text_secondary};
      color: ${cssVars.default.bg_base};
    }
    &[data-error]&:checked&:not(:disabled):focus:focus-visible + span {
      box-shadow: ${focusRingStyle({
        border: {width: input.border.width, color: cssVars.critical.text_secondary},
        focusRing: {width: 1, offset: 1},
      })};
    }

    &:disabled + span {
      background-color: ${cssVars.default.bg_tint};
      box-shadow: ${focusRingBorderStyle({
        width: input.border.width,
        color: cssVars.default.border_base,
      })};
      color: ${cssVars.default.text_secondary};
    }
    &:disabled&:checked + span {
      background-color: ${cssVars.default.border_base};
    }

    &[data-read-only] + span {
      background-color: ${cssVars.default.bg_tint};
      box-shadow: ${focusRingBorderStyle({
        width: input.border.width,
        color: cssVars.default.border_base,
      })};
      color: ${cssVars.default.text_secondary};
    }

    &[data-read-only]&:checked + span {
      background-color: ${cssVars.default.border_base};
    }

    &:checked + span > svg:first-child {
      opacity: 1;
    }
    &:indeterminate + span > svg:last-child {
      opacity: 1;
    }
  `
}
