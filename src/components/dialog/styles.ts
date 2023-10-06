import {_responsive, ThemeProps} from '../../styles'
import {DialogPosition} from '../../types'
import {CSSObject} from '../../types/styled'

/**
 * @internal
 */
export interface ResponsiveDialogPositionStyleProps {
  $position: DialogPosition[]
}

export function dialogStyle(): CSSObject {
  return {
    '&:not([hidden])': {
      display: 'flex',
    },

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    background: '--card-shadow-umbra-color',
  }
}

export function responsiveDialogPositionStyle(
  props: ResponsiveDialogPositionStyleProps & ThemeProps,
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$position, (position) => ({'&&': {position}}))
}
