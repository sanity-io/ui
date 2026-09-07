import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_responsive} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'
import {DialogPosition} from '../../types/dialog'

/**
 * @internal
 */
export interface ResponsiveDialogPositionStyleProps {
  $position: DialogPosition[]
}

export function dialogStyle({theme}: ThemeProps): CSSObject {
  const {color} = getTheme_v2(theme)

  return {
    background: color.backdrop,
  }
}

export function responsiveDialogPositionStyle(
  props: ResponsiveDialogPositionStyleProps & ThemeProps,
): CSSObject[] {
  const {media} = getTheme_v2(props.theme)

  return _responsive(media, props.$position, (position) => ({'&&': {position}}))
}
