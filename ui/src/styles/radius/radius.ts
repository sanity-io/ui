import {Theme} from '../../theme'
import {rem, responsive} from '../helpers'

export function radius(props: {uiRadius: number[]; theme: Theme}) {
  const {theme, uiRadius} = props

  return responsive(
    theme,
    uiRadius.map((radiusIndex) => ({borderRadius: rem(theme.radius[radiusIndex])}))
  )
}
