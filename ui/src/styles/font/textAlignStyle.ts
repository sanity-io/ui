import {getResponsiveProp, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveTextAlignStyleProps} from './types'

/**
 * Get responsive text align styles.
 * @beta Should not be used in production, as this might change.
 */
export function responsiveTextAlignStyle(props: ResponsiveTextAlignStyleProps & ThemeProps) {
  const {theme} = props

  return responsive(theme.sanity.media, getResponsiveProp(props.$align), (textAlign) => {
    return {textAlign}
  })
}
