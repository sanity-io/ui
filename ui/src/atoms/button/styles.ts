import {css} from 'styled-components'
import {ThemeColorSchemeKey, Theme} from '../../theme'
import {ButtonMode, ButtonTone} from './types'

export function buttonBaseStyles() {
  return css`
    -webkit-font-smoothing: inherit;
    appearance: none;
    display: inline-flex;
    align-items: center;
    font: inherit;
    border: 0;
    outline: none;
    user-select: none;
    text-decoration: none;
    border: 0;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    text-align: left;
    /* width: stretch; */

    & > span {
      display: block;
      flex: 1;
      min-width: 0;
      border-radius: inherit;
    }

    &::-moz-focus-inner {
      border: 0;
      padding: 0;
    }
  `
}

export function buttonColorStyles(props: {
  uiMode: ButtonMode
  scheme: ThemeColorSchemeKey
  theme: Theme
  tone: ButtonTone
}) {
  const {scheme, theme, uiMode} = props
  const _scheme = theme.color[scheme] || theme.color.light
  const _tone = _scheme.button.tones[props.tone] || _scheme.button.tones.default
  const mode = _tone.modes[uiMode] || _tone.modes.default

  return css`
    &:not([data-disabled='true']) {
      --card-bg-color: ${mode.enabled.bg};
      --card-fg-color: ${mode.enabled.fg};

      background-color: var(--card-bg-color);
      color: var(--card-fg-color);

      & > span {
        box-shadow: inset 0 0 0 1px ${mode.enabled.border};
      }

      &:focus {
        box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color);
      }

      &:focus:not(:focus-visible) {
        box-shadow: none;
      }

      @media (hover: hover) {
        &:hover {
          --card-bg-color: ${mode.hovered.bg};
          --card-fg-color: ${mode.hovered.fg};
          text-decoration: none;

          & > span {
            box-shadow: inset 0 0 0 1px ${mode.hovered.border};
          }
        }

        &:active {
          --card-bg-color: ${mode.pressed.bg};
          --card-fg-color: ${mode.pressed.fg};

          & > span {
            box-shadow: inset 0 0 0 1px ${mode.pressed.border};
          }
        }

        &[data-selected] {
          --card-bg-color: ${mode.selected.bg};
          --card-fg-color: ${mode.selected.fg};

          & > span {
            box-shadow: inset 0 0 0 1px ${mode.selected.border};
          }
        }
      }
    }
  `
}
