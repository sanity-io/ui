import {css} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {rem, responsiveRules} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'
import {ResponsiveInlineSpaceStyleProps} from './types'

const BASE_STYLE = css`
  line-height: 0;

  &&:not([hidden]) {
    display: block;
  }

  & > div {
    display: inline-block;
    vertical-align: middle;
  }
`

export function inlineBaseStyle(): ReturnType<typeof css> {
  return BASE_STYLE
}

export function inlineSpaceStyle(
  props: ResponsiveInlineSpaceStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {media, space} = getTheme_v2(props.theme)

  return responsiveRules(media, props.$space, (spaceIndex) => {
    const _space = rem(spaceIndex === 0.5 ? space[1] / 2 : space[spaceIndex])

    return css`
      margin: -${_space} 0 0 -${_space};

      & > div {
        padding: ${_space} 0 0 ${_space};
      }
    `
  })
}
