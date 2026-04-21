export const TONE = ['neutral', 'primary', 'positive', 'suggest', 'caution', 'critical'] as const
export type Tone = (typeof TONE)[number]

export const TONE_LEVEL = ['muted', 'normal', 'strong']
export type ToneLevel = (typeof TONE_LEVEL)[number]
