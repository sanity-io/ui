import type {Hue, Tint} from '../palette'

/** @public */
export type ColorTokenOpacityValue = `0` | `0.${number}` | `1`

/** @public */
export type ColorToken =
  | `inherit`
  | `black`
  | `black/${ColorTokenOpacityValue}`
  | `white`
  | `white/${ColorTokenOpacityValue}`
  | `${Hue}-${Tint}`
  | `${Hue}-${Tint}/${ColorTokenOpacityValue}`
  | `${Hue}-${Tint} ${number}%`
  | `${Tint}`
  | `${Tint}/${ColorTokenOpacityValue}`
  | `${Tint} ${number}%`

/**
 * Theme color values are tuples of [light, dark] color tokens.
 *
 * @public
 */
export type ColorValue = [ColorToken, ColorToken]

/** @public */
export interface ResolvedColorToken {
  color: {type: 'inherit'} | {type: 'black' | 'white'} | {type: 'hue'; hue: Hue; tint: Tint}
  opacity: number
  mix: number
}
