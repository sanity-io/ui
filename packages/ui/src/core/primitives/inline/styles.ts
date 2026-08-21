import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {_responsive, rem} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'
import {ResponsiveInlineSpaceStyleProps} from './types'

export function inlineBaseStyle(): CSSObject {
  return {
    'lineHeight': '0',

    '&&:not([hidden])': {
      display: 'block',
    },

    '& > div': {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
  }
}

export function inlineSpaceStyle(props: ResponsiveInlineSpaceStyleProps & ThemeProps): CSSObject {
  const {media, space} = getTheme_v2(props.theme)

  return _responsive(media, props.$space, (spaceIndex) => {
    const _space = rem(spaceIndex === 0.5 ? space[1] / 2 : space[spaceIndex])

    return {
      'margin': `-${_space} 0 0 -${_space}`,
      '& > div': {padding: `${_space} 0 0 ${_space}`},
    }
  })
}
