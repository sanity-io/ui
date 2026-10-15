import {css} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {rem, responsiveRules} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'

export interface ResponsiveStackSpaceStyleProps {
  $space: number[]
}

const BASE_STYLE = css`
  &&:not([hidden]) {
    display: grid;
  }

  &[data-as='ul'],
  &[data-as='ol'] {
    list-style: none;
  }

  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: min-content;
`

export function stackBaseStyle(): ReturnType<typeof css> {
  return BASE_STYLE
}

export function responsiveStackSpaceStyle(
  props: ResponsiveStackSpaceStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {media, space} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$space,
    (spaceIndex) => css`
      grid-gap: ${rem(space[spaceIndex])};
    `,
  )
}
