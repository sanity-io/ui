import type {FontTextSize, ThemeColorStateToneKey} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/** @public */
export type BadgeTone = ThemeColorStateToneKey

/** @public */
export interface BadgeStyleProps {
  className?: string
  fontSize?: ResponsiveProp<FontTextSize>
  tone?: BadgeTone
}
