import type {FontTextSize, Space} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'
import type {FlexStyleProps} from '../../props/flex/types'
import type {RadiusStyleProps} from '../../props/radius/types'
import type {WidthStyleProps} from '../../props/width/types'

/**
 * Shared style props for input-based components such as {@link TextInput},
 * {@link TextArea}, and {@link Select}.
 *
 * @remarks
 * Extends {@link FlexStyleProps}, {@link RadiusStyleProps}, and {@link WidthStyleProps}
 * to provide common layout and styling capabilities across all input primitives.
 *
 * @public
 */
export interface InputStyleProps extends FlexStyleProps, RadiusStyleProps, WidthStyleProps {
  /**
   * When `true`, renders a visible border around the input element.
   * When `false` or omitted, the input renders without a border.
   */
  border?: boolean

  /**
   * Sets the font size of the input's text content.
   *
   * @remarks
   * Uses the text font size scale defined by the theme. Supports responsive values.
   */
  fontSize?: ResponsiveProp<FontTextSize>

  /**
   * Sets the gap between internal elements of the input (e.g., icons and text).
   *
   * @remarks
   * Uses the spacing scale defined by the theme. Supports responsive values.
   */
  gap?: ResponsiveProp<Space>

  /**
   * Sets the inner padding of the input element.
   *
   * @remarks
   * Uses the spacing scale defined by the theme. Supports responsive values.
   */
  padding?: ResponsiveProp<Space>
}
