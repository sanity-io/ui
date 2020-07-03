import {css} from 'styled-components'
import {Theme} from '../theme'
import {rem} from '../helpers'

export function checkboxBaseStyles() {
  return css`
    position: relative;
    display: inline-block;
  `
}

export function inputElementStyles(props: {theme: Theme}) {
  const {input} = props.theme.color
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
    &:focus + [data-name='representation'] {
      /* @todo: Use focus ring color from card theme */
      box-shadow: 0 0 0 1px #fff, 0 0 0 3px #4e91fc;
    }

    &:checked + [data-name='representation'] {
      /* Checkmark styles when checkbox is checked */
      .checkmark {
        opacity: 1;
      }
    }

    &:disabled + [data-name='representation'] {
      /* Checkbox styles when checkbox is disabled */
      background: ${input.tones.default.disabled.bg};
      box-shadow: 0 0 0 1px ${input.tones.default.disabled.border};
      color: ${input.tones.default.disabled.fg};
    }

    &:indeterminate + [data-name='representation'] {
      /* Checkmark style when checkbox has no value */
      .indeterminate {
        display: block;
        opacity: 1;
        transform: scale(0.6);
      }
    }
  `
}

export function representationStyles(props: {theme: Theme}) {
  const {checkbox} = props.theme.input
  const {input} = props.theme.color
  /* Styles for the checkbox wrapper */
  return css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${rem(checkbox.size)};
    width: ${rem(checkbox.size)};
    box-sizing: border-box;
    box-shadow: 0 0 0 1px ${input.tones.default.enabled.border};
    border-radius: 3px;
    line-height: 1;
    background: ${input.tones.default.enabled.bg};
  `
}

export function markStyles() {
  return css`
    position: absolute;
    transform: scale(0.8);
    opacity: 0;
    flex: 1;
    height: 100%;
    width: 100%;
  `
}
