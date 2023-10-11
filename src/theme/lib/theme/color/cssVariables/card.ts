/**TODO: Think a better naming for this, as it seems similar to the generated in card. */
import {hues} from '@sanity/color'
import {multiply, screen} from '../../../../studioTheme/helpers'
import {ThemeColorSchemeKey} from '../types'

const cardsVariables = ['text-link-color', 'text-accent-color'] as const

const colors: Record<ThemeColorSchemeKey, Record<(typeof cardsVariables)[number], string>> = {
  dark: {
    'text-link-color': hues.blue[400].hex,
    'text-accent-color': hues.red[400].hex,
  },
  light: {
    'text-link-color': hues.blue[600].hex,
    'text-accent-color': hues.red[500].hex,
  },
}

/**
 * @public
 */
export type CardVariablesKeys = (typeof cardsVariables)[number]

export const getCardCssVariable = (cardVariable: CardVariablesKeys): string =>
  `--card-${cardVariable}`

/**
 * This is necessary to allow mixins with the base background color, which can change when you add a card with a tone.
 */
export const createCardVariables = (
  scheme: ThemeColorSchemeKey,
  baseBg: string,
): Record<string, string> => {
  const mix = scheme === 'dark' ? screen : multiply

  return cardsVariables.reduce(
    (acc, cardVariable) => {
      acc[getCardCssVariable(cardVariable)] = mix(baseBg, colors[scheme][cardVariable])

      return acc
    },
    {} as Record<string, string>,
  )
}

export const cardCssVariables: Record<CardVariablesKeys, string> = cardsVariables.reduce(
  (acc, cardVariable) => {
    acc[cardVariable] = `var(${getCardCssVariable(cardVariable)})`

    return acc
  },
  {} as Record<CardVariablesKeys, string>,
)
