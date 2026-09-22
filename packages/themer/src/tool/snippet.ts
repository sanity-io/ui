import {BuildThemeOptions, SCHEMES, SchemeThemeOptions} from '../theme/options'
import {minimizeOptions} from './options'

/**
 * Serializes theme options into the `buildTheme` call to paste into
 * `sanity.config.ts`, keeping only what differs from the derived defaults in
 * each scheme.
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

  const lines: string[] = []

  for (const scheme of SCHEMES) {
    const values = minimized[scheme]

    if (values) lines.push(serializeScheme(scheme, values))
  }

  return `import {buildTheme} from '@sanity/themer'\n\nexport const theme = buildTheme({\n${lines.join('\n')}\n})\n`
}

/** A scheme with up to two options fits on one line, more spread out */
function serializeScheme(scheme: string, values: SchemeThemeOptions): string {
  const entries: string[] = []

  if (values.accent !== undefined) entries.push(`accent: '${values.accent}'`)
  if (values.text !== undefined) entries.push(`text: '${values.text}'`)
  if (values.background !== undefined) entries.push(`background: '${values.background}'`)
  if (values.contrast !== undefined) entries.push(`contrast: ${values.contrast}`)

  if (entries.length <= 2) {
    return `  ${scheme}: {${entries.join(', ')}},`
  }

  return `  ${scheme}: {\n${entries.map((entry) => `    ${entry},`).join('\n')}\n  },`
}
