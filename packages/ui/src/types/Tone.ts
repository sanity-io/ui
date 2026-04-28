export const TONE = [
  'none',
  'neutral',
  'primary',
  'positive',
  'suggest',
  'caution',
  'critical',
] as const
export type Tone = (typeof TONE)[number]
