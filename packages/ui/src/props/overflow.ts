import { type Overflow, OVERFLOW } from "../types/Overflow";
import { type PropDef } from "../types/PropDef";
import { type Responsive } from "../types/Responsive";

export type OverflowProps = {
  overflow?: Responsive<Overflow>
  overflowX?: Responsive<Overflow>
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
