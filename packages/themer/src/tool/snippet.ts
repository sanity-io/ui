import {BuildThemeOptions} from '../theme/options'
import {minimizeOptions} from './options'

/**
 * Serializes theme options into the `buildTheme` call to paste into
 * `sanity.config.ts`, keeping only what differs from the derived defaults.
 *
 * Options that boil down to the stock Studio theme need nothing from this
 * package — so they serialize to a bare `buildTheme()` from `@sanity/ui/theme`
 * instead.
 *
 * @internal
 */
export function createThemeSnippet(options: BuildThemeOptions): string {
  const minimized = minimizeOptions(options)

  if (minimized === null) {
    return "import {buildTheme} from '@sanity/ui/theme'\n\nexport const theme = buildTheme()\n"
  }

  const entries: string[] = [`  accent: '${minimized.accent}',`]

  if (minimized.text !== undefined) {
    entries.push(`  text: '${minimized.text}',`)
  }

  if (minimized.background) {
    const parts: string[] = []

    if (minimized.background.dark !== undefined) parts.push(`dark: '${minimized.background.dark}'`)
    if (minimized.background.light !== undefined) {
      parts.push(`light: '${minimized.background.light}'`)
    }

    entries.push(`  background: {${parts.join(', ')}},`)
  }

  if (minimized.contrast !== undefined) {
    entries.push(`  contrast: ${minimized.contrast},`)
  }

  return `import {buildTheme} from '@sanity/themer'\n\nexport const theme = buildTheme({\n${entries.join('\n')}\n})\n`
}
