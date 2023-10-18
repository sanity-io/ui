import {ColorTints} from '@sanity/color'
import {ThemeColorName, ThemeColorSchemeKey} from '../types'
import {cardVariables, mutableVariables} from './cardVariables'
import {getColorHex} from './tints'
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

  return {...tonesVars, ...cardVariables}
}

/**
 * @beta
 */
export const cssVars = {
  ...tonesCssVariables,
  /**
   * This variables are mutable, they can be updated by other components.
   * The main component that updates them is the card, these are the only ones that should be exposed for use from the cards.
   */
  mutable: mutableVariables,
}
