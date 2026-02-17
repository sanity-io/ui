import type {
  DTCGColorToken,
  DTCGDurationToken,
  DTCGShadowToken,
  DTCGStringToken,
} from './_dtcg/schema'
import type {SanityDimensionToken, SanityNumberToken} from './_sanity/schema'
import type {SanityColorToken} from './color/schema'
import type {
  SanityFontFamilyToken,
  SanityFontStyleToken,
  SanityFontWeightToken,
} from './font/schema'

/**
 * A token leaf node conforming to DTCG format with optional Sanity extensions.
 *
 * @internal
 */
export type TokenLeaf =
  | SanityColorToken
  | SanityDimensionToken
  | SanityFontFamilyToken
  | SanityFontWeightToken
  | SanityFontStyleToken
  | SanityNumberToken
  | DTCGColorToken
  | DTCGDurationToken
  | DTCGStringToken
  | DTCGShadowToken

/**
 * A recursive tree structure containing tokens or nested token trees.
 *
 * @internal
 */
export type TokenTree = {
  [key: string | number]: TokenLeaf | TokenTree
}

/**
 * A token collection in the resolution pipeline.
 *
 * Collections are organized by modes (contextual variants) and contain
 * token trees namespaced by the collection's namespace.
 *
 * @typeParam Namespace - The collection namespace (e.g., "_palette", "_colorScheme", "color")
 * @typeParam ModeValue - The mode value type (e.g., "light" | "dark" for colorScheme, "default" for unmoded)
 * @typeParam Tokens - The token tree structure for this collection
 *
 * @remarks
 * - Internal collections are prefixed with `_` (e.g., "_palette", "_core")
 * - Public collections have no prefix (e.g., "color", "space")
 * - Unmoded collections use "default" as their single mode value
 * - Collection titles are stable and used for tooling (Figma, CSS themes)
 *
 * @example
 * ```ts
 * const colorSchemeCollection: TokenCollection<
 *   "_colorScheme",
 *   "light" | "dark",
 *   ColorSchemeTokens
 * > = {
 *   namespace: "_colorScheme",
 *   title: "Color scheme",
 *   modes: {
 *     light: { _colorScheme: { ... } },
 *     dark: { _colorScheme: { ... } }
 *   }
 * }
 * ```
 *
 * @internal
 */
export type TokenCollection<
  Namespace extends string = string,
  ModeValue extends string = string,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Tokens extends {} = TokenTree,
> = {
  /**
   * The namespace identifier for the collection.
   *
   * MUST match the top-level key inside `tokens` and be used in alias references.
   *
   * @example
   * - Internal: "_palette", "_core", "_colorScheme", "_cardTone", "_elementTone", "_avatarColor"
   * - Public: "color", "space", "font", "shadow", "radius", "avatar", etc.
   */
  namespace: Namespace

  /**
   * The display title of the collection.
   *
   * Used for human-readable references in tooling, documentation, and Figma.
   *
   * @example
   * - "Palette", "Color scheme", "Card tone", "Color", "Space"
   */
  title: string

  /**
   * Tokens organized by mode value.
   *
   * Each mode value maps to a token tree namespaced by the collection's namespace.
   *
   * @remarks
   * - Unmoded collections have a single "default" mode
   * - Moded collections have multiple mode values (e.g., "light" | "dark")
   * - Mode values are stable and part of the public contract
   *
   * @example
   * ```ts
   * modes: {
   *   light: { _colorScheme: { color: { ... } } },
   *   dark: { _colorScheme: { color: { ... } } }
   * }
   * ```
   */
  modes: Record<ModeValue, Tokens>
}
