import {type FlexParentProps, flexParentProps} from '../../props/flexParent'
import {type GapProps, gapProps} from '../../props/gap'
import {type LayoutProps, layoutProps} from '../../props/layout'
import {DISPLAY_FLEX, type DisplayFlex} from '../../types/Display'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface FlexProps<T extends React.ElementType = 'div'>
  extends FlexParentProps, GapProps, LayoutProps {
  /** Element to render */
  as?: T
  /** CSS **display** property */
  display?: Responsive<DisplayFlex>
}

export const flexProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  display: {
    type: 'union',
    className: 'display',
    values: DISPLAY_FLEX,
  },
  ...flexParentProps,
  ...gapProps,
  ...layoutProps,
}
