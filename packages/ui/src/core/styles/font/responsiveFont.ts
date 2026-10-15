import {css} from 'styled-components'

import {CSSObject} from '../../../theme/system/css'
import {ThemeFontKey, ThemeFontSize} from '../../../theme/system/font'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_ruleSet, rem, responsiveRules} from '../helpers'
import {ThemeProps} from '../types'
import {FontWeightStyleProps, ResponsiveFontSizeStyleProps} from './types'

const FONT_BOX_STYLE = css`
  padding: 1px 0;
  margin: 0;

  &:before {
    content: '';
    display: block;
    height: 0;
  }

  &:after {
    content: '';
    display: block;
    height: 0;
  }

  & > code,
  & > span {
    display: block;
  }

  &:not([hidden]) {
    display: block;
  }
`

/**
 * A utility function getting responsive font styles.
 * @internal
 */
export function responsiveFont(
  fontKey: ThemeFontKey,
  props: FontWeightStyleProps & ResponsiveFontSizeStyleProps & ThemeProps,
): CSSObject[] {
  const {$size} = props
  const base = css`
    ${_fontBase(fontKey, props)}
    ${_fontWeight(fontKey, props)}
  `

  // @TODO fix the real condition that is causing $size to be undefined sometimes
  if (!$size) {
    // @ts-expect-error: `warned` isn't typed, the underlying issue should be solved rather than typing it
    if (!responsiveFont.warned) {
      console.warn('No size specified for responsive font', {fontKey, $size, props, base})
      // @ts-expect-error: `warned` isn't typed, the underlying issue should be solved rather than typing it
      responsiveFont.warned = true
    }

    return _ruleSet(base)
  }

  return _ruleSet(css`
    ${base}
    ${_responsiveFontSize(fontKey, props)}
  `)
}

/**
 * @internal
 */
export function _fontBase(fontKey: ThemeFontKey, props: ThemeProps): ReturnType<typeof css> {
  const {font} = getTheme_v2(props.theme)

  return css`
    position: relative;
    font-family: ${font[fontKey].family};
    ${FONT_BOX_STYLE}
  `
}

/**
 * @internal
 */
export function _fontWeight(
  fontKey: ThemeFontKey,
  props: FontWeightStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {weights} = getTheme_v2(props.theme).font[fontKey]

  return css`
    font-weight: ${(props.$weight && weights[props.$weight]) || weights.regular};
  `
}

/**
 * @internal
 */
export function _responsiveFontSize(
  fontKey: ThemeFontKey,
  props: ResponsiveFontSizeStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {font, media} = getTheme_v2(props.theme)
  const {sizes} = font[fontKey]

  return responsiveRules(media, props.$size, (sizeIndex) => fontSize(sizes[sizeIndex] || sizes[2]))
}

function fontSize(size: ThemeFontSize) {
  const {ascenderHeight, descenderHeight, fontSize, iconSize, letterSpacing, lineHeight} = size
  const negHeight = ascenderHeight + descenderHeight
  const capHeight = lineHeight - negHeight
  const iconOffset = (capHeight - iconSize) / 2
  const customIconSize = Math.floor((fontSize * 1.125) / 2) * 2 + 1
  const customIconOffset = (capHeight - customIconSize) / 2

  return css`
    font-size: ${rem(fontSize)};
    line-height: calc(${lineHeight} / ${fontSize});
    letter-spacing: ${rem(letterSpacing)};
    transform: translateY(${rem(descenderHeight)});

    &:before {
      margin-top: calc(${rem(0 - negHeight)} - 1px);
    }

    &:after {
      margin-bottom: -1px;
    }

    & svg:not([data-sanity-icon]) {
      font-size: calc(${customIconSize} / 16 * 1rem);
      margin: ${rem(customIconOffset)};
    }

    & [data-sanity-icon] {
      font-size: calc(${iconSize} / 16 * 1rem);
      margin: ${rem(iconOffset)};
    }
  `
}
