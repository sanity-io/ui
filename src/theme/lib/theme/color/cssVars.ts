import {ColorTints} from '@sanity/color'
import {ColorKey, colorKeys, getColorHex} from '../../../studioTheme/tints'
import {ThemeColorName, ThemeColorSchemeKey} from './types'

export const getCssVar = (tone: ThemeColorName, key: ColorKey): string => `--${tone}-${key}`

export const createVars = (
  scheme: ThemeColorSchemeKey,
  tones: Record<ThemeColorName, ColorTints>,
  defaultTone: ThemeColorName = 'default',
): {
  name: string
  value: string
}[] => {
  const vars: {
    name: string
    value: string
  }[] = []
  const keys = Object.keys(tones) as ThemeColorName[]

  keys.forEach((_tone: ThemeColorName) => {
    const tone = _tone == 'default' ? defaultTone : _tone
    const tint = tones[tone]

    colorKeys.forEach((key) => {
      vars.push({
        name: getCssVar(_tone, key),
        value: getColorHex(tint, scheme === 'dark', tone, key),
      })
    })
  })

  return vars
}

const themeNames: ThemeColorName[] = [
  'default',
  'transparent',
  'primary',
  'positive',
  'caution',
  'critical',
]

export const cssVars: Record<ThemeColorName, Record<ColorKey, string>> = themeNames.reduce(
  (acc, tone) => {
    acc[tone] = colorKeys.reduce(
      (acc, key) => {
        acc[key] = `var(${getCssVar(tone, key)})`

        return acc
      },
      {} as Record<ColorKey, string>,
    )

    return acc
  },
  {} as Record<ThemeColorName, Record<ColorKey, string>>,
)
