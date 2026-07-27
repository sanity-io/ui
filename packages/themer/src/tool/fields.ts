import {color} from '@sanity/color'

import {CreateThemeOptions} from '../types'

/** @internal */
export interface ThemerField {
  key: keyof CreateThemeOptions
  title: string
  description: string
  /** The color the picker shows while the field is unset (6-digit hex) */
  defaultValue: string
}

/**
 * The stock color each themeable option falls back to when unset (6-digit
 * hex, for `<input type="color">` and the preset palette swatches).
 *
 * @internal
 */
export const DEFAULT_COLORS: Required<CreateThemeOptions> = {
  primary: color.blue[500].hex,
  text: color.gray[500].hex,
  lightBackground: color.white.hex,
  darkBackground: color.black.hex,
}

/**
 * The colors the sidebar exposes pickers for, one per `CreateThemeOptions`
 * color.
 *
 * @internal
 */
export const THEMER_FIELDS: ThemerField[] = [
  {
    key: 'primary',
    title: 'Primary',
    description: 'Buttons, focus rings and links',
    defaultValue: DEFAULT_COLORS.primary,
  },
  {
    key: 'text',
    title: 'Text',
    description: 'Text, icons and neutral surfaces',
    defaultValue: DEFAULT_COLORS.text,
  },
  {
    key: 'lightBackground',
    title: 'Light background',
    description: 'The background of the light scheme',
    defaultValue: DEFAULT_COLORS.lightBackground,
  },
  {
    key: 'darkBackground',
    title: 'Dark background',
    description: 'The background of the dark scheme',
    defaultValue: DEFAULT_COLORS.darkBackground,
  },
]
