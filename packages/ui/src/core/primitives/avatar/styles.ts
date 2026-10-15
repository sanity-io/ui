import {css} from 'styled-components'

import {getTheme_v2} from '../../../theme/versioning/getTheme_v2'
import {focusRingStyle} from '../../styles/focusRing'
import {rem, responsiveRules} from '../../styles/helpers'
import {ThemeProps} from '../../styles/types'
import {AvatarRootStyleProps, ResponsiveAvatarSizeStyleProps} from './types'

export function avatarColorStyle(props: AvatarRootStyleProps): ReturnType<typeof css> {
  const {$color} = props

  return css`
    --avatar-bg-color: var(--card-avatar-${$color}-bg-color);
    --avatar-fg-color: var(--card-avatar-${$color}-fg-color);
  `
}

export function avatarRootStyle(props: ThemeProps): ReturnType<typeof css> {
  const {avatar} = getTheme_v2(props.theme)

  return css`
    /* &:is(button) */
    &[data-as='button'] {
      &:focus {
        box-shadow: ${focusRingStyle({focusRing: avatar.focusRing})};
      }

      &:focus:not(:focus-visible) {
        box-shadow: none;
      }
    }
  `
}

/**
 * Sets `--avatar-size` per breakpoint: the root, the image and the stroke
 * overlay (`avatar.css.ts`) size themselves from it, so `size` arrays stay
 * responsive for all of them.
 */
export function responsiveAvatarSizeStyle(
  props: ResponsiveAvatarSizeStyleProps & ThemeProps,
): ReturnType<typeof css> {
  const {avatar, media} = getTheme_v2(props.theme)

  return responsiveRules(media, props.$size, (size) => {
    const avatarSize = avatar.sizes[size] || avatar.sizes[0]

    return css`
      --avatar-size: ${rem(avatarSize.size)};
    `
  })
}
