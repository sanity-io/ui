import { type PropDef } from "../types/PropDef";
import { type Responsive } from "../types/Responsive";
import { type Space, SPACE } from "../types/Space";

export type PaddingProps = {
  padding?: Responsive<Space>
  paddingX?: Responsive<Space>
  paddingY?: Responsive<Space>
  paddingTop?: Responsive<Space>
  paddingRight?: Responsive<Space>
  paddingBottom?: Responsive<Space>
  paddingLeft?: Responsive<Space>
}

export const paddingProps: Record<string, PropDef<Space>> = {
  padding: {
    type: 'enum',
    className: 'padding',
    values: SPACE,
  },
  paddingX: {
    type: 'enum',
    className: 'padding-x',
    values: SPACE,
  },
  paddingY: {
    type: 'enum',
    className: 'padding-y',
    values: SPACE,
  },
  paddingTop: {
    type: 'enum',
    className: 'padding-t',
    values: SPACE,
  },
  paddingRight: {
    type: 'enum',
    className: 'padding-r',
    values: SPACE,
  },
  paddingBottom: {
    type: 'enum',
    className: 'padding-b',
    values: SPACE,
  },
  paddingLeft: {
    type: 'enum',
    className: 'padding-l',
    values: SPACE,
  },
}
