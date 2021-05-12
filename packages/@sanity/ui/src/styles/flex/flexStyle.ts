import {CSSObject} from 'styled-components'
import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFlexStyleProps} from './types'

export function responsiveFlexStyle() {
  return [
    flexBaseStyle,
    responsiveFlexAlignStyle,
    responsiveFlexGapStyle,
    responsiveFlexWrapStyle,
    responsiveFlexJustifyStyle,
    responsiveFlexDirectionStyle,
  ]
}

function flexBaseStyle() {
  return {'&:not([hidden])': {display: 'flex'}}
}

export function responsiveFlexAlignStyle(
  props: ResponsiveFlexStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$align), (align) => {
    return {alignItems: align}
  })
}

function responsiveFlexGapStyle(props: ResponsiveFlexStyleProps & ThemeProps) {
  const {theme} = props
  const {media, space} = theme.sanity

  return responsive(media, getResponsiveProp(props.$gap), (gap) => ({
    gap: gap ? rem(space[gap]) : undefined,
  }))
}

export function responsiveFlexWrapStyle(props: ResponsiveFlexStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$wrap), (wrap) => {
    return {flexWrap: wrap}
  })
}

export function responsiveFlexJustifyStyle(
  props: ResponsiveFlexStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$justify), (justify) => {
    return {justifyContent: justify}
  })
}

export function responsiveFlexDirectionStyle(
  props: ResponsiveFlexStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$direction), (direction) => {
    return {flexDirection: direction}
  })
}
