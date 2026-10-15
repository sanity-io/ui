import {css} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {responsiveRules} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'
import {DialogPosition} from '../../types/dialog'

/**
 * @internal
 */
export interface ResponsiveDialogPositionStyleProps {
  $position: DialogPosition[]
}

export function dialogStyle({theme}: ThemeProps): ReturnType<typeof css> {
  const {color} = getTheme_v2(theme)

  return css`
    background: ${color.backdrop};
  `
}

export function responsiveDialogPositionStyle(
  props: ResponsiveDialogPositionStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {media} = getTheme_v2(props.theme)

  return responsiveRules(
    media,
    props.$position,
    (position) => css`
      && {
        position: ${position};
      }
    `,
  )
}
