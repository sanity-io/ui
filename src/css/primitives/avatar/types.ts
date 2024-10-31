import type {AvatarColor, AvatarSize} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/** @public */
export interface AvatarStyleProps {
  color: AvatarColor
  size: ResponsiveProp<AvatarSize>
}
