import {ColorTints} from '@sanity/color'
import {getColorHex} from '../../../../studioTheme/tints'
import {ThemeColorName, ThemeColorSchemeKey} from '../types'
import {cardVariables, mutableVariables} from './cardVariables'
import {createSpotVars, spotCssVariables} from './spot'
import {createSyntaxVariables, syntaxCssVariables} from './syntax'
import {createTonesVariables, tonesCssVariables} from './tones'

/**
 * @beta
 */
export const createCssVars = (
  scheme: ThemeColorSchemeKey,
  tones: Record<ThemeColorName, ColorTints>,
  defaultTone: ThemeColorName = 'default',
): Record<string, string> => {
  const baseBg = getColorHex(tones[defaultTone], scheme, defaultTone, 'base-bg-card')
  const tonesVars = createTonesVariables(scheme, tones, defaultTone, baseBg)
  const spotVars = createSpotVars(scheme, baseBg)
  const syntaxVars = createSyntaxVariables(scheme, baseBg)

  return {...tonesVars, ...spotVars, ...syntaxVars, ...cardVariables}
}

/**
 * @beta
 */
export const cssVars = {
  ...tonesCssVariables,
  spot: spotCssVariables,
  syntax: syntaxCssVariables,
  /**
   * This variables are mutable, they can be updated by other components.
   * The main component that updates them is the card, these are the only ones that should be exposed for use from the cards.
   */
  mutable: mutableVariables,
}
