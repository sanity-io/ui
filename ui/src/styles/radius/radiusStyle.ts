import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveRadiusProps} from './types'

export function responsiveRadiusStyle(props: ResponsiveRadiusProps & ThemeProps) {
  const {theme} = props
  const {media, radius} = theme.sanity

  return responsive(media, getResponsiveProp(props.radius), (radiusIndex) => ({
    borderRadius: rem(radius[radiusIndex]),
  }))
}
