import {COLOR_OPTION_KEYS, CreateThemeOptions} from '../types'

/**
 * Serializes colors into the `createTheme` call to paste into
 * `sanity.config.ts`. All colors are serialized — including ones a preset
 * set that the sidebar has no picker for — so the snippet always reproduces
 * the previewed theme.
 *
 * @internal
 */
export function createThemeSnippet(colors: CreateThemeOptions): string {
  const entries = COLOR_OPTION_KEYS.filter((key) => colors[key]).map(
    (key) => `  ${key}: '${colors[key]}',`,
  )

  const call = entries.length === 0 ? 'createTheme()' : `createTheme({\n${entries.join('\n')}\n})`

  return `import {createTheme} from '@sanity/themer'\n\nexport const theme = ${call}\n`
}
