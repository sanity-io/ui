import {CSSObject} from 'styled-components'
import {getResponsiveProp, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFlexStyleProps} from './types'

export function responsiveFlexStyle() {
  return [
    flexBaseStyle,
    responsiveFlexAlignStyle,
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

  return responsive(media, getResponsiveProp(props.align), (align) => {
    return {alignItems: align}
  })
}

export function responsiveFlexWrapStyle(props: ResponsiveFlexStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.wrap), (wrap) => {
    return {flexWrap: wrap}
  })
}

export function responsiveFlexJustifyStyle(
  props: ResponsiveFlexStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.justify), (justify) => {
    return {justifyContent: justify}
  })
}

export function responsiveFlexDirectionStyle(
  props: ResponsiveFlexStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.direction), (direction) => {
    return {flexDirection: direction}
  })
}
