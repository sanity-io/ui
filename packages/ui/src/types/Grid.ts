export const GRID_AUTO_FLOW = ['row', 'column', 'row dense', 'column dense', 'dense'] as const
export type GridAutoFlow = (typeof GRID_AUTO_FLOW)[number]
