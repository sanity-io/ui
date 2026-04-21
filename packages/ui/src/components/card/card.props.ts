import {type MarginProps, marginProps} from '../../props/margin'
import {toneProps} from '../../props/tone'
import {type Density} from '../../types/Density'
import {DISPLAY_BLOCK, type DisplayBlock} from '../../types/Display'
import {type PropDef} from '../../types/PropDef'
import {type Responsive} from '../../types/Responsive'
import type {Tone, ToneLevel} from '../../types/Tone'

/** @public */
export interface CardProps<T extends React.ElementType> extends MarginProps {
  /** Element to render */
  as?: T
  /** CSS **display** property */
  display?: Responsive<DisplayBlock>
  /** Composite prop for setting padding and border radius */
  density?: Responsive<Density>
  tone?: Tone
  toneLevel?: ToneLevel
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
  ...toneProps,
  ...marginProps,
}
