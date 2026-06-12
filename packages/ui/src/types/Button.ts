export const BUTTON_DENSITY = ['regular', 'loose'] as const
export type ButtonDensity = (typeof BUTTON_DENSITY)[number]

export const BUTTON_LEVEL = ['primary', 'secondary', 'tertiary'] as const
export type ButtonLevel = (typeof BUTTON_LEVEL)[number]

export const BUTTON_TONE = ['neutral', 'critical'] as const
export type ButtonTone = (typeof BUTTON_TONE)[number]
