import {CreateThemeOptions} from './types'

/**
 * A named set of colors for `createTheme`.
 *
 * @public
 */
export interface ThemePreset {
  slug: string
  title: string
  colors: CreateThemeOptions
}

/**
 * Preset themes, carried over from the hosted Themer service
 * (themer.sanity.build) and re-expressed as `createTheme` colors.
 *
 * The first preset is the stock Studio theme: no colors, nothing to generate.
 *
 * ```ts
 * import {createTheme, presets} from '@sanity/themer'
 *
 * const verdant = presets.find((preset) => preset.slug === 'verdant')
 * const theme = createTheme(verdant.colors)
 * ```
 *
 * @public
 */
export const presets: ThemePreset[] = [
  {
    slug: 'default',
    title: 'Studio',
    colors: {},
  },
  {
    slug: 'dew',
    title: 'Dew',
    colors: {
      primary: '#d1a308',
      text: '#5e63b4',
      lightBackground: '#fcfcfd',
      darkBackground: '#0d0d15',
    },
  },
  {
    slug: 'pink-synth',
    title: 'Pink Synth',
    colors: {
      primary: '#ec4899',
      text: '#8b6584',
      lightBackground: '#f7f2f5',
      darkBackground: '#171721',
    },
  },
  {
    slug: 'pixel-art',
    title: 'Pixel Art',
    colors: {
      primary: '#f10784',
      text: '#57619c',
      lightBackground: '#fcfcfd',
      darkBackground: '#0d0e15',
    },
  },
  {
    slug: 'retro-colonial',
    title: 'Retro Colonial',
    colors: {
      primary: '#fa7a78',
      text: '#8bb9b5',
      lightBackground: '#fcfdfd',
      darkBackground: '#0d1515',
    },
  },
  {
    slug: 'rosabel',
    title: 'Rosabel',
    colors: {
      primary: '#ed2555',
      text: '#9d8966',
      lightBackground: '#fdfdfc',
      darkBackground: '#15120d',
    },
  },
  {
    slug: 'stereofidelic',
    title: 'Stereofidelic',
    colors: {
      primary: '#f13009',
      text: '#678e9a',
      lightBackground: '#fcfdfd',
      darkBackground: '#0e1315',
    },
  },
  {
    slug: 'verdant',
    title: 'Verdant',
    colors: {
      primary: '#1cb485',
      text: '#5c9199',
      lightBackground: '#fcfdfd',
      darkBackground: '#0d1415',
    },
  },
]
