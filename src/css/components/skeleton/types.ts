import {FontCodeSize, FontHeadingSize, FontLabelSize, FontTextSize} from '@sanity/ui/theme'

import {RadiusStyleProps} from '../../aspects/radius'
import {ResponsiveProp} from '../../types'

/** @beta */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SkeletonStyleProps extends RadiusStyleProps {
  // visible?: boolean
}

/** @beta */
export interface CodeSkeletonStyleProps {
  size?: ResponsiveProp<FontCodeSize>
}

/** @beta */
export interface HeadingSkeletonStyleProps {
  size?: ResponsiveProp<FontHeadingSize>
}

/** @beta */
export interface LabelSkeletonStyleProps {
  size?: ResponsiveProp<FontLabelSize>
}

/** @beta */
export interface TextSkeletonStyleProps {
  size?: ResponsiveProp<FontTextSize>
}
