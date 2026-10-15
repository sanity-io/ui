import {css} from 'styled-components'

import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_ruleSet, rem, responsiveRules} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFlexStyleProps} from './types'

const RULES = _ruleSet(css<ResponsiveFlexStyleProps & ThemeProps>`
  &&:not([hidden]) {
    display: flex;
  }

  ${responsiveFlexAlignStyle}
  ${responsiveFlexGapStyle}
  ${responsiveFlexWrapStyle}
  ${responsiveFlexJustifyStyle}
  ${responsiveFlexDirectionStyle}
`)

export function responsiveFlexStyle(): CSSObject[] {
  return RULES
}

function responsiveFlexAlignStyle(props: ResponsiveFlexStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$align,
    (align) => css`
      align-items: ${align};
    `,
  )
}

function responsiveFlexGapStyle(props: ResponsiveFlexStyleProps & ThemeProps) {
  const {media, space} = getTheme_v2(props.theme)

  return responsiveRules(media, props.$gap, (gap) =>
    gap
      ? css`
          gap: ${rem(space[gap])};
        `
      : null,
  )
}

function responsiveFlexWrapStyle(props: ResponsiveFlexStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$wrap,
    (wrap) => css`
      flex-wrap: ${wrap};
    `,
  )
}

function responsiveFlexJustifyStyle(props: ResponsiveFlexStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$justify,
    (justify) => css`
      justify-content: ${justify};
    `,
  )
}

function responsiveFlexDirectionStyle(props: ResponsiveFlexStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$direction,
    (direction) => css`
      flex-direction: ${direction};
    `,
  )
}
