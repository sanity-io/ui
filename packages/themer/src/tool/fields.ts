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
    key: 'lightest',
    title: 'Lightest',
    description: 'Light mode background',
    defaultValue: color.white.hex,
  },
  {
    key: 'darkest',
    title: 'Darkest',
    description: 'Dark mode background',
    defaultValue: color.black.hex,
  },
]
