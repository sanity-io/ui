import {css} from 'styled-components'
import {rem} from '../helpers'
import {Theme} from '../theme'
import {CardTone} from './types'

export function cardColorStyles(props: {theme: Theme; tone: CardTone}) {
  const tone = props.theme.color.card.tones[props.tone]

  return css`
    background: ${tone.bg};
    color: ${tone.fg};

    /* Custom properties that may be used by other atoms */
    --card-bg-color: ${tone.bg};
    --card-focus-ring-color: ${tone.focusRing};
    --card-hairline-soft-color: ${tone.hairline.soft};
    --card-hairline-hard-color: ${tone.hairline.hard};
    --card-link-color: ${tone.link};
    --card-shadow-outline-color: ${tone.shadow.outline};
    --card-shadow-umbra-color: ${tone.shadow.umbra};
    --card-shadow-penumbra-color: ${tone.shadow.penumbra};
    --card-shadow-ambient-color: ${tone.shadow.ambient};
  `
}

export function cardRadiusStyles(props: {radius: number[]; theme: Theme}) {
  const {radius} = props.theme

  return css`
    ${props.radius.map((radiusIndex, mqIndex) => {
      if (mqIndex === 0)
        return css`
          border-radius: ${rem(radius[radiusIndex])};
        `

      return css`
        @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
          border-radius: ${rem(radius[radiusIndex])};
        }
      `
    })}
  `
}

function _shadowStyles(theme: Theme, shadowIndex: number) {
  const shadow = theme.shadows[shadowIndex]

  if (!shadow) return null

  const {umbra, penumbra, ambient} = shadow

  return css`
    box-shadow: 0 0 0 1px var(--card-shadow-outline-color),
      ${umbra[0]}px ${umbra[1]}px ${umbra[2]}px ${umbra[3]}px var(--card-shadow-umbra-color),
      ${penumbra[0]}px ${penumbra[1]}px ${penumbra[2]}px ${penumbra[3]}px
        var(--card-shadow-penumbra-color),
      ${ambient[0]}px ${ambient[1]}px ${ambient[2]}px ${ambient[3]}px
        var(--card-shadow-ambient-color);
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
