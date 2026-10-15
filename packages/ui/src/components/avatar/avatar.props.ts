import {heightProps} from '../../props/height'
import {AVATAR_COLOR, AVATAR_SIZE, type AvatarColor, type AvatarSize} from '../../types/Avatar'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'
import {TEXT_SIZE} from '../../types/Text'

/** @public */
export interface AvatarProps extends React.ComponentProps<'figure'> {
  /** Avatar color */
  color?: AvatarColor
  /** Avatar initials */
  initials: string
  /** Composite prop for setting height and font size */
  size?: Responsive<AvatarSize>
  /** Avatar image src */
  src?: string
}

export const avatarProps: Record<string, PropDef> = {
  color: {
    type: 'union',
    className: 'avatar',
    values: AVATAR_COLOR,
  },
  initials: {
    type: 'string',
  },
  size: {
    type: 'composite',
    values: AVATAR_SIZE,
    composition: {
      size: {
        propDef: {
          type: 'union',
          className: 'text-body',
          values: TEXT_SIZE,
        },
        mapping: {
          0: 0,
          1: 1,
          2: 2,
        },
      },
      height: {
        propDef: heightProps['height'] as PropDef,
        mapping: {
          0: '19px',
          1: '25px',
          2: '33px',
        },
      },
    },
  },
  src: {
    type: 'string',
  },
}
