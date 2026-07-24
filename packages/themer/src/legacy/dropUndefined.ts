import {Hue} from './types'

/**
 * Drops properties that are set to `undefined`, so that spreading the hue
 * over defaults doesn't shadow them. The hosted Themer service used a
 * `JSON.parse(JSON.stringify(…))` round trip for this.
 */
export function dropUndefined(hue: Partial<Hue> | undefined): Partial<Hue> | undefined {
  if (!hue) return undefined

  const result: Partial<Hue> = {}

  if (hue.mid !== undefined) result.mid = hue.mid
  if (hue.midPoint !== undefined) result.midPoint = hue.midPoint
  if (hue.lightest !== undefined) result.lightest = hue.lightest
  if (hue.darkest !== undefined) result.darkest = hue.darkest

  return result
}
