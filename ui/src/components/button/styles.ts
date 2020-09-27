import {css} from 'styled-components'
import {Theme} from '../../theme'
import {ButtonMode, ButtonTone} from './types'

export function buttonBaseStyles() {
  return css`
    -webkit-font-smoothing: inherit;
    appearance: none;
    display: inline-block;
    font: inherit;
    border: 0;
    border-radius: 3px;
    outline: none;
    user-select: none;
    text-decoration: none;
    border: 0;
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    & > span {
      border-radius: inherit;
    }
  `
}

export function buttonColorStyles(props: {mode: ButtonMode; theme: Theme; tone: ButtonTone}) {
  const tone = props.theme.color.button.tones[props.tone || 'default']
  const mode = tone.modes[props.mode || 'default']

  return css`
    &:not([data-disabled='true']) {
      background: ${mode.enabled.bg};
      color: ${mode.enabled.fg};

      & > span {
        box-shadow: inset 0 0 0 1px ${mode.enabled.border};
      }

      &:focus {
        box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
      }

      @media (hover: hover) {
        &:hover {
          background: ${mode.hovered.bg};
          color: ${mode.hovered.fg};

          & > span {
            box-shadow: inset 0 0 0 1px ${mode.hovered.border};
          }
        }
      }
    }
  `
}
