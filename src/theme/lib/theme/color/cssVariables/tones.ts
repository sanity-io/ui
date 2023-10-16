import {ColorTints} from '@sanity/color'
import {multiply, screen} from '../../../../studioTheme/helpers'
import {
  ColorKey,
  DefaultColorKey,
  allKeys,
  colorKeys,
  getColorHex,
} from '../../../../studioTheme/tints'
import {ThemeColorName, ThemeColorSchemeKey} from '../types'

export const getToneCssVar = (tone: ThemeColorName, key: DefaultColorKey): string =>
  `--${tone}-${key}`

export const createTonesVariables = (
  scheme: ThemeColorSchemeKey,
  tones: Record<ThemeColorName, ColorTints>,
  defaultTone: ThemeColorName = 'default',
  baseBg: string,
): Record<string, string> => {
  const tonesVariables: Record<string, string> = {}
  const keys = Object.keys(tones) as ThemeColorName[]
  const mix = scheme === 'dark' ? screen : multiply
  const needsMixing = defaultTone !== 'default'

  keys.forEach((_tone: ThemeColorName) => {
    const tone = _tone == 'default' ? defaultTone : _tone

    const tint = tones[tone]
    const keysToGenerate = _tone === 'default' ? allKeys : colorKeys

    keysToGenerate.forEach((key) => {
      const colorHex = getColorHex(tint, scheme, tone, key)
      const varName = getToneCssVar(_tone, key)
      const willBeMixed = needsMixing && !key.startsWith('base-')

      tonesVariables[varName] = willBeMixed ? mix(baseBg, colorHex) : colorHex
    })
  })

  // If we are changing the default tone, we need to update the bg-base to match with the new base bg color.
  // As components are using this bg-base for the background color, and it needs to match with the card bg color.
  if (defaultTone !== 'default') {
    tonesVariables[getToneCssVar('default', 'bg-base')] = defaultToneCssVariables['base-bg-card']
  }

  return tonesVariables
}

const themeTones = ['transparent', 'primary', 'positive', 'caution', 'critical'] as const
type tones = (typeof themeTones)[number]

const colorsCssVariables: Record<tones, Record<ColorKey, string>> = themeTones.reduce(
  (acc, tone) => {
    acc[tone] = colorKeys.reduce(
      (toneAcc, key) => {
        toneAcc[key] = `var(${getToneCssVar(tone, key)})`

        return toneAcc
      },
      {} as Record<ColorKey, string>,
    )

    return acc
  },
  {} as Record<ThemeColorName, Record<ColorKey, string>>,
)

const defaultToneCssVariables = allKeys.reduce(
  (acc, key) => {
    acc[key] = `var(${getToneCssVar('default', key)})`

    return acc
  },
  {} as Record<DefaultColorKey, string>,
)

export const tonesCssVariables = {
  default: defaultToneCssVariables,
  ...colorsCssVariables,
}
