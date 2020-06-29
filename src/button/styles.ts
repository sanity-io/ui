import {css} from 'styled-components'
import {Theme} from '../theme'
import {ButtonTone} from './types'

export function buttonBaseStyles() {
  return css`
    -webkit-appearance: none;
    appearance: none;
    font: inherit;
    border: 0;
    padding: 1em;
    border-radius: 3px;
  `
}

export function buttonColorStyles(props: {theme: Theme; tone?: ButtonTone}) {
  const tone = props.theme.color.button.tones[props.tone || 'default']

  return css`
    background: ${tone.enabled.bg};
    color: ${tone.enabled.fg};
  `
}
