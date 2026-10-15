import {Property} from 'csstype'
import {css} from 'styled-components'

import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_ruleSet, responsiveRules} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveBoxStyleProps} from './types'

const BASE_STYLE = css`
  &[data-as='ul'],
  &[data-as='ol'] {
    list-style: none;
  }
`

const BOX_SIZING: {[key: string]: Property.BoxSizing} = {
  content: 'content-box',
  border: 'border-box',
}

const BOX_HEIGHT = {
  stretch: 'stretch',
  fill: '100%',
}

export function boxStyle(): ReturnType<typeof css> {
  return BASE_STYLE
}

const RULES = _ruleSet(css<ResponsiveBoxStyleProps & ThemeProps>`
  ${responsiveBoxSizingStyle}
  ${responsiveBoxHeightStyle}
  ${responsiveBoxOverflowStyle}
  ${responsiveBoxDisplayStyle}
`)

export function responsiveBoxStyle(): CSSObject[] {
  return RULES
}

function responsiveBoxDisplayStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$display,
    (display) => css`
      &:not([hidden]) {
        display: ${display};
      }
    `,
  )
}

function responsiveBoxSizingStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$sizing,
    (sizing) => css`
      box-sizing: ${BOX_SIZING[sizing]};
    `,
  )
}

function responsiveBoxHeightStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$height,
    (height) => css`
      height: ${BOX_HEIGHT[height]};
    `,
  )
}

function responsiveBoxOverflowStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$overflow,
    (overflow) => css`
      overflow: ${overflow};
    `,
  )
}
