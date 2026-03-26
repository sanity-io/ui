import { type PropDef } from "../types/PropDef";
import { type Position, POSITION } from "../types/Position";
import { type Responsive } from "../types/Responsive";
import { type SpaceAuto, SPACE_AUTO } from "../types/Space";

export type PositionProps = {
  position?: Responsive<Position>
  inset?: Responsive<SpaceAuto>
  top?: Responsive<SpaceAuto>
  right?: Responsive<SpaceAuto>
  bottom?: Responsive<SpaceAuto>
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
