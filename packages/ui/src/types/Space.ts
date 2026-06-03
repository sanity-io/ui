export const SPACE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const
export type Space = (typeof SPACE)[number]

export const SPACE_AUTO = [...SPACE, 'auto'] as const
export type SpaceAuto = (typeof SPACE_AUTO)[number]

export const SPACE_INHERIT = [...SPACE, 'inherit'] as const
export type SpaceInherit = (typeof SPACE_INHERIT)[number]

export const SPACE_AUTO_NEGATIVE = [-9, -8, -7, -6, -5, -4, -3, -2, -1, ...SPACE, 'auto'] as const
export type SpaceAutoNegative = (typeof SPACE_AUTO_NEGATIVE)[number]
