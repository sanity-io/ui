export const TEXT_ALIGN = ['left', 'center', 'right', 'justify'] as const
export type TextAlign = (typeof TEXT_ALIGN)[number]
