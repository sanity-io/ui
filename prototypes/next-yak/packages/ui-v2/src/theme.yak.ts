/**
 * Design tokens as CSS custom property references.
 *
 * `*.yak.ts` modules are evaluated by the next-yak compiler at build time (isolated-source-eval),
 * so every `${vars.x.y}` interpolation in a `styled`/`css` literal is inlined into the static CSS
 * as `var(--sui-...)`. At runtime this is an ordinary module: `ThemeProvider` imports the same
 * token names to assign values, so component CSS and theme values can never drift apart.
 */

export const tones = ['default', 'primary', 'positive', 'caution', 'critical'] as const
export type Tone = (typeof tones)[number]

export const modes = ['default', 'ghost', 'bleed'] as const
export type Mode = (typeof modes)[number]

export const spaceScale = [0, 1, 2, 3, 4, 5] as const
export type SpaceKey = (typeof spaceScale)[number]

export const radiusScale = [0, 1, 2, 3] as const
export type RadiusKey = (typeof radiusScale)[number]

export interface ToneVars {
  /** Background of a `mode="default"` button */
  bg: string
  /** Foreground on top of `bg` */
  fg: string
  /** Border and focus ring base */
  border: string
  /** Hovered background (`mode="default"`) */
  hoverBg: string
  /** Pressed / selected background (`mode="default"`) */
  pressedBg: string
  /** Foreground for `ghost`/`bleed` modes (sits on the surface, so needs more contrast) */
  text: string
  /** Hovered background for `ghost`/`bleed` modes */
  tintBg: string
}

const cssVar = (name: string): string => `var(--sui-${name})`

const toneVars = (tone: Tone): ToneVars => ({
  bg: cssVar(`${tone}-bg`),
  fg: cssVar(`${tone}-fg`),
  border: cssVar(`${tone}-border`),
  hoverBg: cssVar(`${tone}-hover-bg`),
  pressedBg: cssVar(`${tone}-pressed-bg`),
  text: cssVar(`${tone}-text`),
  tintBg: cssVar(`${tone}-tint-bg`),
})

export const vars = {
  color: {
    /** Page/card surface */
    bg: cssVar('bg'),
    fg: cssVar('fg'),
    border: cssVar('border'),
    focusRing: cssVar('focus-ring'),
    tone: {
      default: toneVars('default'),
      primary: toneVars('primary'),
      positive: toneVars('positive'),
      caution: toneVars('caution'),
      critical: toneVars('critical'),
    } satisfies Record<Tone, ToneVars>,
  },
  space: {
    0: cssVar('space-0'),
    1: cssVar('space-1'),
    2: cssVar('space-2'),
    3: cssVar('space-3'),
    4: cssVar('space-4'),
    5: cssVar('space-5'),
  } satisfies Record<SpaceKey, string>,
  radius: {
    0: cssVar('radius-0'),
    1: cssVar('radius-1'),
    2: cssVar('radius-2'),
    3: cssVar('radius-3'),
  } satisfies Record<RadiusKey, string>,
  font: {
    family: cssVar('font-family'),
    size: cssVar('font-size'),
    lineHeight: cssVar('line-height'),
    weight: {
      regular: cssVar('font-weight-regular'),
      medium: cssVar('font-weight-medium'),
      semibold: cssVar('font-weight-semibold'),
    },
  },
  focusRing: {
    width: cssVar('focus-ring-width'),
    offset: cssVar('focus-ring-offset'),
  },
} as const

// Note: a `*.yak.ts` module is evaluated in a worker and its exports are posted back with
// structured clone, so it can only export data (strings, numbers, arrays, plain objects) — no
// functions. Helpers that work on tokens live in `theme.tsx`.
