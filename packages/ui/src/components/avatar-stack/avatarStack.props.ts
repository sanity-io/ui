import {AVATAR_SIZE, type AvatarSize} from '../../types/Avatar'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface AvatarStackProps<T extends React.ElementType> {
  /** Element to render */
  as?: T
  /** Max number of avatars to display */
  maxLength?: number
  /** Avatar and AvatarCounter size */
  size?: AvatarSize
}

export const avatarStackProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  maxLength: {
    type: 'number',
  },
  size: {
    type: 'union',
    values: AVATAR_SIZE,
  },
}
