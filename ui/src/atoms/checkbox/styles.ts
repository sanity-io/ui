import {css} from 'styled-components'
import {rem} from '../../styles'
import {ColorSchemeKey, Theme} from '../../theme'

export function checkboxBaseStyles() {
  return css`
    position: relative;
    display: inline-block;
  `
}

export function inputElementStyles({scheme, theme}: {scheme: ColorSchemeKey; theme: Theme}) {
  const _scheme = theme.color[scheme] || theme.color.light
  const color = _scheme.input
  const tone = color.tones.default
  const {checkbox} = theme.input

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
      box-shadow: 0 0 0 1px ${tone.enabled.border};
      border-radius: 3px;
      line-height: 1;
      background: ${tone.enabled.bg};

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
      background: ${tone.disabled.bg};
      box-shadow: 0 0 0 1px ${tone.disabled.border};
      color: ${tone.disabled.fg};
    }

    &:indeterminate + span > svg:last-child {
      opacity: 1;
    }
  `
}
