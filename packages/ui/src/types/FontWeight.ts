export const FONT_WEIGHT = ['regular', 'medium', 'semibold', 'bold'] as const
/** @public */
export type FontWeight = (typeof FONT_WEIGHT)[number]
