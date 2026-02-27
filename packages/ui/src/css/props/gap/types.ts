import type {Space} from '@sanity/ui/theme'

import type {ResponsiveProp} from '../../types'

/**
 * Style props for controlling the gap (gutter) between items in flex and grid containers.
 *
 * @public
 */
export interface GapStyleProps {
  /**
   * Sets the gap between items in both the row and column directions.
   *
   * @remarks
   * Maps to the CSS `gap` property. Supports responsive values.
   *
   * Uses the spacing scale defined by the theme.
   */
  gap?: ResponsiveProp<Space>

  /**
   * Sets the gap between items in the horizontal (column) direction.
   *
   * @remarks
   * Maps to the CSS `column-gap` property. Supports responsive values.
   *
   * Uses the spacing scale defined by the theme. Overrides the horizontal
   * portion of the `gap` prop when both are specified.
   */
  gapX?: ResponsiveProp<Space>

  /**
   * Sets the gap between items in the vertical (row) direction.
   *
   * @remarks
   * Maps to the CSS `row-gap` property. Supports responsive values.
   *
   * Uses the spacing scale defined by the theme. Overrides the vertical
   * portion of the `gap` prop when both are specified.
   */
  gapY?: ResponsiveProp<Space>
}
