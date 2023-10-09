import {ColorTints} from '@sanity/color'
import {getColorHex} from '../../../../studioTheme/tints'
import {ThemeColorName, ThemeColorSchemeKey} from '../types'
import {cardCssVariables, createCardVariables} from './card'
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
  const baseBg = getColorHex(tones[defaultTone], scheme === 'dark', defaultTone, 'card-base-bg')
  const tonesVars = createTonesVariables(scheme, tones, defaultTone, baseBg)
  const spotVars = createSpotVars(scheme, baseBg)
  const syntaxVars = createSyntaxVariables(scheme, baseBg)
  const cardVars = createCardVariables(scheme, baseBg)

  return {...tonesVars, ...spotVars, ...syntaxVars, ...cardVars}
}

/**
 * @beta
 */
export const cssVars = {
  ...tonesCssVariables,
  spot: spotCssVariables,
  syntax: syntaxCssVariables,
  card: cardCssVariables,
}
