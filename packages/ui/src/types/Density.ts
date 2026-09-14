export const DENSITY = ['compact', 'regular', 'loose'] as const
/** @public */
export type Density = (typeof DENSITY)[number]

export const DENSITY_NONE = ['none', 'compact', 'regular', 'loose'] as const
export type DensityNone = (typeof DENSITY_NONE)[number]
