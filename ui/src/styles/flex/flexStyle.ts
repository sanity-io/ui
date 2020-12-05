import {CSSObject} from 'styled-components'
import {getResponsiveProp, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFlexStyleProps} from './types'

export function responsiveFlexStyle(props: ResponsiveFlexStyleProps & ThemeProps): CSSObject[] {
  return [
    {'&:not([hidden])': {display: 'flex'}},
    ...responsiveFlexAlignStyle(props),
    ...responsiveFlexWrapStyle(props),
    ...responsiveFlexJustifyStyle(props),
    ...responsiveFlexDirectionStyle(props),
  ]
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
    if (typeof direction !== 'string') return {}

    if (direction && direction.startsWith('column')) {
      return {flexDirection: direction, '&>*': {minHeight: 0}}
    }

    return {flexDirection: direction, '&>*': {minWidth: 0}}
  })
}
