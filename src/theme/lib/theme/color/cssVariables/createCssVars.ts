import {ColorTints} from '@sanity/color'
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
  const baseBg = getColorHex(tones[defaultTone], scheme === 'dark', defaultTone, 'card_base_bg')
  const tonesVars = createTonesVariables(scheme, tones, defaultTone, baseBg)
  const spotVars = createSpotVars(scheme, baseBg)
  const syntaxVars = createSyntaxVariables(scheme, baseBg)

  return {...tonesVars, ...spotVars, ...syntaxVars}
}

export const cssVars = {
  ...tonesCssVariables,
  spot: spotCssVariables,
  syntax: syntaxCssVariables,
}
