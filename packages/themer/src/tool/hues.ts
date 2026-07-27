import {Hue, HueMidPoint, Hues} from '../legacy/types'

/**
 * The six hues in the order the hosted Themer service listed them, used for
 * the sidebar's editors and the generated snippet alike.
 *
 * @internal
 */
export const HUE_KEYS = [
  'default',
  'primary',
  'transparent',
  'positive',
  'caution',
  'critical',
] as const satisfies ReadonlyArray<keyof Hues>

/** @internal */
export type HueKey = (typeof HUE_KEYS)[number]

/** @internal */
export interface HueField {
  key: HueKey
  title: string
  description: string
}

/**
 * The editor sections of the sidebar, one per hue.
 *
 * @internal
 */
export const HUE_FIELDS: HueField[] = [
  {key: 'default', title: 'Default', description: 'Text, icons and most surfaces'},
  {key: 'primary', title: 'Primary', description: 'Focus rings, links and primary buttons'},
  {key: 'transparent', title: 'Transparent', description: 'The backdrop behind panes'},
  {key: 'positive', title: 'Positive', description: 'Success badges and prompts'},
  {key: 'caution', title: 'Caution', description: 'Warnings and draft indicators'},
  {key: 'critical', title: 'Critical', description: 'Errors and destructive actions'},
]

/**
 * The tints a hue's `mid` color can sit at, matching the hosted Themer
 * service's mid point options.
 *
 * @internal
 */
export const MID_POINTS: readonly HueMidPoint[] = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
]

/** The properties of a `Hue`, in serialization order */
const HUE_PROPERTIES = ['mid', 'midPoint', 'lightest', 'darkest'] as const satisfies ReadonlyArray<
  keyof Hue
>

/** @internal */
export function sameHues(a: Hues, b: Hues): boolean {
  return HUE_KEYS.every((key) =>
    HUE_PROPERTIES.every((property) => {
      const left = a[key][property]
      const right = b[key][property]

      return typeof left === 'string' && typeof right === 'string'
        ? left.toLowerCase() === right.toLowerCase()
        : left === right
    }),
  )
}
