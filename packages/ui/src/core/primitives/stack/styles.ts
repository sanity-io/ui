import {CSSObject, getTheme_v2} from '@sanity/ui/theme'

import {_responsive, rem, ThemeProps} from '../../styles'

export interface ResponsiveStackSpaceStyleProps {
  $space: number[]
}

const BASE_STYLE: CSSObject = {
  '&&:not([hidden])': {
    display: 'grid',
  },
  '&[data-as="ul"],&[data-as="ol"]': {
    listStyle: 'none',
  },
  'gridTemplateColumns': 'minmax(0, 1fr)',
  'gridAutoRows': 'min-content',
}

export function stackBaseStyle(): CSSObject {
  return BASE_STYLE
}

export function responsiveStackSpaceStyle(
  props: ResponsiveStackSpaceStyleProps & ThemeProps,
): CSSObject[] {
  const {media, space} = getTheme_v2(props.theme)

  return _responsive(media, props.$space, (spaceIndex) => ({
    gridGap: rem(space[spaceIndex]),
  }))
}
