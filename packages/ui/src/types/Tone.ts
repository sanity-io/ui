export const TONE = ['neutral', 'positive', 'suggest', 'caution', 'critical'] as const
export const LAYOUT_TONE = ['default', ...TONE]
/** @public */
export type Tone = (typeof TONE)[number]
export type LayoutTone = (typeof LAYOUT_TONE)[number]
