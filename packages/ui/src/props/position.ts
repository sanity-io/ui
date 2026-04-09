import {POSITION, type Position} from '../types/Position'
import {type PropDef} from '../types/PropDef'
import {type Responsive} from '../types/Responsive'
import {SPACE_AUTO, type SpaceAuto} from '../types/Space'

export type PositionProps = {
  /** CSS **position** property */
  position?: Responsive<Position>
  /** CSS **inset** property */
  inset?: Responsive<SpaceAuto>
  /** CSS **top** property */
  top?: Responsive<SpaceAuto>
  /** CSS **right** property */
  right?: Responsive<SpaceAuto>
  /** CSS **bottom** property */
  bottom?: Responsive<SpaceAuto>
  /** CSS **left** property */
  left?: Responsive<SpaceAuto>
}

export const positionProps: Record<string, PropDef> = {
  position: {
    type: 'union',
    className: 'position',
    values: POSITION,
  },
  inset: {
    type: 'union',
    className: 'inset',
    values: SPACE_AUTO,
  },
  top: {
    type: 'union',
    className: 'top',
    values: SPACE_AUTO,
  },
  right: {
    type: 'union',
    className: 'right',
    values: SPACE_AUTO,
  },
  bottom: {
    type: 'union',
    className: 'bottom',
    values: SPACE_AUTO,
  },
  left: {
    type: 'union',
    className: 'left',
    values: SPACE_AUTO,
  },
}
