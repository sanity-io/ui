import { type PropDef } from "../types/PropDef";
import { type Responsive } from "../types/Responsive";
import { type Space, SPACE } from "../types/Space";

export type GapProps = {
  gap?: Responsive<Space>
  gapX?: Responsive<Space>
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
