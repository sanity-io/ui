import {BuildThemeOptions} from './options'

/**
 * A preset theme: a named set of {@link BuildThemeOptions} ready to pass to
 * `buildTheme`.
 *
 * @public
 */
export interface ThemePreset {
  slug: string
  title: string
  /** The preset's theme options, ready to pass to `buildTheme` */
  options: BuildThemeOptions
}

/**
 * The hosted Themer presets had one accent and one text color for both
 * schemes, and a background per scheme
 */
function scheme(accent: string, text: string, backgrounds: {dark: string; light: string}) {
  return {
    dark: {accent, text, background: backgrounds.dark},
    light: {accent, text, background: backgrounds.light},
  } satisfies BuildThemeOptions
}

/**
 * Preset themes for `buildTheme`, carried over from the hosted Themer service
 * (themer.sanity.build) presets: each one maps the legacy preset's primary
 * hue to `accent`, its default hue to `text` and its lightest/darkest colors
 * to the backgrounds of the light and dark scheme.
 *
 * ```ts
 * import {buildTheme, presets} from '@sanity/themer'
 *
 * const verdant = presets.find((preset) => preset.slug === 'verdant')
 * const theme = buildTheme(verdant.options)
 * ```
 *
 * @public
 */
export const presets: ThemePreset[] = [
  {
    slug: 'studio',
    title: 'Studio',
    options: {},
  },
  {
    slug: 'dew',
    title: 'Dew',
    options: scheme('#d1a308', '#5e63b4', {dark: '#0d0d15', light: '#fcfcfd'}),
  },
  {
    slug: 'pink-synth',
    title: 'Pink Synth',
    options: scheme('#ec4899', '#8b6584', {dark: '#171721', light: '#f7f2f5'}),
  },
  {
    slug: 'pixel-art',
    title: 'Pixel Art',
    options: scheme('#f10784', '#57619c', {dark: '#0d0e15', light: '#fcfcfd'}),
  },
  {
    slug: 'retro-colonial',
    title: 'Retro Colonial',
    options: scheme('#fa7a78', '#8bb9b5', {dark: '#0d1515', light: '#fcfdfd'}),
  },
  {
    slug: 'rosabel',
    title: 'Rosabel',
    options: scheme('#ed2555', '#9d8966', {dark: '#15120d', light: '#fdfdfc'}),
  },
  {
    slug: 'stereofidelic',
    title: 'Stereofidelic',
    options: scheme('#f13009', '#678e9a', {dark: '#0e1315', light: '#fcfdfd'}),
  },
  {
    slug: 'verdant',
    title: 'Verdant',
    options: scheme('#1cb485', '#5c9199', {dark: '#0d1415', light: '#fcfdfd'}),
  },
]
