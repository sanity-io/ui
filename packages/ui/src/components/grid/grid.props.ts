import {flexParentProps, type FlexParentProps} from '../../props/flexParent'
import {type GapProps, gapProps} from '../../props/gap'
import {type GridParentProps, gridParentProps} from '../../props/gridParent'
import {type LayoutProps, layoutProps} from '../../props/layout'
import {DISPLAY_GRID, type DisplayGrid} from '../../types/Display'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface GridProps<T extends React.ElementType = 'div'>
  extends
    Pick<FlexParentProps, 'alignItems' | 'justifyContent'>,
    GridParentProps,
    GapProps,
    LayoutProps {
  /**
   * HTML element or component to render.
   */
  as?: T
  /**
   * CSS `display` property.
   */
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
  alignItems: flexParentProps['alignItems'] as PropDef,
  justifyContent: flexParentProps['justifyContent'] as PropDef,
  ...gridParentProps,
  ...gapProps,
  ...layoutProps,
}
