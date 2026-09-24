export const DENSITY = ['compact', 'regular', 'loose'] as const
/** @public */
export type Density = (typeof DENSITY)[number]
