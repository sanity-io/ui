import {type StyleProp} from '../types/StyleProp'
import {type Responsive} from '../types/Responsive'
import {SPACE, type Space} from '../types/Space'

export type GapProps = {
  /** CSS **gap** property */
  gap?: Responsive<Space>
  /** CSS **row-gap** property */
  rowGap?: Responsive<Space>
  /** CSS **column-gap** property */
  columnGap?: Responsive<Space>
}

export const gapProps: Record<string, StyleProp> = {
  gap: {
    type: 'union',
    className: 'gap',
    values: SPACE,
  },
  rowGap: {
    type: 'union',
    className: 'row-gap',
    values: SPACE,
  },
  columnGap: {
    type: 'union',
    className: 'column-gap',
    values: SPACE,
  },
}
