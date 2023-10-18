import {ColorTints} from '@sanity/color'
import {multiply, screen} from '../../../../studioTheme/helpers'
import {ThemeColorName, ThemeColorSchemeKey} from '../types'
import {ColorKey, colorKeys, getColorHex} from './tints'

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
      const colorHex = getColorHex(tint, scheme, tone, key)
      const varName = getToneCssVar(_tone, key)
      const willBeMixed = needsMixing && !key.startsWith('base-')

      tonesVariables[varName] = willBeMixed ? mix(baseBg, colorHex) : colorHex
    })
  })

  // If we are changing the default tone, we need to update the bg-base to match with the new base bg color.
  // As components are using this bg-base for the background color, and it needs to match with the card bg color.
  if (defaultTone !== 'default') {
    tonesVariables[getToneCssVar('default', 'bg-base')] = tonesCssVariables.default['base-bg-card']
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
