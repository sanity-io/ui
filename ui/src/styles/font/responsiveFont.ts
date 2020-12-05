import {CSSObject} from 'styled-components'
import {ThemeFontSize, ThemeFontKey} from '../../theme'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFontProps} from './types'

export function responsiveFont(
  fontKey: ThemeFontKey,
  props: ResponsiveFontProps & ThemeProps
): CSSObject[] {
  const {size, theme, weight} = props
  const {fonts, media} = theme.sanity
  const {family, sizes, weights} = fonts[fontKey]
  const fontWeight = (weight && weights[weight]) || weights.regular

  // @todo: make this configurable
  const defaultSize = sizes[2]

  const base = {
    position: 'relative',
    fontFamily: family,
    fontWeight,
    padding: '1px 0',
    margin: 0,

    // '&:before': {
    //   content: '',
    //   display: 'block',
    //   height: 0,
    // },

    // '&:after': {
    //   content: '',
    //   display: 'block',
    //   height: 0,
    // },

    '&&:not([hidden])': {
      display: 'block',
    },
  } as CSSObject

  const resp = responsive(media, getResponsiveProp(size), (sizeIndex) =>
    fontSize(sizes[sizeIndex] || defaultSize)
  )

  return [base, ...resp]
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

    '& [data-sanity-icon]': {
      fontSize: rem(size.iconSize),
      margin: rem((capHeight - size.iconSize) / 2),
    },
  }
}
