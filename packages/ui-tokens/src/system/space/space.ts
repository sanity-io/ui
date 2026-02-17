import {_fromEntries} from '../_fromEntries'
import {_rem} from '../_rem'
import type {SanityDimensionToken} from '../_sanity/schema'
import type {TokenCollection} from '../types'
import type {Space} from './types'

/**
 * Namespace identifier for the space collection.
 */
export const SPACE_NAMESPACE = 'space'

/**
 * Space collection token structure.
 */
export interface SpaceCollectionTokens {
  [SPACE_NAMESPACE]: Record<Space, SanityDimensionToken>
}

/**
 * Space collection type definition.
 */
export type SpaceCollection = TokenCollection<
  typeof SPACE_NAMESPACE,
  'default',
  SpaceCollectionTokens
>

/**
 * The space collection for spacing scale tokens.
 *
 * @remarks
 * Provides a Fibonacci-based spacing scale for consistent spacing throughout the UI.
 *
 * **Scale (in pixels at 16px base):**
 * - `0`: 0px (0rem)
 * - `1`: 4px (0.25rem)
 * - `2`: 8px (0.5rem)
 * - `3`: 12px (0.75rem)
 * - `4`: 20px (1.25rem)
 * - `5`: 32px (2rem)
 * - `6`: 52px (3.25rem)
 * - `7`: 84px (5.25rem)
 * - `8`: 136px (8.5rem)
 * - `9`: 220px (13.75rem)
 *
 * **Figma Scopes:**
 * All space tokens include `gap` scope for use in Figma auto-layout gap properties.
 *
 * @example
 * ```ts
 * spaceCollection.modes.default.space[3] // 12px (0.75rem)
 * spaceCollection.modes.default.space[5] // 32px (2rem)
 * ```
 */
export const spaceCollection: SpaceCollection = {
  namespace: SPACE_NAMESPACE,
  title: 'Space',
  modes: {
    default: {
      [SPACE_NAMESPACE]: {
        0: _rem(0, {scopes: ['gap']}),
        1: _rem(4, {scopes: ['gap']}),
        2: _rem(8, {scopes: ['gap']}),
        3: _rem(12, {scopes: ['gap']}),
        4: _rem(20, {scopes: ['gap']}),
        5: _rem(32, {scopes: ['gap']}),
        6: _rem(52, {scopes: ['gap']}),
        7: _rem(84, {scopes: ['gap']}),
        8: _rem(136, {scopes: ['gap']}),
        9: _rem(220, {scopes: ['gap']}),
      },
    },
  },
}
