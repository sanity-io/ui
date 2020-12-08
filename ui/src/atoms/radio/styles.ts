import {css} from 'styled-components'
import {rem, ThemeProps} from '../../styles'
import {borderStyle, focusRingStyle} from '../../styles/_internal/focusRing'

export function radioBaseStyles() {
  return css`
    position: relative;
    &&:not([hidden]) {
      display: inline-block;
    }
  `
}

export function inputElementStyles({theme}: ThemeProps) {
  const color = theme.sanity.color.input
  const {focusRing, input} = theme.sanity
  const dist = (input.radio.size - input.radio.markSize) / 2

  return css`
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    outline: none;
    z-index: 1;
    padding: 0;
    margin: 0;
    border-radius: ${rem(input.radio.size / 2)};

    & + span {
      display: block;
      position: relative;
      height: ${rem(input.radio.size)};
      width: ${rem(input.radio.size)};
      border-radius: ${rem(input.radio.size / 2)};
      background: ${color.default.enabled.bg};
      box-shadow: ${borderStyle(input, color.default.enabled.border)};

      &::after {
        content: '';
        position: absolute;
        top: ${rem(dist)};
        left: ${rem(dist)};
        height: ${rem(input.radio.markSize)};
        width: ${rem(input.radio.markSize)};
        border-radius: ${rem(input.radio.markSize / 2)};
        background: ${color.default.enabled.fg};
        opacity: 0;
      }
    }

    &:focus + span {
      box-shadow: ${focusRingStyle(true, focusRing, input, color.default.enabled.border)};
    }

    &:checked + span::after {
      opacity: 1;
    }

    &:disabled + span {
      box-shadow: 0 0 0 1px ${color.default.disabled.border};
      background: ${color.default.disabled.bg};

      &::after {
        background: ${color.default.disabled.fg};
      }
    }
  `
}
