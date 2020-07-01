import {css} from 'styled-components'
import {rem} from '../helpers'
import {Theme} from '../theme'
import {CardTone} from './types'

export function cardColorStyles(props: {theme: Theme; tone: CardTone}) {
  const tone = props.theme.color.card.tones[props.tone]

  return css`
    background: ${tone.bg};
    color: ${tone.fg};
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
