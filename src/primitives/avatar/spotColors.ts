import {
  gray,
  blue,
  purple,
  magenta,
  red,
  orange,
  yellow,
  green,
  cyan,
  ColorTint,
} from '@sanity/color'
import {ThemeColorSchemeKey} from '../../theme'
import {ThemeColorSpotKey} from './types'

export const spotColor: Record<ThemeColorSpotKey, Record<ThemeColorSchemeKey, ColorTint>> = {
  gray: {
    dark: gray['400'],
    light: gray['500'],
  },
  blue: {
    dark: blue['400'],
    light: blue['500'],
  },
  purple: {
    dark: purple['400'],
    light: purple['500'],
  },
  magenta: {
    dark: magenta['400'],
    light: magenta['500'],
  },
  red: {
    dark: red['400'],
    light: red['500'],
  },
  orange: {
    dark: orange['400'],
    light: orange['500'],
  },
  yellow: {
    dark: yellow['400'],
    light: yellow['500'],
  },
  green: {
    dark: green['400'],
    light: green['500'],
  },
  cyan: {
    dark: cyan['400'],
    light: cyan['500'],
  },
}
