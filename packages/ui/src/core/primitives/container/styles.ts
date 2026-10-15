import {css} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {rem, responsiveRules} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'
import {ResponsiveWidthStyleProps} from './types'

const BASE_STYLE = css`
  width: 100%;
  margin: 0 auto;
`

export function containerBaseStyle(): ReturnType<typeof css> {
  return BASE_STYLE
}

export function responsiveContainerWidthStyle(
  props: ResponsiveWidthStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {container, media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$width,
    (val) => css`
      max-width: ${val === 'auto' ? 'none' : rem(container[val])};
    `,
  )
}
