export const RADIUS = [0, 1, 2, 3, 4, 5, 6, 'full'] as const
/** @public */
export type Radius = (typeof RADIUS)[number]
