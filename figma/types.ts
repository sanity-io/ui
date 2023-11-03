import {
  ColorButtonMode,
  ColorConfigBaseKey,
  ColorConfigBaseTone,
  ColorConfigBlendKey,
  ColorConfigStateKey,
  ColorConfigStateTone,
  ColorConfigValue,
} from '../src/theme'

export type ColorBaseTokenEntry = [
  `${ColorConfigBaseTone}/${ColorConfigBaseKey | ColorConfigBlendKey}`,
  ColorConfigValue | [ColorConfigValue, ColorConfigValue],
]

export type ColorButtonTokenEntry = [
  `button/${ColorConfigStateTone}/${ColorButtonMode}/${ColorConfigStateKey | ColorConfigBlendKey}`,
  ColorConfigValue | [ColorConfigValue, ColorConfigValue],
]

export type TokenEntry = ColorBaseTokenEntry | ColorButtonTokenEntry
