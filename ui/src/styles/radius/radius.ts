import {getResponsiveProp, rem, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {RadiusProps} from './types'

export function radius(props: RadiusProps & ThemeProps) {
  const {theme} = props

  return responsive(
    theme,
    getResponsiveProp(props.radius).map((radiusIndex) => ({
      borderRadius: rem(theme.radius[radiusIndex]),
    }))
  )
}
