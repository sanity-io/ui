import {heightProps} from '../../props/height'
import {widthProps} from '../../props/width'
import {AVATAR_COLOR, AVATAR_SIZE, type AvatarColor, type AvatarSize} from '../../types/Avatar'
import {type PropDef} from '../../types/PropDef'
import {TEXT_SIZE} from '../../types/Text'

/** @public */
export interface AvatarProps<T extends React.ElementType> {
  /** Element to render */
  as?: T
  /** Avatar color */
  color?: AvatarColor
  /** Avatar initials */
  initials?: string
  /** Composite prop for setting width, height, and font font */
  size?: AvatarSize
  /** Avatar image src */
  src?: string
}

export const avatarProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
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
          className: 'text-label',
          values: TEXT_SIZE,
        },
        mapping: {
          0: 0,
          1: 1,
          2: 3,
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
      width: {
        propDef: widthProps['width'] as PropDef,
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
