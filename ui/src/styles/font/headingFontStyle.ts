import {ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {ResponsiveFontStyleProps} from './types'

/**
 * Get responsive CSS for the `heading` font style.
 * @beta Should not be used in production, as this might change.
 */
export function responsiveHeadingFont(props: ResponsiveFontStyleProps & ThemeProps) {
  return responsiveFont('heading', props)
}
