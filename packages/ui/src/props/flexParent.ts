import {
  type AlignItems,
  type FlexDirection,
  type FlexWrap,
  type JustifyContent,
  ALIGN_ITEMS,
  FLEX_DIRECTION,
  FLEX_WRAP,
  JUSTIFY_CONTENT
} from "../types/Flex";
import { type PropDef } from "../types/PropDef";
import { type Responsive } from "../types/Responsive";

export type FlexParentProps = {
  alignItems?: Responsive<AlignItems>
  justifyContent?: Responsive<JustifyContent>
  flexDirection?: Responsive<FlexDirection>
  flexWrap?: Responsive<FlexWrap>
}

export const flexParentProps: Record<string, PropDef> = {
  alignItems: {
    type: 'union',
    className: 'align-items',
    values: ALIGN_ITEMS,
  },
  justifyContent: {
    type: 'union',
    className: 'justify-content',
    values: JUSTIFY_CONTENT,
  },
  flexDirection: {
    type: 'union',
    className: 'flex-direction',
    values: FLEX_DIRECTION,
  },
  flexWrap: {
    type: 'union',
    className: 'flex-wrap',
    values: FLEX_WRAP,
  },
}
