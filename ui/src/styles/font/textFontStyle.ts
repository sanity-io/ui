import {ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {ResponsiveFontProps} from './types'

/**
 * Get responsive CSS for the `text` font style.
 * @beta Should not be used in production, as this might change.
 */
export function responsiveTextFont(props: ResponsiveFontProps & ThemeProps) {
  return responsiveFont('text', props)
}
