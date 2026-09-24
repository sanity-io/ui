import {
  ALIGN_ITEMS,
  type AlignItems,
  FLEX_DIRECTION,
  FLEX_WRAP,
  type FlexDirection,
  type FlexWrap,
  JUSTIFY_CONTENT,
  type JustifyContent,
} from '../types/Flex'
import {type PropDef} from '../types/PropDef'
import {type Responsive} from '../types/Responsive'

/** @public */
export type FlexParentProps = {
  /** CSS **align-items** property */
  alignItems?: Responsive<AlignItems>
  /** CSS **justify-content** property */
  justifyContent?: Responsive<JustifyContent>
  /** CSS **flex-direction** property */
  flexDirection?: Responsive<FlexDirection>
  /** CSS **flex-wrap** property */
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
    className: 'flex',
    values: FLEX_WRAP,
  },
}
