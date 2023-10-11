import {ColorTints} from '@sanity/color'
import {mutableCardVariables} from '../../../../../styles/colorVars'
import {getColorHex} from '../../../../studioTheme/tints'
import {ThemeColorName, ThemeColorSchemeKey} from '../types'
import {createSpotVars, spotCssVariables} from './spot'
import {createSyntaxVariables, syntaxCssVariables} from './syntax'
import {createTonesVariables, tonesCssVariables} from './tones'

/**
 *
 * @beta
 */
export const createCssVars = (
  scheme: ThemeColorSchemeKey,
  tones: Record<ThemeColorName, ColorTints>,
  defaultTone: ThemeColorName = 'default',
): Record<string, string> => {
  const baseBg = getColorHex(tones[defaultTone], scheme === 'dark', defaultTone, 'base-bg-card')
  const tonesVars = createTonesVariables(scheme, tones, defaultTone, baseBg)
  const spotVars = createSpotVars(scheme, baseBg)
  const syntaxVars = createSyntaxVariables(scheme, baseBg)

  return {...tonesVars, ...spotVars, ...syntaxVars}
}

/**
 * @internal
 * This are the only variables that are exposed, as they can be updated and used by other components.
 */
const mutableVariables: Record<keyof typeof mutableCardVariables, string> = Object.keys(
  mutableCardVariables,
).reduce(
  (acc, key) => {
    const item = key as keyof typeof mutableCardVariables

    acc[item] = `var(${mutableCardVariables[item]})`

    return acc
  },
  {} as Record<keyof typeof mutableCardVariables, string>,
)

/**
 * @beta
 */
export const cssVars = {
  ...tonesCssVariables,
  spot: spotCssVariables,
  syntax: syntaxCssVariables,
  /**
   * This variables are mutable, they can be updated by other components.
   * The main component that updates them is the card
   */
  mutable: mutableVariables,
}
