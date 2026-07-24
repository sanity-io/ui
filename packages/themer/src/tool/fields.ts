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

/** @internal */
export const THEMER_FIELDS: ThemerField[] = [
  {
    key: 'primary',
    title: 'Primary',
    description: 'Buttons, focus rings and links',
    defaultValue: color.blue[500].hex,
  },
  {
    key: 'gray',
    title: 'Gray',
    description: 'Neutral surfaces, borders and text',
    defaultValue: color.gray[500].hex,
  },
  {
    key: 'positive',
    title: 'Positive',
    description: 'Success accents',
    defaultValue: color.green[500].hex,
  },
  {
    key: 'caution',
    title: 'Caution',
    description: 'Warning accents',
    defaultValue: color.yellow[500].hex,
  },
  {
    key: 'critical',
    title: 'Critical',
    description: 'Errors and destructive actions',
    defaultValue: color.red[500].hex,
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
