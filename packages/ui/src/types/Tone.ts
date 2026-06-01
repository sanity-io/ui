export const TONE = ['neutral', 'positive', 'suggest', 'caution', 'critical'] as const
export type Tone = (typeof TONE)[number]
