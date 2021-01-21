import {css} from 'styled-components'
import {rem, ThemeProps} from '../../styles'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/internal'

export function checkboxBaseStyles() {
  return css`
    position: relative;
    display: inline-block;
  `
}

export function inputElementStyles(props: ThemeProps) {
  const {theme} = props
  const color = theme.sanity.color.input
  const {focusRing, input, radius} = theme.sanity

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
      background: ${color.default.enabled.bg};

      & > svg {
        display: block;
        position: absolute;
        opacity: 0;
        height: 100%;
        width: 100%;

        & > path {
          vector-effect: non-scaling-stroke;
          stroke-width: 2 !important;
        }
      }
    }

    &:not(:disabled):focus + span {
      box-shadow: ${focusRingStyle({
        border: {width: input.border.width, color: color.default.enabled.border},
        focusRing,
      })};
    }

    &:not(:disabled):focus:not(:focus-visible) + span {
      box-shadow: ${focusRingBorderStyle({
        color: color.default.enabled.border,
        width: input.border.width,
      })};
    }

    &:checked + span > svg:first-child {
      opacity: 1;
    }

    &:not([data-read-only]):disabled + span {
      background: ${color.default.disabled.bg};
      box-shadow: ${focusRingBorderStyle({
        width: input.border.width,
        color: color.default.disabled.border,
      })};
      color: ${color.default.disabled.fg};
    }

    &:indeterminate + span > svg:last-child {
      opacity: 1;
    }
  `
}
