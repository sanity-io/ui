import {css} from 'styled-components'
import {_responsive, ThemeProps} from '../../styles'
import {DialogPosition} from '../../types'
import {CSSObject} from '../../types/styled'

/**
 * @internal
 */
export interface ResponsiveDialogPositionStyleProps {
  $position: DialogPosition[]
}

export function dialogStyle({theme}: ThemeProps): CSSObject {
  const color = theme.sanity.color.base

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
    background: color.shadow.umbra,
  }
}

export function responsiveDialogPositionStyle(
  props: ResponsiveDialogPositionStyleProps & ThemeProps,
): CSSObject[] {
  const {theme} = props
  const {media} = theme.sanity

  return _responsive(media, props.$position, (position) => ({'&&': {position}}))
}

/**
 * @internal
 */
export interface AnimationDialogStyleProps {
  animate: boolean
}

export function animationDialogStyle(props: AnimationDialogStyleProps): ReturnType<typeof css> {
  if (!props.animate) return css``

  return css`
    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    animation: fadeIn 200ms ease-out;
    // Animates the dialog card.
    & > [data-ui='DialogCard'] {
      animation: zoomIn 200ms ease-out;
    }
  `
}
