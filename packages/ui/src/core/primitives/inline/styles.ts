import {CSSObject, getTheme_v2} from '@sanity/ui/theme'

import {_responsive, rem, ThemeProps} from '../../styles'
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

export function inlineSpaceStyle(props: ResponsiveInlineSpaceStyleProps & ThemeProps): CSSObject[] {
  const {media, space} = getTheme_v2(props.theme)

  return _responsive(media, props.$space, (spaceIndex) => {
    const _space = rem(spaceIndex === 0.5 ? space[1] / 2 : space[spaceIndex])

    return {
      'margin': `-${_space} 0 0 -${_space}`,
      '& > div': {padding: `${_space} 0 0 ${_space}`},
    }
  })
}
