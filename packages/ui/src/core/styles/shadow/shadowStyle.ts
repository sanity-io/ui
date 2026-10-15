import {css} from 'styled-components'

import {ThemeBoxShadow, ThemeShadow} from '../../../theme/system/shadow'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {rem, responsiveRules} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveShadowStyleProps} from './types'

function toBoxShadow(shadow: ThemeBoxShadow, color: string) {
  return `${shadow.map(rem).join(' ')} ${color}`
}

function shadowStyle(shadow: ThemeShadow | null, outlineWidth: number = 1) {
  if (!shadow) return null

  const outline = `0 0 0 ${rem(outlineWidth)} var(--card-shadow-outline-color)`
  const umbra = toBoxShadow(shadow.umbra, 'var(--card-shadow-umbra-color)')
  const penumbra = toBoxShadow(shadow.penumbra, 'var(--card-shadow-penumbra-color)')
  const ambient = toBoxShadow(shadow.ambient, 'var(--card-shadow-ambient-color)')

  return css`
    box-shadow: ${outline}, ${umbra}, ${penumbra}, ${ambient};
  `
}

export function responsiveShadowStyle(
  props: ResponsiveShadowStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {card, media, shadow} = getTheme_v2(props.theme)

  return responsiveRules(media, props.$shadow, (index) =>
    shadowStyle(shadow[index], card.shadow.outline),
  )
}
