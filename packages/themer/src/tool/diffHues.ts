import {hues as defaultHues} from '../legacy/defaults'
import {Hue, Hues, PartialHues} from '../legacy/types'
import {HUE_KEYS} from './hues'

/**
 * Reduces resolved hues to the minimal `PartialHues` that recreates them
 * through the legacy `createTheme`. The subtlety is `applyHues`' quirk of
 * resetting a customized `mid`'s mid point to 500: whenever `mid` is included,
 * the baseline for `midPoint` is 500 rather than the hue's default.
 *
 * @internal
 */
export function diffHues(hues: Hues): PartialHues {
  const diff: PartialHues = {}

  for (const key of HUE_KEYS) {
    const hue = hues[key]
    const base = defaultHues[key]
    const patch: Partial<Hue> = {}

    if (hue.mid.toLowerCase() !== base.mid) {
      patch.mid = hue.mid.toLowerCase()
    }

    const impliedMidPoint = patch.mid === undefined ? base.midPoint : 500

    if (hue.midPoint !== impliedMidPoint) {
      patch.midPoint = hue.midPoint
    }

    if (hue.lightest.toLowerCase() !== base.lightest) {
      patch.lightest = hue.lightest.toLowerCase()
    }

    if (hue.darkest.toLowerCase() !== base.darkest) {
      patch.darkest = hue.darkest.toLowerCase()
    }

    if (Object.keys(patch).length > 0) {
      diff[key] = patch
    }
  }

  return diff
}
