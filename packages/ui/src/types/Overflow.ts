export const OVERFLOW = ['visible', 'hidden', 'auto', 'scroll', 'clip'] as const
/** @public */
export type Overflow = (typeof OVERFLOW)[number]
