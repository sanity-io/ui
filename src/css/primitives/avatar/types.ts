import type {AvatarColor, AvatarSize} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/** @public */
export interface AvatarStyleProps {
  className?: string
  color: AvatarColor
  size: ResponsiveProp<AvatarSize>
}
