import {borderProps} from '../../props/border'
import {type MarginProps, marginProps} from '../../props/margin'
import {paddingProps} from '../../props/padding'
import {type ToneProps, toneProps} from '../../props/tone'
import {type Density} from '../../types/Density'
import {DISPLAY_BLOCK, type DisplayBlock} from '../../types/Display'
import {type PropDef} from '../../types/PropDef'
import {type Responsive} from '../../types/Responsive'

/** @public */
export interface CardProps<T extends React.ElementType> extends MarginProps, ToneProps {
  /** Element to render */
  as?: T
  /** CSS **display** property */
  display?: Responsive<DisplayBlock>
  /** Composite prop for setting padding and border radius */
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
      padding: {
        propDef: paddingProps['padding'] as PropDef,
        mapping: {
          compact: 3,
          regular: 4,
          loose: 5,
        },
      },
      radius: {
        propDef: borderProps['radius'] as PropDef,
        mapping: {
          compact: 2,
          regular: 3,
          loose: 4,
        },
      },
    },
  },
  ...toneProps,
  ...marginProps,
}
