import {AvatarSize, ThemeColorAvatarColorKey} from '@sanity/ui/theme'

import {ResponsiveProp} from '../../types'

export interface AvatarStyleProps {
  color: ThemeColorAvatarColorKey
  size: ResponsiveProp<AvatarSize>
}
