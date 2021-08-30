import {CSSObject} from 'styled-components'
import {ThemeFontSize, ThemeFontKey} from '../../theme'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFontStyleProps} from './types'

/**
 * A utility function getting responsive font styles.
 * @internal
 */
export function responsiveFont(
  fontKey: ThemeFontKey,
  props: ResponsiveFontStyleProps & ThemeProps
): CSSObject[] {
  const {$size, $weight, theme} = props
  const {fonts, media} = theme.sanity
  const {family, sizes, weights, horizontalOffset} = fonts[fontKey]
  const fontWeight = ($weight && weights[$weight]) || weights.regular

  // @todo: make this configurable
  const defaultSize = sizes[2]

  const base: CSSObject = {
    position: 'relative',
    fontFamily: family,
    fontWeight,
    padding: '1px',
    margin: 0,

    '&:before': {
      content: '""',
      display: 'block',
      height: 0,
    },

    '&:after': {
      content: '""',
      display: 'block',
      height: 0,
    },

    '& > code, & > span': {
      display: 'block',
    },

    '&:not([hidden])': {
      display: 'block',
    },
  }

  const resp = responsive(media, getResponsiveProp($size), (sizeIndex) =>
    fontSize(sizes[sizeIndex] || defaultSize, horizontalOffset)
  )

  return [base, ...resp]
}

export function fontSize(size: ThemeFontSize, horizontalOffset?: number): CSSObject {
  const {ascenderHeight, descenderHeight, fontSize, iconSize, letterSpacing, lineHeight} = size
  const negHeight = ascenderHeight + descenderHeight
  const capHeight = lineHeight - negHeight
  const iconOffset = (capHeight - iconSize) / 2

  return {
    fontSize: rem(fontSize),
    lineHeight: `calc(${lineHeight} / ${fontSize})`,
    letterSpacing: rem(letterSpacing),
    transform: `translateY(${rem(descenderHeight)})`,

    '&:before': {
      marginTop: `calc(${rem(0 - negHeight)} - 1px)`,
    },

    '&:after': {
      marginBottom: '-1px',
    },

    '& > code, & > span': {
      margin: horizontalOffset ? `0 calc(${rem(0 - horizontalOffset * fontSize)} - 1px)` : '0 -1px',
    },

    '& [data-sanity-icon]': {
      fontSize: `calc(${iconSize} / 16 * 1rem)`,
      margin: [
        // top & bottom
        rem(iconOffset),
        // left & right
        horizontalOffset
          ? `calc(${rem(iconOffset)} + ${rem(horizontalOffset * fontSize)})`
          : rem(iconOffset),
      ].join(' '),
    },
  }
}
