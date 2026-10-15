import {css} from 'styled-components'

import {responsiveSpace} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveMarginStyleProps} from './types'

export function responsiveMarginStyle(
  props: ResponsiveMarginStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {theme} = props

  return css`
    ${responsiveSpace(theme, ['margin'], props.$margin)}
    ${responsiveSpace(theme, ['margin-left', 'margin-right'], props.$marginX)}
    ${responsiveSpace(theme, ['margin-top', 'margin-bottom'], props.$marginY)}
    ${responsiveSpace(theme, ['margin-top'], props.$marginTop)}
    ${responsiveSpace(theme, ['margin-right'], props.$marginRight)}
    ${responsiveSpace(theme, ['margin-bottom'], props.$marginBottom)}
    ${responsiveSpace(theme, ['margin-left'], props.$marginLeft)}
  `
}
