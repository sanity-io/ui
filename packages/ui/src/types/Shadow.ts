export const SHADOW = [0, 1, 2, 3, 4, 5] as const
export type Shadow = (typeof SHADOW)[number]
