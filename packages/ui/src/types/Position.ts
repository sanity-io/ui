export const POSITION = ['absolute', 'fixed', 'relative', 'static', 'sticky'] as const
/** @public */
export type Position = (typeof POSITION)[number]
