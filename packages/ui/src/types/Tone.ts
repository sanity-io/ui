export const TONE = ['neutral', 'positive', 'suggest', 'caution', 'critical'] as const
export const TONE_WITH_DEFAULT = ['default', ...TONE]
/** @public */
export type Tone = (typeof TONE)[number]
export type ToneWithDefault = (typeof TONE_WITH_DEFAULT)[number]
