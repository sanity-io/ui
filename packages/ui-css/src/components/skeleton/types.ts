import type {FontCodeSize, FontHeadingSize, FontLabelSize, FontTextSize} from '@sanity/ui/theme'

import type {FlexStyleProps} from '../../props/flex/types'
import type {MarginStyleProps} from '../../props/margin/types'
import type {RadiusStyleProps} from '../../props/radius/types'
import type {ResponsiveProp} from '../../types'

/** @beta */

export interface SkeletonStyleProps extends FlexStyleProps, MarginStyleProps, RadiusStyleProps {
  className?: string
}

/** @beta */
export interface CodeSkeletonStyleProps {
  className?: string
  size?: ResponsiveProp<FontCodeSize>
}

/** @beta */
export interface HeadingSkeletonStyleProps {
  className?: string
  size?: ResponsiveProp<FontHeadingSize>
}

/** @beta */
export interface LabelSkeletonStyleProps {
  className?: string
  size?: ResponsiveProp<FontLabelSize>
}

/** @beta */
export interface TextSkeletonStyleProps {
  className?: string
  size?: ResponsiveProp<FontTextSize>
}
