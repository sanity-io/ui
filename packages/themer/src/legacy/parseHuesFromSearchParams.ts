import {isColor} from '../lib/mix'
import {dropUndefined} from './dropUndefined'
import {Hue, HueMidPoint, PartialHues} from './types'

const HUE_KEYS = ['default', 'primary', 'transparent', 'positive', 'caution', 'critical'] as const

const VALID_MID_POINTS = new Set([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950])

/**
 * Parses hues from the query of a hosted Themer service URL, exactly like
 * `https://themer.sanity.build/api/hues` did — including its validation
 * errors.
 */
export function parseHuesFromSearchParams(searchParams: URLSearchParams): PartialHues {
  const lightest = searchParams.has('lightest')
    ? assertValidColor(`#${(searchParams.get('lightest') ?? '').toLowerCase()}`)
    : undefined
  const darkest = searchParams.get('darkest')
    ? assertValidColor(`#${(searchParams.get('darkest') ?? '').toLowerCase()}`)
    : undefined

  // Filter out undefined values so they don't shadow defaults downstream
  return {
    default: dropUndefined(parseHue('default', searchParams, lightest, darkest)),
    primary: dropUndefined(parseHue('primary', searchParams, lightest, darkest)),
    transparent: dropUndefined(parseHue('transparent', searchParams, lightest, darkest)),
    positive: dropUndefined(parseHue('positive', searchParams, lightest, darkest)),
    caution: dropUndefined(parseHue('caution', searchParams, lightest, darkest)),
    critical: dropUndefined(parseHue('critical', searchParams, lightest, darkest)),
  }
}

function parseHue(
  key: (typeof HUE_KEYS)[number],
  searchParams: URLSearchParams,
  defaultLightest: string | undefined,
  defaultDarkest: string | undefined,
): Partial<Hue> {
  if (!searchParams.has(key)) {
    return {lightest: defaultLightest, darkest: defaultDarkest}
  }
  const input = (searchParams.get(key) ?? '').toLowerCase()

  let mid: string | undefined
  let midPoint: HueMidPoint | undefined
  let lightest: string | undefined
  let darkest: string | undefined
  // format: color;midPoint;lightest:color;darkest:color
  const params = input.split(';')
  if (params.length > 4) {
    throw new TypeError(
      `Invalid number of params for the ${key} hue, it should be 4 or less instead it's ${
        params.length
      }: ${JSON.stringify(params)}`,
    )
  }
  for (const param of params) {
    const maybeMid = `#${param}`
    const maybeMidPoint = roundMidPoint(Number(param))

    switch (true) {
      case param === '':
        break
      case isColor(maybeMid) && !mid:
        mid = maybeMid
        break
      case !Number.isNaN(maybeMidPoint) && !midPoint:
        midPoint = assertValidMidPoint(maybeMidPoint)
        break
      case param.startsWith('lightest:') && !lightest:
        lightest = assertValidColor(`#${param.replace(/^lightest:/, '')}`)
        break
      case param.startsWith('darkest:') && !darkest:
        darkest = assertValidColor(`#${param.replace(/^darkest:/, '')}`)
        break
      // Surface duplicates
      case isColor(maybeMid):
        throwDuplicate(key, mid?.replace(/^#/, ''), param, input)
        break
      case !Number.isNaN(maybeMidPoint):
        throwDuplicate(key, midPoint, maybeMidPoint, input)
        break
      case param.startsWith('lightest:'):
        throwDuplicate(key, lightest?.replace(/^#/, 'lightest:'), param, input)
        break
      case param.startsWith('darkest:'):
        throwDuplicate(key, darkest?.replace(/^#/, 'darkest:'), param, input)
        break
      default:
        // If the parser can't make sense of it we throw to surface that something is wrong with the input
        throw new TypeError(`Invalid param for the ${key} hue: ${param}`)
    }
  }

  return {
    mid,
    midPoint,
    lightest: lightest ?? defaultLightest,
    darkest: darkest ?? defaultDarkest,
  }
}

function roundMidPoint(value: number): number {
  if (value < 75) {
    return 50
  }
  if (value > 925) {
    return 950
  }

  return Math.round(value / 100) * 100
}

function throwDuplicate(key: string, a: unknown, b: unknown, input: string): never {
  throw new TypeError(
    `Duplicate params detected. Remove at least ${
      a === b
        ? `one of the ${JSON.stringify(`${a}`)}`
        : `${JSON.stringify(`${a}`)} or ${JSON.stringify(`${b}`)}`
    } from the ${key} hue: ${JSON.stringify(input)}`,
  )
}

function assertValidColor(input: string): string {
  if (isColor(input)) {
    return input
  }
  throw new TypeError(`Invalid color: ${input}`)
}

function assertValidMidPoint(input: number): HueMidPoint {
  if (isMidPoint(input)) {
    return input
  }
  throw new TypeError(`Invalid midPoint: ${input}`)
}

function isMidPoint(input: number): input is HueMidPoint {
  return VALID_MID_POINTS.has(input)
}
