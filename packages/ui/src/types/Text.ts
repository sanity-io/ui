export const TEXT_SIZE = [0, 1, 2, 3, 4] as const
/** @public */
export type TextSize = (typeof TEXT_SIZE)[number]
