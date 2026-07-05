import {CSSObject, getTheme_v2, ThemeBoxShadow, ThemeShadow} from '@sanity/ui/theme'

import {EMPTY_RECORD} from '../../constants'
import {_responsive, rem} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveShadowStyleProps} from './types'

function toBoxShadow(shadow: ThemeBoxShadow, color: string) {
  return `${shadow.map(rem).join(' ')} ${color}`
}

function shadowStyle(shadow: ThemeShadow | null, outlineWidth: number = 1): CSSObject {
  if (!shadow) return EMPTY_RECORD

  const outline = `0 0 0 ${rem(outlineWidth)} var(--card-shadow-outline-color)`
  const umbra = toBoxShadow(shadow.umbra, 'var(--card-shadow-umbra-color)')
  const penumbra = toBoxShadow(shadow.penumbra, 'var(--card-shadow-penumbra-color)')
  const ambient = toBoxShadow(shadow.ambient, 'var(--card-shadow-ambient-color)')

  return {boxShadow: `${outline}, ${umbra}, ${penumbra}, ${ambient}`}
}

export function responsiveShadowStyle(props: ResponsiveShadowStyleProps & ThemeProps): CSSObject[] {
  const {card, media, shadow} = getTheme_v2(props.theme)

  return _responsive(media, props.$shadow, (index) =>
    shadowStyle(shadow[index], card.shadow.outline),
  )
}
