import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_responsive, rem} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveRadiusStyleProps} from './types'

export function responsiveRadiusStyle(props: ResponsiveRadiusStyleProps & ThemeProps): CSSObject {
  const {media, radius} = getTheme_v2(props.theme)

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
