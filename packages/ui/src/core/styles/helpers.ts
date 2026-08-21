import {css} from 'styled-components'

import {CSSObject} from '../../theme/system/css'
import {Theme} from '../../theme/system/theme'
import {getTheme_v2} from '../../theme/versioning/getTheme_v2'
import {EMPTY_ARRAY} from '../constants'

const EMPTY_CSS_OBJECT: CSSObject = {}

/**
 * Tags a list of style chunks (CSS objects, style functions, or nested rules)
 * through the styled-components `css` helper so the result is accepted as a
 * function-interpolation return value by both styled-components v6 and v7.
 *
 * v6 recursively flattened plain arrays returned from style functions, but v7
 * only resolves composite returns that carry `css` metadata — a plain array
 * makes the component render without any styles. The leading empty object
 * satisfies the `css(styles, ...interpolations)` signature (the first argument
 * must be an object, function, or template) and contributes no output, so the
 * emitted CSS is byte-identical to the v6 plain-array form.
 *
 * The result is declared as `CSSObject[]` (which it is at runtime — a rule
 * array) to keep styled-components types out of the public type surface.
 *
 * @internal
 */
export function _ruleSet(...rules: unknown[]): CSSObject[] {
  // oxlint-disable-next-line no-unsafe-type-assertion
  return css(EMPTY_CSS_OBJECT, ...(rules as [])) as unknown as CSSObject[]
}

/**
 * @internal
 */
export function _fillCSSObject(keys: string[], value: string | number | CSSObject): CSSObject {
  return keys.reduce<CSSObject>((style, key) => {
    style[key] = value

    return style
  }, {})
}

/**
 * @public
 */
export function rem(pixelValue: number): string | 0 {
  if (pixelValue === 0) return 0

  return `${pixelValue / 16}rem`
}

/**
 * Builds the per-breakpoint styles as a single CSS object (base declarations
 * merged with `@media` keys) instead of a plain array. Plain objects are
 * resolved natively by both styled-components v6 and v7, whereas v7 drops
 * plain arrays returned from function interpolations. The emitted CSS is
 * byte-identical to the previous array form. Declared as `CSSObject[]` for
 * backwards compatibility with existing consumers of this internal helper.
 *
 * @internal
 */
export function _responsive<T>(
  media: number[],
  values: T[],
  callback: (value: T, index: number, array: T[]) => CSSObject,
): CSSObject[] {
  const statements = values?.map(callback) || []
  const merged: CSSObject = {}

  statements.forEach((statement, mediaIndex) => {
    if (mediaIndex === 0) {
      Object.assign(merged, statement)
    } else {
      merged[`@media screen and (min-width: ${media[mediaIndex - 1]}px)`] = statement
    }
  })

  // oxlint-disable-next-line no-unsafe-type-assertion
  return merged as unknown as CSSObject[]
}

/**
 * @internal
 */
export function _getArrayProp<T = number>(val: T | T[] | undefined, defaultVal?: T[]): T[] {
  if (val === undefined) return defaultVal || EMPTY_ARRAY

  return Array.isArray(val) ? val : [val]
}

/**
 * @internal
 */
export function _getResponsiveSpace(
  theme: Theme,
  props: string[],
  spaceIndexes: number[] = EMPTY_ARRAY,
): CSSObject[] | null {
  if (!Array.isArray(spaceIndexes)) {
    throw new Error('the property must be array of numbers')
  }

  if (spaceIndexes.length === 0) {
    return null
  }

  const {media, space} = getTheme_v2(theme)

  return _responsive(media, spaceIndexes, (spaceIndex) =>
    _fillCSSObject(props, rem(space[spaceIndex])),
  )
}
