import {BuildThemeOptions, DEFAULT_ACCENT} from './options'

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
 * Preset themes for `buildTheme`, carried over from the hosted Themer service
 * (themer.sanity.build) presets: each one maps the legacy preset's primary
 * hue to `accent`, its default hue to `text` and its lightest/darkest colors
 * to the backgrounds.
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
    options: {accent: DEFAULT_ACCENT},
  },
  {
    slug: 'dew',
    title: 'Dew',
    options: {
      accent: '#d1a308',
      text: '#5e63b4',
      background: {dark: '#0d0d15', light: '#fcfcfd'},
    },
  },
  {
    slug: 'pink-synth',
    title: 'Pink Synth',
    options: {
      accent: '#ec4899',
      text: '#8b6584',
      background: {dark: '#171721', light: '#f7f2f5'},
    },
  },
  {
    slug: 'pixel-art',
    title: 'Pixel Art',
    options: {
      accent: '#f10784',
      text: '#57619c',
      background: {dark: '#0d0e15', light: '#fcfcfd'},
    },
  },
  {
    slug: 'retro-colonial',
    title: 'Retro Colonial',
    options: {
      accent: '#fa7a78',
      text: '#8bb9b5',
      background: {dark: '#0d1515', light: '#fcfdfd'},
    },
  },
  {
    slug: 'rosabel',
    title: 'Rosabel',
    options: {
      accent: '#ed2555',
      text: '#9d8966',
      background: {dark: '#15120d', light: '#fdfdfc'},
    },
  },
  {
    slug: 'stereofidelic',
    title: 'Stereofidelic',
    options: {
      accent: '#f13009',
      text: '#678e9a',
      background: {dark: '#0e1315', light: '#fcfdfd'},
    },
  },
  {
    slug: 'verdant',
    title: 'Verdant',
    options: {
      accent: '#1cb485',
      text: '#5c9199',
      background: {dark: '#0d1415', light: '#fcfdfd'},
    },
  },
]
