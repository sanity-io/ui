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

const CHECKBOX = {
  size: '1em',
  bg: inputColor.enabled.bg,
  border: inputColor.enabled.border,
  focused: inputColor.enabled.focused,
  disabled: {
    bg: inputColor.disabled.bg,
    fg: inputColor.disabled.fg,
    border: inputColor.disabled.border,
  },
}

export function checkboxBaseStyles() {
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
    &:focus + .wrapper {
      border-color: transparent;
      &::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        height: calc(100% + 4px);
        width: calc(100% + 4px);
        border: 2px solid ${CHECKBOX.focused};
        border-radius: 5px;
        box-sizing: border-box;
        background: ${CHECKBOX.bg};
      }
    }

    &:checked + .wrapper {
      /* Checkmark styles when checkbox is checked */
      .checkmark {
        opacity: 1;
      }
    }

    &:disabled + .wrapper {
      /* Checkbox styles when checkbox is disabled */
      background: ${CHECKBOX.disabled.bg};
      border-color: ${CHECKBOX.disabled.border};
      color: ${CHECKBOX.disabled.fg};
    }

    &:indeterminate + .wrapper {
      /* Checkmark style when checkbox has no value */
      .indeterminate {
        display: block;
        opacity: 1;
        transform: scale(0.6);
      }
    }
  `
}

export function wrapperStyles() {
  /* Styles for the checkbox wrapper */
  return css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${CHECKBOX.size};
    width: ${CHECKBOX.size};
    border: 1px solid ${CHECKBOX.border};
    border-radius: 3px;
    margin-top: 1px;
    line-height: 1;
    background: ${CHECKBOX.bg};
  `
}

export function markStyles() {
  return css`
    position: absolute;
    top: calc((100% - ${CHECKBOX.size}) / 2);
    left: calc((100% - ${CHECKBOX.size}) / 2);
    transform: scale(0.8);
    opacity: 0;
    flex: 1;
    height: ${CHECKBOX.size};
    width: ${CHECKBOX.size};
  `
}
