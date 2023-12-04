import {CSSObject, getTheme_v2} from '@sanity/ui/theme'
import {_responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveTextAlignStyleProps} from './types'

/**
 * Get responsive text align styles.
 * @internal
 */
export function responsiveTextAlignStyle(
  props: ResponsiveTextAlignStyleProps & ThemeProps,
): CSSObject[] {
  const {media} = getTheme_v2(props.theme)

  return _responsive(media, props.$align, (textAlign) => {
    return {textAlign}
  })
}
