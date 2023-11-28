import {CSSObject} from '@sanity/ui/theme'
import {EMPTY_ARRAY} from '../../constants'
import {_responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFlexItemStyleProps} from './types'

const BASE_STYLE: CSSObject = {
  minWidth: 0,
  minHeight: 0,
}

export function flexItemStyle(): Array<
  CSSObject | ((props: ResponsiveFlexItemStyleProps & ThemeProps) => CSSObject[])
> {
  return [BASE_STYLE, responsiveFlexItemStyle]
}

export function responsiveFlexItemStyle(
  props: ResponsiveFlexItemStyleProps & ThemeProps,
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  if (!props.$flex) return EMPTY_ARRAY

  return _responsive(media, props.$flex, (flex) => ({flex}))
}
