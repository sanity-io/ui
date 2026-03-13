import type {AvatarColor, AvatarSize} from '@sanity/ui-tokens'

import type {ResponsiveProp} from '../../types'

/** @public */
export interface AvatarStyleProps {
  className?: string
  color?: AvatarColor
  size?: ResponsiveProp<AvatarSize>
}
