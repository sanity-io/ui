export const TEXT_ALIGN = ['left', 'center', 'right'] as const
/** @public */
export type TextAlign = (typeof TEXT_ALIGN)[number]
