import {dropUndefined} from './dropUndefined'
import {black, white} from './palette'
import {Hues, PartialHues} from './types'

const lightest = white.hex.toLowerCase()
const darkest = black.hex.toLowerCase()

/**
 * The hues of the default Studio theme, matching the `default` preset of the
 * hosted Themer service.
 */
export const defaultHues: Hues = {
  default: {
    lightest,
    darkest,
    mid: '#8690a0',
    midPoint: 500,
  },
  primary: {
    lightest,
    darkest,
    mid: '#2276fc',
    midPoint: 500,
  },
  transparent: {
    lightest,
    darkest,
    mid: '#8690a0',
    midPoint: 500,
  },
  positive: {
    lightest,
    darkest,
    mid: '#43d675',
    midPoint: 400,
  },
  caution: {
    lightest,
    darkest,
    mid: '#fbd024',
    midPoint: 300,
  },
  critical: {
    lightest,
    darkest,
    mid: '#f03e2f',
    midPoint: 500,
  },
}

/**
 * Merges partial hues over the defaults, exactly like the hosted Themer
 * service did. When a hue's `mid` color is customized without an explicit
 * `midPoint`, the mid point resets to `500`.
 */
export function applyHues(_hues: PartialHues, defaults: Hues = defaultHues): Hues {
  // Filter out undefined values so they don't shadow the defaults when spread
  const hues: PartialHues = {
    default: dropUndefined(_hues.default),
    primary: dropUndefined(_hues.primary),
    transparent: dropUndefined(_hues.transparent),
    positive: dropUndefined(_hues.positive),
    caution: dropUndefined(_hues.caution),
    critical: dropUndefined(_hues.critical),
  }

  const defaultMid = hues.default?.mid?.toLowerCase() || defaults.default.mid
  const primaryMid = hues.primary?.mid?.toLowerCase() || defaults.primary.mid
  const transparentMid = hues.transparent?.mid?.toLowerCase() || defaults.transparent.mid
  const positiveMid = hues.positive?.mid?.toLowerCase() || defaults.positive.mid
  const cautionMid = hues.caution?.mid?.toLowerCase() || defaults.caution.mid
  const criticalMid = hues.critical?.mid?.toLowerCase() || defaults.critical.mid

  return {
    default: {
      ...defaults.default,
      midPoint: defaultMid === defaults.default.mid ? defaults.default.midPoint : 500,
      ...hues.default,
      mid: defaultMid,
    },
    primary: {
      ...defaults.primary,
      midPoint: primaryMid === defaults.primary.mid ? defaults.primary.midPoint : 500,
      ...hues.primary,
      mid: primaryMid,
    },
    transparent: {
      ...defaults.transparent,
      midPoint: transparentMid === defaults.transparent.mid ? defaults.transparent.midPoint : 500,
      ...hues.transparent,
      mid: transparentMid,
    },
    positive: {
      ...defaults.positive,
      midPoint: positiveMid === defaults.positive.mid ? defaults.positive.midPoint : 500,
      ...hues.positive,
      mid: positiveMid,
    },
    caution: {
      ...defaults.caution,
      midPoint: cautionMid === defaults.caution.mid ? defaults.caution.midPoint : 500,
      ...hues.caution,
      mid: cautionMid,
    },
    critical: {
      ...defaults.critical,
      midPoint: criticalMid === defaults.critical.mid ? defaults.critical.midPoint : 500,
      ...hues.critical,
      mid: criticalMid,
    },
  }
}
