import {css} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {rem, responsiveRules} from '../helpers'
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
): ReturnType<typeof css> {
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

  return responsiveRules(media, _padding, (_, i) => {
    const size = font.text.sizes[_fontSize[i]] || font.text.sizes[2]
    const emSize = size.lineHeight - size.ascenderHeight - size.descenderHeight
    const p = space[_padding[i]]
    const s = space[_space[i]]

    return css`
      padding-top: ${rem(p - size.ascenderHeight)};
      padding-right: ${rem($iconRight ? p + emSize + s : p)};
      padding-bottom: ${rem(p - size.descenderHeight)};
      padding-left: ${rem($iconLeft ? p + emSize + s : p)};
    `
  })
}

export function responsiveInputPaddingIconRightStyle(
  props: {
    $fontSize: number[]
    $padding: number[]
    $space: number[]
  } & ThemeProps,
): ReturnType<typeof css> {
  return responsiveInputPaddingStyle({...props, $iconRight: true})
}
