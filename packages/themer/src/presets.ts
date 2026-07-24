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
      gray: '#5e63b4',
      primary: '#d1a308',
      positive: '#43d675',
      caution: '#fb9f24',
      critical: '#f03e2f',
      lightest: '#fcfcfd',
      darkest: '#0d0d15',
    },
  },
  {
    slug: 'pink-synth',
    title: 'Pink Synth',
    colors: {
      gray: '#8b6584',
      primary: '#ec4899',
      positive: '#10b981',
      caution: '#fde047',
      critical: '#fe3459',
      lightest: '#f7f2f5',
      darkest: '#171721',
    },
  },
  {
    slug: 'pixel-art',
    title: 'Pixel Art',
    colors: {
      gray: '#57619c',
      primary: '#f10784',
      positive: '#43d675',
      caution: '#fbd024',
      lightest: '#fcfcfd',
      darkest: '#0d0e15',
    },
  },
  {
    slug: 'retro-colonial',
    title: 'Retro Colonial',
    colors: {
      gray: '#8bb9b5',
      primary: '#fa7a78',
      positive: '#43d675',
      caution: '#fbd024',
      critical: '#f02f53',
      lightest: '#fcfdfd',
      darkest: '#0d1515',
    },
  },
  {
    slug: 'rosabel',
    title: 'Rosabel',
    colors: {
      gray: '#9d8966',
      primary: '#ed2555',
      positive: '#43d675',
      caution: '#fbd024',
      lightest: '#fdfdfc',
      darkest: '#15120d',
    },
  },
  {
    slug: 'stereofidelic',
    title: 'Stereofidelic',
    colors: {
      gray: '#678e9a',
      primary: '#f13009',
      positive: '#43d675',
      caution: '#fbd024',
      critical: '#f02f35',
      lightest: '#fcfdfd',
      darkest: '#0e1315',
    },
  },
  {
    slug: 'tw-cyan',
    title: 'Tailwind Cyan',
    colors: {
      gray: '#677389',
      primary: '#51b4d0',
      positive: '#55b785',
      caution: '#e2b53e',
      critical: '#e14f62',
      lightest: '#f9fafb',
      darkest: '#101728',
    },
  },
  {
    slug: 'verdant',
    title: 'Verdant',
    colors: {
      gray: '#5c9199',
      primary: '#1cb485',
      positive: '#43d675',
      caution: '#fbd024',
      lightest: '#fcfdfd',
      darkest: '#0d1415',
    },
  },
]
