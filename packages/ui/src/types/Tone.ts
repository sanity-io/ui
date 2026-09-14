export const TONE = ['neutral', 'positive', 'suggest', 'caution', 'critical'] as const
/** @public */
export type Tone = (typeof TONE)[number]
