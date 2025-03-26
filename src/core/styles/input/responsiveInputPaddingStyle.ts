import {CSSObject, getTheme_v2} from '@sanity/ui/theme'

import {_responsive, rem} from '../helpers'
import {ThemeProps} from '../types'

export interface TextInputResponsivePaddingStyleProps {
  $fontSize: number[]
  $iconLeft?: boolean
  $iconRight?: boolean
  $padding: number[]
  $space: number[]
}

export function responsiveInputPaddingStyle(
  props: TextInputResponsivePaddingStyleProps & ThemeProps,
): CSSObject[] {
  const {$fontSize, $iconLeft, $iconRight, $padding, $space} = props
  const {font, media, space} = getTheme_v2(props.theme)
  const len = Math.max($padding.length, $space.length, $fontSize.length)
  const _padding: number[] = []
  const _space: number[] = []
  const _fontSize: number[] = []

  for (let i = 0; i < len; i += 1) {
    _fontSize[i] = $fontSize[i] === undefined ? _fontSize[i - 1] : $fontSize[i]
    _padding[i] = $padding[i] === undefined ? _padding[i - 1] : $padding[i]
    _space[i] = $space[i] === undefined ? _space[i - 1] : $space[i]
  }

  return _responsive(media, _padding, (_, i) => {
    const size = font.text.sizes[_fontSize[i]] || font.text.sizes[2]
    const emSize = size.lineHeight - size.ascenderHeight - size.descenderHeight
    const p = space[_padding[i]]
    const s = space[_space[i]]

    const styles = {
      paddingTop: rem(p - size.ascenderHeight),
      paddingRight: rem(p),
      paddingBottom: rem(p - size.descenderHeight),
      paddingLeft: rem(p),
    }

    if ($iconRight) styles.paddingRight = rem(p + emSize + s)
    if ($iconLeft) styles.paddingLeft = rem(p + emSize + s)

    return styles
  })
}

export function responsiveInputPaddingIconsStyle(
  props: {
    $fontSize: number[]
    $padding: number[]
    $space: number[]
  } & ThemeProps,
): CSSObject[] {
  return responsiveInputPaddingStyle({...props, $iconLeft: true, $iconRight: true})
}

export function responsiveInputPaddingIconLeftStyle(
  props: {
    $fontSize: number[]
    $padding: number[]
    $space: number[]
  } & ThemeProps,
): CSSObject[] {
  return responsiveInputPaddingStyle({...props, $iconLeft: true})
}

export function responsiveInputPaddingIconRightStyle(
  props: {
    $fontSize: number[]
    $padding: number[]
    $space: number[]
  } & ThemeProps,
): CSSObject[] {
  return responsiveInputPaddingStyle({...props, $iconRight: true})
}
