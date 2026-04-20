import {type MarginProps, marginProps} from '../../props/margin'
import {type Density} from '../../types/Density'
import {DISPLAY_BLOCK, type DisplayBlock} from '../../types/Display'
import {type PropDef} from '../../types/PropDef'
import {type Responsive} from '../../types/Responsive'

/** @public */
export interface CardProps<T extends React.ElementType> extends MarginProps {
  /** Element to render */
  as?: T
  /** CSS **display** property */
  display?: Responsive<DisplayBlock>
  /** Composite prop determining padding and border radius */
  density?: Responsive<Density>
}

export const cardProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  display: {
    type: 'union',
    className: 'display',
    values: DISPLAY_BLOCK,
  },
  density: {
    type: 'composite',
    composition: {
      compact: 'sui-p3 sui-radius2',
      regular: 'sui-p4 sui-radius3',
      loose: 'sui-p5 sui-radius4',
    } as Record<Density, string>,
  },
  ...marginProps,
}
