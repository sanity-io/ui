export const OVERFLOW = ['visible', 'hidden', 'auto', 'scroll', 'clip'] as const
export type Overflow = (typeof OVERFLOW)[number]
