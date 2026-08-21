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
 * Builds the per-breakpoint styles (the base statement plus one `@media` block
 * per following breakpoint) as a rule array tagged through {@link _ruleSet}.
 * The result is still an array (spreading and composing keep working), but it
 * carries the `css` helper's metadata that styled-components v7 requires for
 * function-interpolation return values — v7 drops plain arrays, rendering the
 * component without any styles. The emitted CSS is byte-identical to the
 * previous plain-array form on both majors.
 *
 * @internal
 */
export function _responsive<T>(
  media: number[],
  values: T[],
  callback: (value: T, index: number, array: T[]) => CSSObject,
): CSSObject[] {
  const statements = values?.map(callback) || []

  return _ruleSet(
    ...statements.map((statement, mediaIndex) => {
      if (mediaIndex === 0) return statement

      return {[`@media screen and (min-width: ${media[mediaIndex - 1]}px)`]: statement}
    }),
  )
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
