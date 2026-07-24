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
 * The colors the sidebar exposes pickers for. Presets can set the other
 * `CreateThemeOptions` colors, and the generated snippet always serializes
 * all of them — the pickers are just the simplified editing surface.
 *
 * @internal
 */
export const THEMER_FIELDS: ThemerField[] = [
  {
    key: 'primary',
    title: 'Primary',
    description: 'Buttons, focus rings and links',
    defaultValue: color.blue[500].hex,
  },
  {
    key: 'gray',
    title: 'Text',
    description: 'Text, icons and neutral surfaces',
    defaultValue: color.gray[500].hex,
  },
  {
    key: 'lightest',
    title: 'Light background',
    description: 'The background of the light scheme',
    defaultValue: color.white.hex,
  },
  {
    key: 'darkest',
    title: 'Dark background',
    description: 'The background of the dark scheme',
    defaultValue: color.black.hex,
  },
]
