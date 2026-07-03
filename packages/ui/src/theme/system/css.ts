import type * as CSS from 'csstype'

/**
 * A CSS-in-JS style object: standard CSS properties plus an index signature that allows nested
 * selectors, at-rules and custom properties.
 *
 * This is a self-owned definition (based on `csstype`) so the published `.d.ts` types stay fully
 * controlled by us and do not reference any external CSS-in-JS library types.
 *
 * @internal
 */
export interface CSSObject extends CSS.Properties<number | (string & {})> {
  [key: string]: CSSObject | string | number | undefined
}
