import {type ThemeColorSchemeKey} from '@sanity/ui/theme'

import {hexToHsl, hslToHex, relativeLuminance} from '../theme/hsl'
import {BuildThemeOptions, DEFAULT_BACKGROUND, SCHEMES, SchemeThemeOptions} from '../theme/options'

/**
 * The swatches of an image palette — the same set the Sanity image pipeline
 * derives for uploaded assets (`metadata.palette`), extracted on device here.
 *
 * @internal
 */
export type ImagePaletteKey =
  | 'dominant'
  | 'vibrant'
  | 'lightVibrant'
  | 'darkVibrant'
  | 'muted'
  | 'lightMuted'
  | 'darkMuted'

/**
 * An image palette: a hex color per swatch, or `null` when the image has no
 * color that qualifies for it.
 *
 * @internal
 */
export type ImagePalette = Record<ImagePaletteKey, string | null>

/** @internal */
export const IMAGE_PALETTE_KEYS: ImagePaletteKey[] = [
  'vibrant',
  'lightVibrant',
  'darkVibrant',
  'muted',
  'lightMuted',
  'darkMuted',
  'dominant',
]

/**
 * The swatches a theme can be built around — every swatch but the dominant
 * one, which only repeats one of them.
 *
 * @internal
 */
export type ImagePaletteVariant = Exclude<ImagePaletteKey, 'dominant'>

/** The variants in the order the tool offers them @internal */
export const IMAGE_PALETTE_VARIANTS: ImagePaletteVariant[] = [
  'muted',
  'vibrant',
  'lightMuted',
  'lightVibrant',
  'darkMuted',
  'darkVibrant',
]

/** @internal */
export const IMAGE_PALETTE_TITLES: Record<ImagePaletteKey, string> = {
  dominant: 'Dominant',
  vibrant: 'Vibrant',
  lightVibrant: 'Light vibrant',
  darkVibrant: 'Dark vibrant',
  muted: 'Muted',
  lightMuted: 'Light muted',
  darkMuted: 'Dark muted',
}

/** Pixels the way a canvas hands them out: rows of RGBA bytes @internal */
export interface PixelData {
  data: ArrayLike<number>
  width: number
  height: number
}

interface Bucket {
  count: number
  r: number
  g: number
  b: number
}

interface Candidate {
  hex: string
  population: number
  saturation: number
  lightness: number
}

/** What a swatch looks for: a lightness and saturation to aim at, within bounds */
interface Target {
  lightness: [target: number, min: number, max: number]
  saturation: [target: number, min: number, max: number]
}

/**
 * The swatch targets of the Vibrant algorithm (the one behind Sanity's image
 * palettes), in the order they get to claim colors.
 */
const TARGETS: Array<[key: Exclude<ImagePaletteKey, 'dominant'>, target: Target]> = [
  ['vibrant', {lightness: [0.5, 0.3, 0.7], saturation: [1, 0.35, 1]}],
  ['lightVibrant', {lightness: [0.74, 0.55, 1], saturation: [1, 0.35, 1]}],
  ['darkVibrant', {lightness: [0.26, 0, 0.45], saturation: [1, 0.35, 1]}],
  ['muted', {lightness: [0.5, 0.3, 0.7], saturation: [0.3, 0, 0.4]}],
  ['lightMuted', {lightness: [0.74, 0.55, 1], saturation: [0.3, 0, 0.4]}],
  ['darkMuted', {lightness: [0.26, 0, 0.45], saturation: [0.3, 0, 0.4]}],
]

const SATURATION_WEIGHT = 3
const LIGHTNESS_WEIGHT = 6.5
const POPULATION_WEIGHT = 0.5

/** Pixels this transparent are not part of the picture */
const MINIMUM_ALPHA = 125

/** Near-black and near-white pixels are backdrop rather than color */
const MINIMUM_LIGHTNESS = 0.05
const MAXIMUM_LIGHTNESS = 0.95

/** How many of the 8 bits per channel survive the quantization */
const QUANTIZE_BITS = 5

/**
 * Extracts the color palette of an image from its pixels, the way the Vibrant
 * algorithm does: the colors are quantized into a coarse histogram, and each
 * swatch claims the color that comes closest to its target lightness and
 * saturation — weighted by how much of the image it covers — that no other
 * swatch has claimed yet. The dominant swatch is simply the most common
 * color. Runs anywhere pixels come from, so it can run on device.
 *
 * @internal
 */
export function extractImagePalette(pixels: PixelData): ImagePalette {
  const candidates = quantize(pixels)
  const palette: ImagePalette = {
    dominant: null,
    vibrant: null,
    lightVibrant: null,
    darkVibrant: null,
    muted: null,
    lightMuted: null,
    darkMuted: null,
  }

  if (candidates.length === 0) return palette

  const maximumPopulation = Math.max(...candidates.map((candidate) => candidate.population))
  const claimed = new Set<string>()

  for (const [key, target] of TARGETS) {
    let best: Candidate | null = null
    let bestScore = -Infinity

    for (const candidate of candidates) {
      if (claimed.has(candidate.hex) || !matchesTarget(candidate, target)) continue

      const score = scoreCandidate(candidate, target, maximumPopulation)

      if (score > bestScore) {
        best = candidate
        bestScore = score
      }
    }

    if (best) {
      palette[key] = best.hex
      claimed.add(best.hex)
    }
  }

  palette.dominant = candidates.reduce((most, candidate) =>
    candidate.population > most.population ? candidate : most,
  ).hex

  return palette
}

/**
 * Turns the pixels into a histogram of quantized colors, each averaged over
 * the pixels it stands for, leaving out transparent pixels and the near-black
 * and near-white ones that are backdrop rather than color.
 */
function quantize(pixels: PixelData): Candidate[] {
  const {data} = pixels
  const buckets = new Map<number, Bucket>()
  const shift = 8 - QUANTIZE_BITS
  const length = Math.min(data.length, pixels.width * pixels.height * 4)

  for (let offset = 0; offset + 3 < length; offset += 4) {
    const r = data[offset]
    const g = data[offset + 1]
    const b = data[offset + 2]
    const a = data[offset + 3]

    if (a < MINIMUM_ALPHA) continue

    const lightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 510

    if (lightness < MINIMUM_LIGHTNESS || lightness > MAXIMUM_LIGHTNESS) continue

    const key =
      ((r >> shift) << (QUANTIZE_BITS * 2)) | ((g >> shift) << QUANTIZE_BITS) | (b >> shift)
    const bucket = buckets.get(key)

    if (bucket) {
      bucket.count++
      bucket.r += r
      bucket.g += g
      bucket.b += b
    } else {
      buckets.set(key, {count: 1, r, g, b})
    }
  }

  const candidates: Candidate[] = []

  for (const bucket of buckets.values()) {
    const r = Math.round(bucket.r / bucket.count)
    const g = Math.round(bucket.g / bucket.count)
    const b = Math.round(bucket.b / bucket.count)
    const {saturation, lightness} = saturationAndLightness(r, g, b)

    candidates.push({hex: rgbToHex(r, g, b), population: bucket.count, saturation, lightness})
  }

  return candidates
}

function matchesTarget(candidate: Candidate, target: Target): boolean {
  return (
    candidate.lightness >= target.lightness[1] &&
    candidate.lightness <= target.lightness[2] &&
    candidate.saturation >= target.saturation[1] &&
    candidate.saturation <= target.saturation[2]
  )
}

function scoreCandidate(candidate: Candidate, target: Target, maximumPopulation: number): number {
  return (
    SATURATION_WEIGHT * (1 - Math.abs(candidate.saturation - target.saturation[0])) +
    LIGHTNESS_WEIGHT * (1 - Math.abs(candidate.lightness - target.lightness[0])) +
    POPULATION_WEIGHT * (candidate.population / maximumPopulation)
  )
}

function saturationAndLightness(r: number, g: number, b: number) {
  const max = Math.max(r, g, b) / 255
  const min = Math.min(r, g, b) / 255
  const lightness = (max + min) / 2
  const delta = max - min
  const saturation =
    delta === 0 ? 0 : lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)

  return {saturation, lightness}
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
}

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

/** Mixes `amount` of `color` into `base` */
function tint(base: string, color: string, amount: number): string {
  const [r1, g1, b1] = hexToRgb(base)
  const [r2, g2, b2] = hexToRgb(color)

  return rgbToHex(
    Math.round(r1 + (r2 - r1) * amount),
    Math.round(g1 + (g2 - g1) * amount),
    Math.round(b1 + (b2 - b1) * amount),
  )
}

/** How much of the palette tints each scheme's stock background */
const BACKGROUND_TINT = {light: 0.08, dark: 0.3}

/**
 * The WCAG AA contrast for normal text — what a button label needs against
 * the button. Sanity UI labels solid buttons in white on the accent's 500
 * tint in the light scheme and in black on its 400 tint in the dark scheme
 * (lighter than the accent, so an accent that passes against black passes
 * there too).
 */
const MINIMUM_ACCENT_CONTRAST = 4.5
const BUTTON_LABEL: Record<ThemeColorSchemeKey, string> = {light: '#ffffff', dark: '#000000'}
const ACCENT_LIGHTNESS_STEP = 0.01

function contrastRatio(a: string, b: string): number {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Makes an accent readable as a button in the given scheme: a light scheme
 * accent is darkened until white text on it reaches AA contrast, a dark
 * scheme accent lightened until black text does — as far as the accent's
 * hue and saturation allow. Accents that already pass come back untouched.
 *
 * @internal
 */
export function readableAccent(hex: string, scheme: ThemeColorSchemeKey): string {
  const label = BUTTON_LABEL[scheme]
  const {h, s} = hexToHsl(hex)
  let {l} = hexToHsl(hex)
  let current = hex

  while (contrastRatio(current, label) < MINIMUM_ACCENT_CONTRAST) {
    const next = scheme === 'light' ? l - ACCENT_LIGHTNESS_STEP : l + ACCENT_LIGHTNESS_STEP

    if (next < 0 || next > 1) break

    l = next
    current = hslToHex({h, s, l})
  }

  return current
}

/** The accent a variant gives a scheme, made readable on a button @internal */
export function variantAccent(
  palette: ImagePalette,
  variant: ImagePaletteVariant | null,
  scheme: ThemeColorSchemeKey,
): string | null {
  const swatch =
    (variant ? palette[variant] : null) ??
    palette.vibrant ??
    (scheme === 'light' ? palette.darkVibrant : palette.lightVibrant) ??
    palette.dominant

  return swatch === null ? null : readableAccent(swatch, scheme)
}

/**
 * Derives theme options from an image palette: the accent of both schemes is
 * the swatch of the chosen variant — or, without one, the vibrant swatch,
 * each scheme falling back to the vibrant swatch of its own end of the scale —
 * adjusted until it is readable as a button. The muted swatch becomes the text color, and the light and dark muted
 * swatches tint the stock backgrounds of their scheme — enough to carry the
 * image's tone without giving up a usable canvas. Whatever the palette lacks
 * stays at the theme defaults.
 *
 * @internal
 */
export function optionsFromImagePalette(
  palette: ImagePalette,
  variant?: ImagePaletteVariant,
): BuildThemeOptions {
  const options: BuildThemeOptions = {}

  const light = schemeFromPalette(
    variantAccent(palette, variant ?? null, 'light'),
    palette.muted ?? palette.darkMuted,
    palette.lightMuted ?? palette.muted ?? palette.lightVibrant,
    'light',
  )
  const dark = schemeFromPalette(
    variantAccent(palette, variant ?? null, 'dark'),
    palette.muted ?? palette.lightMuted,
    palette.darkMuted ?? palette.muted ?? palette.darkVibrant,
    'dark',
  )

  if (light) options.light = light
  if (dark) options.dark = dark

  return options
}

function schemeFromPalette(
  accent: string | null,
  text: string | null,
  backgroundTint: string | null,
  scheme: 'light' | 'dark',
): SchemeThemeOptions | null {
  const options: SchemeThemeOptions = {}

  if (accent) options.accent = accent
  if (text) options.text = text
  if (backgroundTint) {
    options.background = tint(DEFAULT_BACKGROUND[scheme], backgroundTint, BACKGROUND_TINT[scheme])
  }

  return Object.keys(options).length > 0 ? options : null
}

/**
 * Applies an image palette to existing theme options: the colors the palette
 * provides replace the current ones scheme by scheme, and whatever it does
 * not touch — like the contrast — stays as it is.
 *
 * @internal
 */
export function applyImagePalette(
  options: BuildThemeOptions,
  palette: ImagePalette,
  variant?: ImagePaletteVariant,
): BuildThemeOptions {
  const derived = optionsFromImagePalette(palette, variant)
  const next: BuildThemeOptions = {...options}

  for (const scheme of SCHEMES) {
    if (derived[scheme]) next[scheme] = {...options[scheme], ...derived[scheme]}
  }

  return next
}

/**
 * The variant a theme is built around: the one whose swatch is the theme's
 * accent, or `null` when the accent comes from somewhere else.
 *
 * @internal
 */
export function currentImageVariant(
  options: BuildThemeOptions,
  palette: ImagePalette,
): ImagePaletteVariant | null {
  const accent = options.light?.accent

  if (!accent) return null

  return (
    IMAGE_PALETTE_VARIANTS.find(
      (variant) => palette[variant] !== null && variantAccent(palette, variant, 'light') === accent,
    ) ?? null
  )
}

/**
 * How much a swatch has going for it as an accent: saturation first, then
 * closeness to mid lightness — the range where an accent reads best.
 */
function interest(hex: string): number {
  const {s, l} = hexToHsl(hex)

  return 0.1 + 0.55 * s + 0.35 * (1 - Math.abs(l - 0.5) * 2)
}

/**
 * Picks a variant for the "I'm feeling lucky" button: a random one, weighted
 * by how interesting its swatch is as an accent, and never the one the theme
 * already uses while there are others to pick from.
 *
 * @internal
 */
export function pickLuckyVariant(
  palette: ImagePalette,
  options: {exclude?: ImagePaletteVariant | null; random?: () => number} = {},
): ImagePaletteVariant | null {
  const {exclude = null, random = Math.random} = options
  let candidates = IMAGE_PALETTE_VARIANTS.filter((variant) => palette[variant] !== null)

  if (candidates.length > 1) {
    candidates = candidates.filter((variant) => variant !== exclude)
  }

  if (candidates.length === 0) return null

  const weights = candidates.map((variant) => interest(palette[variant]!))
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  let pick = random() * total

  for (const [index, variant] of candidates.entries()) {
    pick -= weights[index]

    if (pick < 0) return variant
  }

  return candidates.at(-1) ?? null
}

/** A theme title for the image a palette came from, e.g. `sunset-beach.jpg` → `sunset beach` @internal */
export function titleFromFileName(name: string): string {
  return (
    name
      .replace(/\.[^.]+$/, '')
      .replace(/[-_]+/g, ' ')
      .trim() || 'Image theme'
  )
}
