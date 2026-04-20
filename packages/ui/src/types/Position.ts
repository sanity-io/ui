export const POSITION = ['absolute', 'fixed', 'relative', 'static', 'sticky'] as const
export type Position = (typeof POSITION)[number]
