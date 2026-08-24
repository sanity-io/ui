import {CSSObject} from '../../../theme/system/css'
import {ThemeFontKey, ThemeFontSize} from '../../../theme/system/font'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_responsive, rem} from '../helpers'
import {ThemeProps} from '../types'
import {FontWeightStyleProps, ResponsiveFontSizeStyleProps} from './types'

/**
 * A utility function getting responsive font styles.
 * @internal
 */
export function responsiveFont(
  fontKey: ThemeFontKey,
  props: FontWeightStyleProps & ResponsiveFontSizeStyleProps & ThemeProps,
): CSSObject[] {
  const {$size, $weight} = props
  const {font, media} = getTheme_v2(props.theme)
  const {family, sizes, weights} = font[fontKey]
  const fontWeight = ($weight && weights[$weight]) || weights.regular

  // @todo: make this configurable
  const defaultSize = sizes[2]

  const base: CSSObject = {
    'position': 'relative',
    'fontFamily': family,
    'fontWeight': `${fontWeight}`,
    'padding': '1px 0',
    'margin': 0,

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

  // @TODO fix the real condition that is causing $size to be undefined sometimes
  if (!$size) {
    // @ts-expect-error: `warned` isn't typed, the underlying issue should be solved rather than typing it
    if (!responsiveFont.warned) {
      console.warn('No size specified for responsive font', {fontKey, $size, props, base})
      // @ts-expect-error: `warned` isn't typed, the underlying issue should be solved rather than typing it
      responsiveFont.warned = true
    }

    return [base]
  }

  const resp = _responsive(media, $size, (sizeIndex) => fontSize(sizes[sizeIndex] || defaultSize))

  return [base, ...resp]
}

function fontSize(size: ThemeFontSize): CSSObject {
  const {ascenderHeight, descenderHeight, fontSize, iconSize, letterSpacing, lineHeight} = size
  const negHeight = ascenderHeight + descenderHeight
  const capHeight = lineHeight - negHeight
  const iconOffset = (capHeight - iconSize) / 2
  const customIconSize = Math.floor((fontSize * 1.125) / 2) * 2 + 1
  const customIconOffset = (capHeight - customIconSize) / 2

  return {
    'fontSize': rem(fontSize),
    'lineHeight': `calc(${lineHeight} / ${fontSize})`,
    'letterSpacing': rem(letterSpacing),
    'transform': `translateY(${rem(descenderHeight)})`,

    '&:before': {
      marginTop: `calc(${rem(0 - negHeight)} - 1px)`,
    },

    '&:after': {
      marginBottom: '-1px',
    },

    // WebKit 199236: font-size on an SVG means page zoom does not scale 1em
    // width/height. Size default 1em axes with rem instead. Do not restore
    // fontSize on these selectors (SAPP-933).
    '& svg:not([data-sanity-icon])': {
      margin: rem(customIconOffset),
    },

    '& svg:not([data-sanity-icon])[width="1em"]': {
      width: rem(customIconSize),
    },

    '& svg:not([data-sanity-icon])[height="1em"]': {
      height: rem(customIconSize),
    },

    '& [data-sanity-icon]': {
      margin: rem(iconOffset),
    },

    '& [data-sanity-icon][width="1em"]': {
      width: rem(iconSize),
    },

    '& [data-sanity-icon][height="1em"]': {
      height: rem(iconSize),
    },
  }
}
