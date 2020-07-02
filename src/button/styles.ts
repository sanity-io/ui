import {css} from 'styled-components'
import {Theme} from '../theme'
import {ButtonTone} from './types'

export function buttonBaseStyles() {
  return css`
    -webkit-font-smoothing: inherit;
    appearance: none;
    display: inline-block;
    font: inherit;
    border: 0;
    margin: 0;
    border-radius: 3px;
    outline: none;
    user-select: none;
    text-decoration: none;
  `
}

export function buttonColorStyles(props: {theme: Theme; tone: ButtonTone}) {
  const tone = props.theme.color.button.tones[props.tone]

  return css`
    background: ${tone.enabled.bg};
    color: ${tone.enabled.fg};

    &:focus {
      box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
    }

    @media (hover: hover) {
      &:hover {
        background: ${tone.hovered.bg};
        color: ${tone.hovered.fg};
      }
    }
  `
}
