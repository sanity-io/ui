export const ALIGN_ITEMS = ['baseline', 'center', 'flex-end', 'flex-start', 'stretch'] as const
/** @public */
export type AlignItems = (typeof ALIGN_ITEMS)[number]

export const JUSTIFY_CONTENT = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const
/** @public */
export type JustifyContent = (typeof JUSTIFY_CONTENT)[number]

export const FLEX_DIRECTION = ['row', 'row-reverse', 'column', 'column-reverse'] as const
/** @public */
export type FlexDirection = (typeof FLEX_DIRECTION)[number]

export const FLEX_WRAP = ['wrap', 'wrap-reverse', 'nowrap'] as const
/** @public */
export type FlexWrap = (typeof FLEX_WRAP)[number]
