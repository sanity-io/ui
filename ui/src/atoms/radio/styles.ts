import {css} from 'styled-components'
import {rem} from '../../styles'
import {Theme} from '../../theme'

export function radioBaseStyles() {
  return css`
    position: relative;
    display: inline-block;
  `
}

export function inputElementStyles(props: {theme: Theme}) {
  const {input} = props.theme.color.light
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
      box-shadow: 0 0 0 1px #fff, 0 0 0 3px #4e91fc;
    }

    &:checked + [data-name='representation']::after {
      opacity: 1;
    }

    &:disabled + [data-name='representation'] {
      box-shadow: 0 0 0 1px ${input.tones.default.disabled.border};
      background: ${input.tones.default.disabled.bg};
      &::after {
        background: ${input.tones.default.disabled.fg};
      }
    }
  `
}

export function representationStyles(props: {theme: Theme}) {
  const {radio} = props.theme.input
  const {input} = props.theme.color.light

  return css`
    flex-shrink: 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${rem(radio.size)};
    width: ${rem(radio.size)};
    box-shadow: 0 0 0 1px ${input.tones.default.enabled.border};
    border-radius: ${rem(radio.size)};
    line-height: 1;
    background: ${input.tones.default.enabled.bg};

    &::after {
      position: absolute;
      content: '';
      height: 100%;
      width: 100%;
      background: ${input.tones.default.enabled.fg};
      border-radius: 100%;
      opacity: 0;
      transform: scale(0.5);
    }
  `
}
