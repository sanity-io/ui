import type {FontTextSize, ElementTone} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/** @public */
export type BadgeTone = ElementTone

/** @public */
export interface BadgeStyleProps {
  className?: string
  fontSize?: ResponsiveProp<FontTextSize>
  tone?: BadgeTone
}
