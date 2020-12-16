import {getResponsiveProp, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveFlexItemStyleProps} from './types'

export function flexItemStyle() {
  return [{minWidth: 0, minHeight: 0}, responsiveFlexItemStyle]
}

export function responsiveFlexItemStyle(props: ResponsiveFlexItemStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.flex), (flex) => ({flex}))
}
