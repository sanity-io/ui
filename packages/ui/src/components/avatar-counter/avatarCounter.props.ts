import {heightProps} from '../../props/height'
import {AVATAR_SIZE, type AvatarSize} from '../../types/Avatar'
import {EYEBROW_SIZE} from '../../types/Eyebrow'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface AvatarCounterProps extends React.ComponentProps<'figure'> {
  /** Count */
  count?: number
  /** Composite prop for setting height and font size */
  size?: AvatarSize
}

export const avatarCounterProps: Record<string, PropDef> = {
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
          values: EYEBROW_SIZE,
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
    },
  },
}
