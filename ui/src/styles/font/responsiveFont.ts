import {CSSObject} from 'styled-components'
import {ThemeFontSize} from '../../theme'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {FontKey, ResponsiveFontProps} from './types'

export function responsiveFont(fontKey: FontKey, props: ResponsiveFontProps & ThemeProps) {
  const {size, theme} = props
  const {family, sizes, weights} = theme.fonts[fontKey]
  const fontWeight = weights[props.weight || 'regular']

  // @todo: make this configurable
  const defaultSize = sizes[2]

  const ret = [
    {
      position: 'relative',
      fontFamily: family,
      fontWeight,
      display: 'block',
      padding: '1px 0',
      margin: 0,
    },
    ...responsive(
      theme.media,
      getResponsiveProp(size).map((sizeIndex) => fontSize(sizes[sizeIndex] || defaultSize))
    ),
  ]

  return ret
}

export function fontSize(size: ThemeFontSize): CSSObject {
  const negHeight = size.ascenderHeight + size.descenderHeight
  const capHeight = size.lineHeight - negHeight

  return {
    fontSize: rem(size.fontSize),
    lineHeight: rem(size.lineHeight),
    letterSpacing: rem(size.letterSpacing),
    transform: `translateY(${rem(size.descenderHeight)})`,

    '&:before': {
      marginTop: `calc(${rem(0 - negHeight)} - 1px)`,
    },

    '&:after': {
      marginBottom: '-1px',
    },

    '& > svg': {
      fontSize: rem(size.iconSize),
      margin: rem((capHeight - size.iconSize) / 2),
    },
  }
}
