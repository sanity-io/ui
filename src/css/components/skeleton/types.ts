import {FontCodeSize, FontHeadingSize, FontLabelSize, FontTextSize} from '@sanity/ui/theme'

import {RadiusStyleProps} from '../../styles/radius'
import {ResponsiveProp} from '../../types'

/** @beta */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SkeletonStyleProps extends RadiusStyleProps {
  // visible?: boolean
}

export interface CodeSkeletonStyleProps {
  size?: ResponsiveProp<FontCodeSize>
}

export interface HeadingSkeletonStyleProps {
  size?: ResponsiveProp<FontHeadingSize>
}

export interface LabelSkeletonStyleProps {
  size?: ResponsiveProp<FontLabelSize>
}

export interface TextSkeletonStyleProps {
  size?: ResponsiveProp<FontTextSize>
}
