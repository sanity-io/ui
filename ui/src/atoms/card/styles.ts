import {css} from 'styled-components'
import {rem} from '../../styles'
import {BoxShadow, ColorSchemeKey, Theme} from '../../theme'
import {CardTone} from './types'

export function cardBaseStyles() {
  return css`
    &:is(button) {
      -webkit-font-smoothing: inherit;
      appearance: none;
      border: 0;
      text-align: inherit;
      outline: none;
    }
  `
}

export function cardColorStyles(props: {theme: Theme; tone: CardTone; scheme: ColorSchemeKey}) {
  const {scheme, theme} = props
  const tone = theme.color[scheme].card.tones[props.tone]

  return css`
    /* Custom properties that may be used by other atoms */
    --card-bg-color: ${tone.enabled.bg};
    --card-fg-color: ${tone.enabled.fg};
    --card-muted-fg-color: ${tone.enabled.muted.fg};
    --card-focus-ring-color: ${tone.enabled.focusRing};
    --card-hairline-soft-color: ${tone.enabled.hairline.soft};
    --card-hairline-hard-color: ${tone.enabled.hairline.hard};
    --card-link-color: ${tone.enabled.link};
    --card-shadow-outline-color: ${tone.enabled.shadow.outline};
    --card-shadow-umbra-color: ${tone.enabled.shadow.umbra};
    --card-shadow-penumbra-color: ${tone.enabled.shadow.penumbra};
    --card-shadow-ambient-color: ${tone.enabled.shadow.ambient};

    background-color: var(--card-bg-color);
    color: var(--card-fg-color);

    &:is(button):not(:disabled) {
      @media (hover: hover) {
        &:hover {
          --card-bg-color: ${tone.hovered.bg};
          --card-fg-color: ${tone.hovered.fg};
          --card-muted-fg-color: ${tone.hovered.muted.fg};
          --card-focus-ring-color: ${tone.hovered.focusRing};
          --card-hairline-soft-color: ${tone.hovered.hairline.soft};
          --card-hairline-hard-color: ${tone.hovered.hairline.hard};
          --card-link-color: ${tone.hovered.link};
          --card-shadow-outline-color: ${tone.hovered.shadow.outline};
          --card-shadow-umbra-color: ${tone.hovered.shadow.umbra};
          --card-shadow-penumbra-color: ${tone.hovered.shadow.penumbra};
          --card-shadow-ambient-color: ${tone.hovered.shadow.ambient};
        }

        &:active {
          --card-bg-color: ${tone.pressed.bg};
          --card-fg-color: ${tone.pressed.fg};
          --card-muted-fg-color: ${tone.pressed.muted.fg};
          --card-focus-ring-color: ${tone.pressed.focusRing};
          --card-hairline-soft-color: ${tone.pressed.hairline.soft};
          --card-hairline-hard-color: ${tone.pressed.hairline.hard};
          --card-link-color: ${tone.pressed.link};
          --card-shadow-outline-color: ${tone.pressed.shadow.outline};
          --card-shadow-umbra-color: ${tone.pressed.shadow.umbra};
          --card-shadow-penumbra-color: ${tone.pressed.shadow.penumbra};
          --card-shadow-ambient-color: ${tone.pressed.shadow.ambient};
        }
      }
    }
  `
}

function toBoxShadow(shadow: BoxShadow, color: string) {
  return `${shadow.map((v) => `${v}px`).join(' ')} ${color}`
}

function _shadowStyles(theme: Theme, shadowIndex: number) {
  const shadow = theme.shadows[shadowIndex]

  if (!shadow) return null

  const outline = `0 0 0 1px var(--card-shadow-outline-color)`
  const umbra = toBoxShadow(shadow.umbra, 'var(--card-shadow-umbra-color)')
  const penumbra = toBoxShadow(shadow.penumbra, 'var(--card-shadow-penumbra-color)')
  const ambient = toBoxShadow(shadow.ambient, 'var(--card-shadow-ambient-color)')

  return css`
    box-shadow: ${outline}, ${umbra}, ${penumbra}, ${ambient};
  `
}

export function cardShadowStyles(props: {shadow: number[]; theme: Theme}) {
  return props.shadow.map((shadowIndex, mqIndex) => {
    if (mqIndex === 0) return _shadowStyles(props.theme, shadowIndex)

    return css`
      @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
        ${_shadowStyles(props.theme, shadowIndex)}
      }
    `
  })
}
