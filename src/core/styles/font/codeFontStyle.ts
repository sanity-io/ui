import {CSSObject} from '@sanity/ui/theme'

import {ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {ResponsiveFontStyleProps} from './types'

/**
 * Get responsive CSS for the `code` font style.
 * @internal
 */
export function responsiveCodeFontStyle(props: ResponsiveFontStyleProps & ThemeProps): CSSObject[] {
  return responsiveFont('code', props)
}
