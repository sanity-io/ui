import {CSSObject} from '@sanity/ui/theme'

import {ThemeProps} from '../types'
import {responsiveFont} from './responsiveFont'
import {FontWeightStyleProps, ResponsiveFontSizeStyleProps} from './types'

/**
 * Get responsive CSS for the `code` font style.
 * @internal
 */
export function responsiveCodeFontStyle(
  props: FontWeightStyleProps & ResponsiveFontSizeStyleProps & ThemeProps,
): CSSObject[] {
  return responsiveFont('code', props)
}
