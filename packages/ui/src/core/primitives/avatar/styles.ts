import {CSSObject} from '../../../theme/system/css'
import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {focusRingStyle} from '../../styles/focusRing'
import {_responsive, rem} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'
import {AvatarRootStyleProps, ResponsiveAvatarSizeStyleProps} from './types'

export function avatarColorStyle(props: AvatarRootStyleProps): CSSObject {
  const {$color} = props

  return {
    '--avatar-bg-color': `var(--card-avatar-${$color}-bg-color)`,
    '--avatar-fg-color': `var(--card-avatar-${$color}-fg-color)`,
  }
}

export function avatarRootStyle(props: ThemeProps): CSSObject {
  const {avatar} = getTheme_v2(props.theme)

  return {
    /* &:is(button) */
    '&[data-as="button"]': {
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
