import {borderProps} from '../../props/border'
import {gapProps} from '../../props/gap'
import {type MarginProps, marginProps} from '../../props/margin'
import {paddingProps} from '../../props/padding'
import {type ToneProps, toneProps} from '../../props/tone'
import {DENSITY, type Density} from '../../types/Density'
import {type PropDef} from '../../types/PropDef'
import {type Responsive} from '../../types/Responsive'

/** @public */
export interface CardProps<T extends React.ElementType = 'div'> extends MarginProps, ToneProps {
  /**
   * HTML element or component to render.
   */
  as?: T
  /**
   * Sets padding, gap, and border-radius together to specify size. This prop is used in place of separate `padding`, `gap`, and `border-radius` props.
   */
  density?: Responsive<Density>
}

export const cardProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  density: {
    type: 'composite',
    values: DENSITY,
    composition: {
      gap: {
        propDef: gapProps['gap'] as PropDef,
        mapping: {
          compact: 2,
          regular: 3,
          loose: 4,
        },
      },
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
  } satisfies PropDef<Density>,
  ...toneProps,
  ...marginProps,
}
