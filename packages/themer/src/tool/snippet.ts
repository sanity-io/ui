import {CreateThemeOptions} from '../types'
import {THEMER_FIELDS} from './fields'

/**
 * Serializes colors into the `createTheme` call to paste into
 * `sanity.config.ts`.
 *
 * @internal
 */
export function createThemeSnippet(colors: CreateThemeOptions): string {
  const entries = THEMER_FIELDS.filter(({key}) => colors[key]).map(
    ({key}) => `  ${key}: '${colors[key]}',`,
  )

  const call = entries.length === 0 ? 'createTheme()' : `createTheme({\n${entries.join('\n')}\n})`

  return `import {createTheme} from '@sanity/themer'\n\nexport const theme = ${call}\n`
}
