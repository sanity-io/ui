export const TONE = [
  'default',
  'neutral',
  'primary',
  'suggest',
  'positive',
  'caution',
  'critical',
] as const
export type Tone = (typeof TONE)[number]
