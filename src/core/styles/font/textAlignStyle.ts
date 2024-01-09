import {CSSObject} from '@sanity/ui/theme'
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
  const {media} = props.theme.sanity.v2

  return _responsive(media, props.$align, (textAlign) => {
    return {textAlign}
  })
}
