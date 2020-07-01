import {css} from 'styled-components'
// import {Theme} from '../theme'
import {color} from '@sanity/color'

/* TODO 
  - Get colors from theme
*/

const inputColor = {
  enabled: {
    bg: color.white.hex,
    fg: color.black.hex,
    border: color.gray[200].hex,
    focused: color.blue[400].hex,
  },
  disabled: {
    bg: color.gray[50].hex,
    fg: color.gray[500].hex,
    border: color.gray[200].hex,
  },
}

const RADIO = {
  size: '1em',
  bg: inputColor.enabled.bg,
  fg: inputColor.enabled.fg,
  border: inputColor.disabled.border,
  focused: inputColor.enabled.focused,
  disabled: {
    bg: inputColor.disabled.bg,
    fg: inputColor.disabled.fg,
    border: inputColor.disabled.border,
  },
}

export function radioBaseStyles() {
  return css`
    position: relative;
    display: flex;
  `
}

export function inputElementStyles() {
  // Hide the input element, while still making it respond to focus
  return css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    outline: none;
    z-index: 1;
    padding: 0;
    margin: 0;

    /* Checkbox focus styles */
    &:focus + .radio {
      border-color: transparent;

      &::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        height: calc(100% + 4px);
        width: calc(100% + 4px);
        border: 2px solid ${RADIO.focused};
        border-radius: 100%;
        box-sizing: border-box;
        background: ${RADIO.bg};
      }
    }

    &:checked + .radio::after {
      opacity: 1;
      transform: scale(0.55);
    }

    &:disabled + .radio {
      border-color: ${RADIO.disabled.border};
      background: ${RADIO.disabled.bg};
      &::after {
        background: ${RADIO.disabled.fg};
      }
    }
  `
}

export function radioStyles() {
  return css`
    flex-shrink: 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${RADIO.size};
    width: ${RADIO.size};
    border: 1px solid ${RADIO.border};
    border-radius: ${RADIO.size};
    line-height: 1;
    background: ${RADIO.bg};

    &::after {
      position: absolute;
      content: '';
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      background: ${RADIO.fg};
      border-radius: 100%;
      opacity: 0;
      transform: scale(0.4);
    }
  `
}
