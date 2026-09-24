/**
 * Matches `#abc` and `#aabbcc` hex colors (the only formats the theme
 * generators accept), same as the hosted Themer service did.
 *
 * The `mix` function this module was named for moved to `@sanity/themer-legacy`
 * along with the legacy generator; `isColor` stays here for `theme/options.ts`
 * and `tool/storage.ts`.
 *
 * @internal
 */
export function isColor(input: string): boolean {
  return /^#(?:[0-9a-f]{3}){1,2}$/i.test(input)
}
