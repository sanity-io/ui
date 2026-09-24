export const CODE_TAG = ['pre', 'span'] as const
export type CodeTag = (typeof CODE_TAG)[number]

export const CODE_SIZE = [0, 1, 2, 3, 4] as const
/** @public */
export type CodeSize = (typeof CODE_SIZE)[number]
