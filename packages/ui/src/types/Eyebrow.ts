export const EYEBROW_SIZE = [0, 1, 2, 3, 4] as const
/** @public */
export type EyebrowSize = (typeof EYEBROW_SIZE)[number]
