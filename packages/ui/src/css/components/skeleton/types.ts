import type {FontCodeSize, FontHeadingSize, FontLabelSize, FontTextSize} from '@sanity/ui/theme'

import type {FlexStyleProps} from '../../props/flex/types'
import type {MarginStyleProps} from '../../props/margin/types'
import type {RadiusStyleProps} from '../../props/radius/types'
import type {ResponsiveProp} from '../../types'

/**
 * Style props for the {@link Skeleton} component.
 *
 * @remarks
 * Extends {@link FlexStyleProps}, {@link MarginStyleProps}, and {@link RadiusStyleProps}
 * to provide layout and visual control for skeleton placeholder elements.
 *
 * @beta
 */
export interface SkeletonStyleProps extends FlexStyleProps, MarginStyleProps, RadiusStyleProps {
  /**
   * A custom CSS class name to append to the element.
   */
  className?: string
}

/**
 * Style props for the code skeleton variant.
 *
 * @remarks
 * Provides a `size` prop that maps to the theme's code font size scale,
 * allowing the skeleton to match the dimensions of a {@link Code} component.
 *
 * @beta
 */
export interface CodeSkeletonStyleProps {
  /**
   * A custom CSS class name to append to the element.
   */
  className?: string

  /**
   * Sets the size of the code skeleton using the theme's code font size scale.
   *
   * @remarks
   * Determines the height and line-height of the skeleton to match the
   * corresponding {@link Code} component at the same size. Supports responsive values.
   */
  size?: ResponsiveProp<FontCodeSize>
}

/**
 * Style props for the heading skeleton variant.
 *
 * @remarks
 * Provides a `size` prop that maps to the theme's heading font size scale,
 * allowing the skeleton to match the dimensions of a {@link Heading} component.
 *
 * @beta
 */
export interface HeadingSkeletonStyleProps {
  /**
   * A custom CSS class name to append to the element.
   */
  className?: string

  /**
   * Sets the size of the heading skeleton using the theme's heading font size scale.
   *
   * @remarks
   * Determines the height and line-height of the skeleton to match the
   * corresponding {@link Heading} component at the same size. Supports responsive values.
   */
  size?: ResponsiveProp<FontHeadingSize>
}

/**
 * Style props for the label skeleton variant.
 *
 * @remarks
 * Provides a `size` prop that maps to the theme's label font size scale,
 * allowing the skeleton to match the dimensions of a {@link Label} component.
 *
 * @beta
 */
export interface LabelSkeletonStyleProps {
  /**
   * A custom CSS class name to append to the element.
   */
  className?: string

  /**
   * Sets the size of the label skeleton using the theme's label font size scale.
   *
   * @remarks
   * Determines the height and line-height of the skeleton to match the
   * corresponding {@link Label} component at the same size. Supports responsive values.
   */
  size?: ResponsiveProp<FontLabelSize>
}

/**
 * Style props for the text skeleton variant.
 *
 * @remarks
 * Provides a `size` prop that maps to the theme's text font size scale,
 * allowing the skeleton to match the dimensions of a {@link Text} component.
 *
 * @beta
 */
export interface TextSkeletonStyleProps {
  /**
   * A custom CSS class name to append to the element.
   */
  className?: string

  /**
   * Sets the size of the text skeleton using the theme's text font size scale.
   *
   * @remarks
   * Determines the height and line-height of the skeleton to match the
   * corresponding {@link Text} component at the same size. Supports responsive values.
   */
  size?: ResponsiveProp<FontTextSize>
}
