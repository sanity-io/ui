import {css} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {rem, responsiveRules} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveRadiusStyleProps} from './types'

export function responsiveRadiusStyle(
  props: ResponsiveRadiusStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {media, radius} = getTheme_v2(props.theme)

  return responsiveRules(media, props.$radius, (value) => {
    let borderRadius: string | 0 = 0

    if (typeof value === 'number') {
      borderRadius = rem(radius[value])
    }

    if (value === 'full') {
      borderRadius = '9999px'
    }

    return css`
      border-radius: ${borderRadius};
    `
  })
}
