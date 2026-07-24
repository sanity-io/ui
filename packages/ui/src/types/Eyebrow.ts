export const EYEBROW_SIZE = [0, 1, 2, 3, 4] as const
export type EyebrowSize = (typeof EYEBROW_SIZE)[number]
