export const DISPLAY_BLOCK = ['block', 'inline-block', 'none'] as const
export type DisplayBlock = (typeof DISPLAY_BLOCK)[number]

export const DISPLAY_FLEX = ['flex', 'inline-flex', 'none'] as const
export type DisplayFlex = (typeof DISPLAY_FLEX)[number]

export const DISPLAY_GRID = ['grid', 'inline-grid', 'none'] as const
export type DisplayGrid = (typeof DISPLAY_GRID)[number]
