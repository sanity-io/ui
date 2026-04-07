import {OVERFLOW, type Overflow} from '../types/Overflow'
import {type PropDef} from '../types/PropDef'
import {type Responsive} from '../types/Responsive'

export type OverflowProps = {
  /** CSS **overflow** property */
  overflow?: Responsive<Overflow>
  /** CSS **overflow-x** property */
  overflowX?: Responsive<Overflow>
  /** CSS **overflow-y** property */
  overflowY?: Responsive<Overflow>
}

export const overflowProps: Record<string, PropDef> = {
  overflow: {
    type: 'union',
    className: 'overflow',
    values: OVERFLOW,
  },
  overflowX: {
    type: 'union',
    className: 'overflow-x',
    values: OVERFLOW,
  },
  overflowY: {
    type: 'union',
    className: 'overflow-y',
    values: OVERFLOW,
  },
}
