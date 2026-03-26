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
    type: 'union',
    className: 'padding',
    values: SPACE,
  },
  paddingX: {
    type: 'union',
    className: 'padding-x',
    values: SPACE,
  },
  paddingY: {
    type: 'union',
    className: 'padding-y',
    values: SPACE,
  },
  paddingTop: {
    type: 'union',
    className: 'padding-t',
    values: SPACE,
  },
  paddingRight: {
    type: 'union',
    className: 'padding-r',
    values: SPACE,
  },
  paddingBottom: {
    type: 'union',
    className: 'padding-b',
    values: SPACE,
  },
  paddingLeft: {
    type: 'union',
    className: 'padding-l',
    values: SPACE,
  },
}
