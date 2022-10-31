import {CSSObject} from 'styled-components'
import {_responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveBorderStyleProps} from './types'

const BORDER_VALUE = '1px solid var(--card-border-color)'

// export function responsiveBorderStyle(): Array<
//   (props: ResponsiveBorderStyleProps & ThemeProps) => CSSObject[]
// > {
//   return [responsiveBorderStyle, borderTop, borderRight, borderBottom, borderLeft]
// }

export function responsiveBorderStyle(props: ResponsiveBorderStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$border, (value) =>
    value ? {'&&': {border: BORDER_VALUE}} : {'&&': {border: 0}}
  )
}

export function responsiveBorderTopStyle(
  props: ResponsiveBorderStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$borderTop, (value) =>
    value ? {'&&': {borderTop: BORDER_VALUE}} : {'&&': {borderTop: 0}}
  )
}

export function responsiveBorderRightStyle(
  props: ResponsiveBorderStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$borderRight, (value) =>
    value ? {'&&': {borderRight: BORDER_VALUE}} : {'&&': {borderRight: 0}}
  )
}

export function responsiveBorderBottomStyle(
  props: ResponsiveBorderStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$borderBottom, (value) =>
    value ? {'&&': {borderBottom: BORDER_VALUE}} : {'&&': {borderBottom: 0}}
  )
}

export function responsiveBorderLeftStyle(
  props: ResponsiveBorderStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$borderLeft, (value) =>
    value ? {'&&': {borderLeft: BORDER_VALUE}} : {'&&': {borderLeft: 0}}
  )
}
