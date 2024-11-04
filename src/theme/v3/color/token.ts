import {ColorHueKey, ColorTintKey} from '@sanity/color'

export type ColorTokenOpacityValue = `0` | `0.${number}` | `1`

export type ColorToken =
  | `black`
  | `black/${ColorTokenOpacityValue}`
  | `white`
  | `white/${ColorTokenOpacityValue}`
  | `${ColorHueKey}/${ColorTintKey}`
  | `${ColorHueKey}/${ColorTintKey}/${ColorTokenOpacityValue}`
  | `${ColorHueKey}/${ColorTintKey} ${number}%`
  | `${ColorTintKey}`
  | `${ColorTintKey}/${ColorTokenOpacityValue}`
  | `${ColorTintKey} ${number}%`
