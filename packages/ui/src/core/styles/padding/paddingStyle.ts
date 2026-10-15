import {css} from 'styled-components'

import {responsiveSpace} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsivePaddingStyleProps} from './types'

export function responsivePaddingStyle(
  props: ResponsivePaddingStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {theme} = props

  return css`
    ${responsiveSpace(theme, ['padding'], props.$padding)}
    ${responsiveSpace(theme, ['padding-left', 'padding-right'], props.$paddingX)}
    ${responsiveSpace(theme, ['padding-top', 'padding-bottom'], props.$paddingY)}
    ${responsiveSpace(theme, ['padding-top'], props.$paddingTop)}
    ${responsiveSpace(theme, ['padding-right'], props.$paddingRight)}
    ${responsiveSpace(theme, ['padding-bottom'], props.$paddingBottom)}
    ${responsiveSpace(theme, ['padding-left'], props.$paddingLeft)}
  `
}
