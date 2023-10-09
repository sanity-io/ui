import {ColorTints} from '@sanity/color'
import {multiply, screen} from '../../../../studioTheme/helpers'
import {ColorKey, colorKeys, getColorHex} from '../../../../studioTheme/tints'
import {ThemeColorName, ThemeColorSchemeKey} from '../types'

export const getToneCssVar = (tone: ThemeColorName, key: ColorKey): string => `--${tone}-${key}`

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

    colorKeys.forEach((key) => {
      const colorHex = getColorHex(tint, scheme === 'dark', tone, key)
      const varName = getToneCssVar(_tone, key)
      const willBeMixed = needsMixing && !key.startsWith('base-')

      tonesVariables[varName] = willBeMixed ? mix(baseBg, colorHex) : colorHex
    })
  })

  // Overrides when defaultTone is not default
  if (defaultTone !== 'default') {
    tonesVariables[getToneCssVar('default', 'bg-base')] = baseBg
  }

  return tonesVariables
}

const themeNames: ThemeColorName[] = [
  'default',
  'transparent',
  'primary',
  'positive',
  'caution',
  'critical',
]

export const tonesCssVariables: Record<
  ThemeColorName,
  Record<ColorKey, string>
> = themeNames.reduce(
  (acc, tone) => {
    acc[tone] = colorKeys.reduce(
      (acc, key) => {
        acc[key] = `var(${getToneCssVar(tone, key)})`

        return acc
      },
      {} as Record<ColorKey, string>,
    )

    return acc
  },
  {} as Record<ThemeColorName, Record<ColorKey, string>>,
)
