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

    'backgroundColor': 'var(--avatar-bg-color)',
    'position': 'relative',
    'boxSizing': 'border-box',
    'userSelect': 'none',
    'boxShadow': '0 0 0 1px var(--card-bg-color)',

    '&[data-status="inactive"]': {
      opacity: '0.5',
    },

    '&>svg': {
      '&:not([hidden])': {
        display: 'block',
      },
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

export function responsiveAvatarSizeStyle(
  props: ResponsiveAvatarSizeStyleProps & ThemeProps,
): CSSObject[] {
  const {avatar, media} = getTheme_v2(props.theme)

  return _responsive(media, props.$size, (size) => {
    const avatarSize = avatar.sizes[size] || avatar.sizes[0]

    return {
      'width': rem(avatarSize.size),
      'height': rem(avatarSize.size),
      'borderRadius': rem(avatarSize.size / 2),

      '&>svg': {
        width: rem(avatarSize.size),
        height: rem(avatarSize.size),
        borderRadius: rem(avatarSize.size / 2),
      },
    }
  })
}
