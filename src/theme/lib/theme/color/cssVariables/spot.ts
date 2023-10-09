import {hues} from '@sanity/color'
import {multiply, screen} from '../../../../studioTheme/helpers'
import {ThemeColorSchemeKey} from '../types'

/**
 * @beta
 */
export const spotsColors = [
  'gray',
  'blue',
  'purple',
  'magenta',
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
] as const

/**
 * @public
 */
export type ThemeColorSpotKey = (typeof spotsColors)[number]

const getSpotCssVar = (spotColor: ThemeColorSpotKey): string => `--spot-${spotColor}`

/**
 * This is necessary to allow mixins with the base background color, which can change when you add a card with a tone.
 * @beta
 */
export const createSpotVars = (
  scheme: ThemeColorSchemeKey,
  baseBg: string,
): Record<string, string> => {
  const mix = scheme === 'dark' ? screen : multiply

  return spotsColors.reduce(
    (acc, spotColor) => {
      acc[getSpotCssVar(spotColor)] = mix(
        baseBg,
        hues[spotColor][scheme === 'dark' ? 400 : 500].hex,
      )

      return acc
    },
    {} as Record<string, string>,
  )
}

/**
 * @beta
 */
export const spotCssVariables: Record<ThemeColorSpotKey, string> = spotsColors.reduce(
  (acc, spotColor) => {
    acc[spotColor] = `var(${getSpotCssVar(spotColor)})`

    return acc
  },
  {} as Record<ThemeColorSpotKey, string>,
)
