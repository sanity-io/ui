import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {focusRingStyle} from '../../styles/focusRing'
import {_responsive, rem} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'
import {AvatarRootStyleProps, ResponsiveAvatarSizeStyleProps} from './types'

export function avatarRootStyle(props: AvatarRootStyleProps & ThemeProps): CSSObject {
  const {$color} = props
  const {avatar} = getTheme_v2(props.theme)

  return {
    '--avatar-bg-color': `var(--card-avatar-${$color}-bg-color)`,
    '--avatar-fg-color': `var(--card-avatar-${$color}-fg-color)`,

    'width': 'var(--avatar-size)',
    'height': 'var(--avatar-size)',
    'borderRadius': 'calc(var(--avatar-size) / 2)',
    'backgroundColor': 'var(--avatar-bg-color)',
    'position': 'relative',
    'boxSizing': 'border-box',
    'userSelect': 'none',
    'boxShadow': '0 0 0 1px var(--card-bg-color)',

    '&[data-status="inactive"]': {
      opacity: '0.5',
    },

    /* &:is(button) */
    '&[data-as="button"]': {
      'WebkitFontSmoothing': 'inherit',
      'appearance': 'none',
      'margin': 0,
      'padding': 0,
      'border': 0,
      'font': 'inherit',
      'color': 'inherit',
      'outline': 'none',

      '&:focus': {
        boxShadow: focusRingStyle({focusRing: avatar.focusRing}),
      },

      '&:focus:not(:focus-visible)': {
        boxShadow: 'none',
      },
    },
  }
}

/**
 * Sets `--avatar-size` per breakpoint: the root, the image and the stroke
 * overlay (`avatar.css.ts`) size themselves from it, so `size` arrays stay
 * responsive for all of them.
 */
export function responsiveAvatarSizeStyle(
  props: ResponsiveAvatarSizeStyleProps & ThemeProps,
): CSSObject[] {
  const {avatar, media} = getTheme_v2(props.theme)

  return _responsive(media, props.$size, (size) => {
    const avatarSize = avatar.sizes[size] || avatar.sizes[0]

    return {'--avatar-size': rem(avatarSize.size)}
  })
}
