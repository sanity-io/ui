export const DENSITY = ['compact', 'regular', 'loose'] as const
export type Density = (typeof DENSITY)[number]
