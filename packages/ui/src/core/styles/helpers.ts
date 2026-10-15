import {css, type Interpolation, type RuleSet} from 'styled-components'

import {CSSObject} from '../../theme/system/css'
import {Theme} from '../../theme/system/theme'
import {getTheme_v2} from '../../theme/versioning/getTheme_v2'
import {EMPTY_ARRAY} from '../constants'

/**
 * Types a rule set as `CSSObject[]`, so that the published types don't reference
 * styled-components.
 *
 * @internal
 */
export function _ruleSet<Props extends object>(rules: RuleSet<Props>): CSSObject[] {
  // oxlint-disable-next-line no-unsafe-type-assertion
  return rules as unknown as CSSObject[]
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
 * Applies the rules for each value after the first from the breakpoint before it.
 *
 * Folds the rules into nested templates, since styled-components v7 rejects arrays as
 * interpolations.
 *
 * @internal
 */
export function responsiveRules<T>(
  media: number[],
  values: T[] | undefined,
  callback: (value: T, index: number, array: T[]) => Interpolation<object>,
): ReturnType<typeof css> {
  return (values ?? EMPTY_ARRAY).reduce<ReturnType<typeof css>>(
    (rules, value, index, array) =>
      index === 0
        ? css`
            ${rules}
            ${callback(value, index, array)}
          `
        : css`
            ${rules}

            @media screen and (min-width: ${media[index - 1]}px) {
              ${callback(value, index, array)}
            }
          `,
    css``,
  )
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
  return _ruleSet(responsiveRules(media, values, callback))
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

/**
 * Sets each of `properties` to the theme space at each index, per breakpoint.
 *
 * @internal
 */
export function responsiveSpace(
  theme: Theme,
  properties: string[],
  spaceIndexes: number[] | undefined,
): ReturnType<typeof css> | null {
  if (!spaceIndexes?.length) return null

  const {media, space} = getTheme_v2(theme)

  return responsiveRules(media, spaceIndexes, (spaceIndex) =>
    properties.map((property) => `${property}: ${rem(space[spaceIndex])};`).join(''),
  )
}
