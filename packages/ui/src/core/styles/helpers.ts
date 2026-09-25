import {css} from 'styled-components'

import {CSSObject} from '../../theme/system/css'
import {Theme} from '../../theme/system/theme'
import {getTheme_v2} from '../../theme/versioning/getTheme_v2'
import {EMPTY_ARRAY} from '../constants'

const EMPTY_CSS_OBJECT: CSSObject = {}

/**
 * Tags style chunks with the metadata required for v7 function interpolations.
 * The `CSSObject[]` return type avoids exposing styled-components types.
 *
 * @internal
 */
export function _ruleSet(...rules: unknown[]): CSSObject[] {
  // oxlint-disable-next-line no-unsafe-type-assertion
  return css(EMPTY_CSS_OBJECT, ...(rules as never[])) as unknown as CSSObject[]
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
 * Builds a spreadable, v7-compatible rule array for responsive styles.
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
