import {css} from 'styled-components'
import {rem} from '../../styles'
import {Theme} from '../../theme'

export function checkboxBaseStyles() {
  return css`
    position: relative;
    display: inline-block;
  `
}

export function inputElementStyles(props: {theme: Theme}) {
  const {theme} = props
  const {input} = theme.sanity.color
  const {checkbox} = theme.sanity.input

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
      height: ${rem(checkbox.size)};
      width: ${rem(checkbox.size)};
      box-sizing: border-box;
      box-shadow: 0 0 0 1px ${input.default.enabled.border};
      border-radius: 3px;
      line-height: 1;
      background: ${input.default.enabled.bg};

      & > svg {
        display: block;
        position: absolute;
        opacity: 0;
        height: 100%;
        width: 100%;
        /* transition: 100ms opacity; */

        & > path {
          vector-effect: non-scaling-stroke;
          stroke-width: 2 !important;
        }
      }
    }

    &:focus + span {
      box-shadow: 0 0 0 2px var(--card-focus-ring-color);
    }

    &:checked + span > svg:first-child {
      opacity: 1;
    }

    &:disabled + span {
      background: ${input.default.disabled.bg};
      box-shadow: 0 0 0 1px ${input.default.disabled.border};
      color: ${input.default.disabled.fg};
    }

    &:indeterminate + span > svg:last-child {
      opacity: 1;
    }
  `
}
