import {CSSObject} from '@sanity/ui/theme'
import {_responsive, rem} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveRadiusStyleProps} from './types'

export function responsiveRadiusStyle(props: ResponsiveRadiusStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {media, radius} = theme.sanity

  return _responsive(media, props.$radius, (value) => {
    let borderRadius: string | 0 = 0

    if (typeof value === 'number') {
      borderRadius = rem(radius[value])
    }

    if (value === 'full') {
      borderRadius = '9999px'
    }

    return {borderRadius}
  })
}
