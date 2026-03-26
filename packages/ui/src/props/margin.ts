import { type PropDef } from "../types/PropDef";
import { type Responsive } from "../types/Responsive";
import { type SpaceAuto, SPACE_AUTO } from "../types/Space";

export type MarginProps = {
  margin?: Responsive<SpaceAuto>
  marginX?: Responsive<SpaceAuto>
  marginY?: Responsive<SpaceAuto>
  marginTop?: Responsive<SpaceAuto>
  marginRight?: Responsive<SpaceAuto>
  marginBottom?: Responsive<SpaceAuto>
  marginLeft?: Responsive<SpaceAuto>
}

export const marginProps: Record<string, PropDef<SpaceAuto>> = {
  margin: {
    type: 'union',
    className: 'margin',
    values: SPACE_AUTO,
  },
  marginX: {
    type: 'union',
    className: 'margin-x',
    values: SPACE_AUTO,
  },
  marginY: {
    type: 'union',
    className: 'margin-y',
    values: SPACE_AUTO,
  },
  marginTop: {
    type: 'union',
    className: 'margin-t',
    values: SPACE_AUTO,
  },
  marginRight: {
    type: 'union',
    className: 'margin-r',
    values: SPACE_AUTO,
  },
  marginBottom: {
    type: 'union',
    className: 'margin-b',
    values: SPACE_AUTO,
  },
  marginLeft: {
    type: 'union',
    className: 'margin-l',
    values: SPACE_AUTO,
  },
}
