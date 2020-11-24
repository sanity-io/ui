import {css} from 'styled-components'
import {Theme, ThemeCardStateColor} from '../../theme'
import {CardColorProps} from './types'

export function card(props: CardColorProps & {theme: Theme}) {
  return [cardBaseStyles, cardColorStyles(props)]
}

export function cardBaseStyles() {
  return css`
    &:is(button) {
      -webkit-font-smoothing: inherit;
      appearance: none;
      outline: none;
      font: inherit;
      text-align: inherit;
      border: 0;
      width: stretch;
    }

    &:is(a) {
      text-decoration: none;
    }

    &:is(pre) {
      font: inherit;
    }
  `
}

function vars(color: ThemeCardStateColor) {
  // Custom properties that may be used by other atoms
  return css`
    --card-bg-color: ${color.bg};
    --card-fg-color: ${color.fg};
    --card-focus-ring-color: ${color.focusRing};
    --card-muted-fg-color: ${color.muted.fg};
    --card-accent-fg-color: ${color.accent.fg};
    --card-hairline-soft-color: ${color.hairline.soft};
    --card-hairline-hard-color: ${color.hairline.hard};
    --card-link-color: ${color.link};
    --card-shadow-outline-color: ${color.shadow.outline};
    --card-shadow-umbra-color: ${color.shadow.umbra};
    --card-shadow-penumbra-color: ${color.shadow.penumbra};
    --card-shadow-ambient-color: ${color.shadow.ambient};
  `
}

export function cardColorStyles(props: CardColorProps & {theme: Theme}) {
  const {scheme, theme} = props
  const _scheme = theme.color[scheme] || theme.color.light
  const _tone = _scheme.card.tones[props.tone] || _scheme.card.tones.default

  return css`
    ${vars(_tone.enabled)}

    background-color: var(--card-bg-color);
    color: var(--card-fg-color);

    &:is(button) {
      &:disabled {
        ${vars(_tone.disabled)}
      }

      &:not(:disabled) {
        @media (hover: hover) {
          &:hover {
            ${vars(_tone.hovered)}
          }

          &:active {
            ${vars(_tone.pressed)}
          }
        }

        &:focus-visible {
          ${vars(_tone.selected)}
        }

        [aria-selected='true'] > & {
          ${vars(_tone.selected)}
        }
      }
    }

    &:is(a) {
      &[data-disabled] {
        ${vars(_tone.disabled)}
      }

      &:not([data-disabled]) {
        @media (hover: hover) {
          outline: none;

          &:hover {
            ${vars(_tone.hovered)}
          }

          &:active {
            ${vars(_tone.pressed)}
          }
        }

        &:focus-visible {
          ${vars(_tone.selected)}
        }

        [aria-selected='true'] > & {
          ${vars(_tone.selected)}
        }
      }
    }
  `
}
