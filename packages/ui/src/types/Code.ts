export const CODE_SIZE = [0, 1, 2, 3, 4] as const
/** @public */
export type CodeSize = (typeof CODE_SIZE)[number]
