import {type LayoutProps, layoutProps} from '../../props/layout'
import {DISPLAY_BLOCK, type DisplayBlock} from '../../types/Display'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface BoxProps<T extends React.ElementType = 'div'> extends LayoutProps {
  /** Element to render */
  as?: T
  /** CSS **display** property */
  display?: Responsive<DisplayBlock>
}

export const boxProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  display: {
    type: 'union',
    className: 'display',
    values: DISPLAY_BLOCK,
  },
  ...layoutProps,
}
