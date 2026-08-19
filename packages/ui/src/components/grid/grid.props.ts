import {type GapProps, gapProps} from '../../props/gap'
import {type GridParentProps, gridParentProps} from '../../props/gridParent'
import {type LayoutProps, layoutProps} from '../../props/layout'
import {DISPLAY_GRID, type DisplayGrid} from '../../types/Display'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface GridProps<T extends React.ElementType = 'div'>
  extends GridParentProps, GapProps, LayoutProps {
  /** Element to render */
  as?: T
  /** CSS **display** property */
  display?: Responsive<DisplayGrid>
}

export const gridProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  display: {
    type: 'union',
    className: 'display',
    values: DISPLAY_GRID,
  },
  ...gridParentProps,
  ...gapProps,
  ...layoutProps,
}
