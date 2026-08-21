import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_responsive, _ruleSet, rem} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFlexStyleProps} from './types'

const BASE_STYLE: CSSObject = {
  '&&:not([hidden])': {
    display: 'flex',
  },
}

const RULES = _ruleSet(
  BASE_STYLE,
  responsiveFlexAlignStyle,
  responsiveFlexGapStyle,
  responsiveFlexWrapStyle,
  responsiveFlexJustifyStyle,
  responsiveFlexDirectionStyle,
)

export function responsiveFlexStyle(): CSSObject[] {
  return RULES
}

function responsiveFlexAlignStyle(props: ResponsiveFlexStyleProps & ThemeProps): CSSObject {
  const {media} = getTheme_v2(props.theme)

  return _responsive(media, props.$align, (align) => {
    return {alignItems: align}
  })
}

function responsiveFlexGapStyle(props: ResponsiveFlexStyleProps & ThemeProps) {
  const {media, space} = getTheme_v2(props.theme)

  return _responsive(media, props.$gap, (gap) => ({
    gap: gap ? rem(space[gap]) : undefined,
  }))
}

function responsiveFlexWrapStyle(props: ResponsiveFlexStyleProps & ThemeProps): CSSObject {
  const {media} = getTheme_v2(props.theme)

  return _responsive(media, props.$wrap, (wrap) => {
    return {flexWrap: wrap}
  })
}

function responsiveFlexJustifyStyle(props: ResponsiveFlexStyleProps & ThemeProps): CSSObject {
  const {media} = getTheme_v2(props.theme)

  return _responsive(media, props.$justify, (justify) => {
    return {justifyContent: justify}
  })
}

function responsiveFlexDirectionStyle(props: ResponsiveFlexStyleProps & ThemeProps): CSSObject {
  const {media} = getTheme_v2(props.theme)

  return _responsive(media, props.$direction, (direction) => {
    return {flexDirection: direction}
  })
}
