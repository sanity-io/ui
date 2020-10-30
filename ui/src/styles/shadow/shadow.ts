import {css} from 'styled-components'
import {getResponsiveProp, rem} from '../../styles'
import {BoxShadow, Theme} from '../../theme'
import {ThemeProps} from '../types'
import {ShadowProps} from './types'

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

export function shadow(props: ShadowProps & ThemeProps) {
  return getResponsiveProp(props.shadow).map((shadowIndex, mqIndex) => {
    if (mqIndex === 0) return _shadowStyles(props.theme, shadowIndex)

    return css`
      @media (min-width: ${rem(props.theme.media[mqIndex - 1])}) {
        ${_shadowStyles(props.theme, shadowIndex)}
      }
    `
  })
}
