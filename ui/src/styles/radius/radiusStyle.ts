import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveRadiusProps} from './types'

export function responsiveRadiusStyle(props: ResponsiveRadiusProps & ThemeProps) {
  const {theme} = props

  return responsive(
    theme.media,
    getResponsiveProp(props.radius).map((radiusIndex) => ({
      borderRadius: rem(theme.radius[radiusIndex]),
    }))
  )
}
