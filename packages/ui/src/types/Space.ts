export const SPACE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const
export type Space = (typeof SPACE)[number]

export const SPACE_AUTO = [...SPACE, 'auto'] as const
export type SpaceAuto = (typeof SPACE_AUTO)[number]
