/**
 * Things `tsc` does NOT catch with StyleX 0.19.1 types. Each line compiles;
 * the comment says which other layer (if any) catches it.
 */
import * as stylex from '@stylexjs/stylex'

export const gaps = stylex.create({
  // typo in a CSS property name: `UserAuthoredStyles` is a union with
  // `{[key: string]: NotUndefined}`, so unknown keys type-check.
  // Caught by `@stylexjs/eslint-plugin` (`valid-styles`), not by tsc or the compiler.
  a: {colr: 'red'},
  // typo in a pseudo-class: keys are typed as `:${string}` / `@${string}`.
  // Caught by `@stylexjs/eslint-plugin`.
  b: {color: {default: 'red', ':hovr': 'blue'}},
  // a value that is not valid CSS for the property compiles: value types are
  // mostly `string | number` unions (csstype-like), e.g. `color: 'not-a-color'`.
  c: {color: 'not-a-color'},
  // wrong value *types* also compile for the same reason (the index-signature
  // member of the union absorbs the whole object literal).
  d: {display: 123},
  e: {zIndex: 'high'},
})

// Docs mismatch: the documented `StyleXStylesWithout<{display: unknown}>` does
// not satisfy the type's own constraint under `strict` (`unknown` is not
// `{} | null`); `{display: string}` works and restricts the key just the same.

// A string that happens to be a `var()` reference is accepted anywhere a token
// is — tokens are `string`-typed `var(--hash)` references, not branded types.
// (StyleX `types.color()` etc. exist for typed `@property` declarations.)
export const untypedVarReference = stylex.create({
  a: {color: 'var(--anything)'},
})
