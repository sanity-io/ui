import {heightProps} from '../../props/height'
import {widthProps} from '../../props/width'
import {AVATAR_SIZE, type AvatarSize} from '../../types/Avatar'
import {type PropDef} from '../../types/PropDef'
import {TEXT_SIZE} from '../../types/Text'

/** @public */
export interface AvatarCounterProps<T extends React.ElementType> {
  /** Element to render */
  as?: T
  /** Count */
  count?: number
  /** Composite prop for setting width, height, and font */
  size?: AvatarSize
}

export const avatarCounterProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  count: {
    type: 'number',
  },
  size: {
    type: 'composite',
    values: AVATAR_SIZE,
    composition: {
      size: {
        propDef: {
          type: 'union',
          className: 'text-eyebrow',
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
      minWidth: {
        propDef: widthProps['minWidth'] as PropDef,
        mapping: {
          0: '19px',
          1: '25px',
          2: '33px',
        },
      },
    },
  },
}
