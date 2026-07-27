import {COLOR_OPTION_KEYS, CreateThemeOptions} from '../types'

/**
 * Serializes colors into the `createTheme` call to paste into
 * `sanity.config.ts`.
 *
 * A draft without colors is the stock Studio theme, which needs nothing from
 * this package — so it serializes to a bare `buildTheme()` instead.
 *
 * @internal
 */
export function createThemeSnippet(colors: CreateThemeOptions): string {
  const entries = COLOR_OPTION_KEYS.filter((key) => colors[key]).map(
    (key) => `  ${key}: '${colors[key]}',`,
  )

  if (entries.length === 0) {
    return "import {buildTheme} from '@sanity/ui/theme'\n\nexport const theme = buildTheme()\n"
  }

  return `import {createTheme} from '@sanity/themer'\n\nexport const theme = createTheme({\n${entries.join('\n')}\n})\n`
}
