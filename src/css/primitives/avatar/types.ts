import {AvatarSize, ThemeColorAvatarColorKey} from '@sanity/ui/theme'

import {ResponsiveProp} from '../../types'

/** @public */
export interface AvatarStyleProps {
  color: ThemeColorAvatarColorKey
  size: ResponsiveProp<AvatarSize>
}
