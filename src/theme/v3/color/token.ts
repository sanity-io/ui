import {Hue, Tint} from '../../palette'

/** @public */
export type ColorTokenOpacityValue = `0` | `0.${number}` | `1`

/** @public */
export type ColorToken =
  | `inherit`
  | `black`
  | `black/${ColorTokenOpacityValue}`
  | `white`
  | `white/${ColorTokenOpacityValue}`
  | `${Hue}/${Tint}`
  | `${Hue}/${Tint}/${ColorTokenOpacityValue}`
  | `${Hue}/${Tint} ${number}%`
  | `${Tint}`
  | `${Tint}/${ColorTokenOpacityValue}`
  | `${Tint} ${number}%`
