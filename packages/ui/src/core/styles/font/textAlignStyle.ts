import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveTextAlignStyleProps} from './types'

/**
 * Get responsive text align styles.
 * @internal
 */
export function responsiveTextAlignStyle(
  props: ResponsiveTextAlignStyleProps & ThemeProps,
): CSSObject {
  const {media} = getTheme_v2(props.theme)

  return _responsive(media, props.$align, (textAlign) => {
    return {textAlign}
  })
}
