import {type PropDef} from '../types/PropDef'
import {type Responsive} from '../types/Responsive'
import {SPACE, type Space} from '../types/Space'

export type GapProps = {
  /** CSS **gap** property */
  gap?: Responsive<Space>
  /** CSS **row-gap** property */
  gapX?: Responsive<Space>
  /** CSS **column-gap** property */
  gapY?: Responsive<Space>
}

export const gapProps: Record<string, PropDef<Space>> = {
  gap: {
    type: 'union',
    className: 'gap',
    values: SPACE,
  },
  gapX: {
    type: 'union',
    className: 'gap-x',
    values: SPACE,
  },
  gapY: {
    type: 'union',
    className: 'gap-y',
    values: SPACE,
  },
}
