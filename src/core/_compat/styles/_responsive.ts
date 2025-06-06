import type {CSSObject} from '@sanity/ui/theme'

/**
 * @internal
 * @deprecated do not use
 */
export function _responsive<T>(
  media: number[],
  values: T[],
  callback: (value: T, index: number, array: T[]) => CSSObject,
): CSSObject[] {
  const statements = values?.map(callback) || []

  return statements.map((statement, mediaIndex) => {
    if (mediaIndex === 0) return statement

    return {[`@media screen and (min-width: ${media[mediaIndex - 1]}px)`]: statement}
  })
}
