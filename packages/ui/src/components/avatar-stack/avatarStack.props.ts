import {type PropDef} from '../../types/PropDef'

/** @public */
export interface AvatarStackProps<T extends React.ElementType> {
  /** Element to render */
  as?: T
}

export const avatarStackProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}
