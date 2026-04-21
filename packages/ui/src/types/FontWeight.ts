export const FONT_WEIGHT = ['regular', 'medium', 'semibold', 'bold'] as const
export type FontWeight = (typeof FONT_WEIGHT)[number]
