import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_responsive, rem} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'
import {ResponsiveWidthStyleProps} from './types'

const BASE_STYLE: CSSObject = {
  width: '100%',
  margin: '0 auto',
}

export function containerBaseStyle(): CSSObject {
  return BASE_STYLE
}

export function responsiveContainerWidthStyle(
  props: ResponsiveWidthStyleProps & ThemeProps,
): CSSObject {
  const {container, media} = getTheme_v2(props.theme)

  return _responsive(media, props.$width, (val) => ({
    maxWidth: val === 'auto' ? 'none' : rem(container[val]),
  }))
}
