export const ALIGN_ITEMS = ['baseline', 'center', 'flex-end', 'flex-start', 'stretch'] as const
export type AlignItems = (typeof ALIGN_ITEMS)[number]

export const JUSTIFY_CONTENT = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'] as const
export type JustifyContent = (typeof JUSTIFY_CONTENT)[number]

export const FLEX_DIRECTION = ['row', 'row-reverse', 'column', 'column-reverse'] as const
export type FlexDirection = (typeof FLEX_DIRECTION)[number]

export const FLEX_WRAP = ['wrap', 'reverse-wrap', 'nowrap'] as const
export type FlexWrap = (typeof FLEX_WRAP)[number]
