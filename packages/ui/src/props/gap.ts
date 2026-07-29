import {type PropDef} from '../types/PropDef'
import {type Responsive} from '../types/Responsive'
import {SPACE_INHERIT, type SpaceInherit} from '../types/Space'

/** @public */
export type GapProps = {
  /** CSS **gap** property */
  gap?: Responsive<SpaceInherit>
  /** CSS **row-gap** property */
  rowGap?: Responsive<SpaceInherit>
  /** CSS **column-gap** property */
  columnGap?: Responsive<SpaceInherit>
}

export const gapProps: Record<string, PropDef> = {
  gap: {
    type: 'union',
    className: 'gap',
    values: SPACE_INHERIT,
  },
  rowGap: {
    type: 'union',
    className: 'row-gap',
    values: SPACE_INHERIT,
  },
  columnGap: {
    type: 'union',
    className: 'column-gap',
    values: SPACE_INHERIT,
  },
}
