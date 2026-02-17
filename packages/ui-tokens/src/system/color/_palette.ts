import {
  black,
  COLOR_HUES,
  COLOR_TINTS,
  type ColorHueKey,
  type ColorTintKey,
  hues,
  white,
} from '@sanity/color'

import {colorToken} from '../_dtcg/creators'
import type {DTCGColorToken} from '../_dtcg/schema'
import {_fromEntries} from '../_fromEntries'
import type {TokenCollection} from '../types'
import {_colorToDTCGColorValue} from './_convert'

/**
 * Namespace identifier for the palette collection.
 * @internal
 */
export const PALETTE_NAMESPACE = '_palette'

/**
 * Palette token structure containing literal color values.
 * @internal
 */
export type PaletteTokens = {
  black: DTCGColorToken
  white: DTCGColorToken
} & Record<ColorHueKey, Record<ColorTintKey, DTCGColorToken>>

/**
 * Palette collection tokens wrapped in the palette namespace.
 * @internal
 */
export interface PaletteCollectionTokens {
  [PALETTE_NAMESPACE]: PaletteTokens
}

/**
 * Palette collection type definition.
 * @internal
 */
export type PaletteCollection = TokenCollection<
  typeof PALETTE_NAMESPACE,
  'default',
  PaletteCollectionTokens
>

/**
 * The palette collection containing all literal color values.
 *
 * @remarks
 * This is the **only** collection containing raw hex/RGB color values.
 * All other collections reference these values through aliases.
 *
 * Structure:
 * - `black` and `white` base colors
 * - 15 color hues (red, orange, yellow, green, cyan, blue, purple, magenta, gray, etc.)
 * - 11 tint levels per hue (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950)
 *
 * @example
 * ```ts
 * paletteCollection.modes.default._palette.black // #000000
 * paletteCollection.modes.default._palette.gray[500] // middle gray
 * paletteCollection.modes.default._palette.blue[600] // darker blue
 * ```
 *
 * @internal
 */
export const paletteCollection: PaletteCollection = {
  namespace: PALETTE_NAMESPACE,
  title: 'Palette',
  modes: {
    default: {
      [PALETTE_NAMESPACE]: {
        black: colorToken(_colorToDTCGColorValue(black.hex)),
        white: colorToken(_colorToDTCGColorValue(white.hex)),

        ..._fromEntries(
          COLOR_HUES.map((hue) => [
            hue,
            {
              ..._fromEntries(
                COLOR_TINTS.map((tint) => [
                  tint,
                  colorToken(_colorToDTCGColorValue(hues[hue][tint].hex)),
                ]),
              ),
            },
          ]),
        ),
      },
    },
  },
}
