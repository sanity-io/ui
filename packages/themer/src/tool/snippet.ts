import {Hue, Hues} from '../legacy/types'
import {diffHues} from './diffHues'
import {HUE_KEYS} from './hues'

function serializeHue(hue: Partial<Hue>): string {
  const parts: string[] = []

  if (hue.mid !== undefined) parts.push(`mid: '${hue.mid}'`)
  if (hue.midPoint !== undefined) parts.push(`midPoint: ${hue.midPoint}`)
  if (hue.lightest !== undefined) parts.push(`lightest: '${hue.lightest}'`)
  if (hue.darkest !== undefined) parts.push(`darkest: '${hue.darkest}'`)

  return `{${parts.join(', ')}}`
}

/**
 * Serializes hues into the `createTheme` call to paste into
 * `sanity.config.ts`, keeping only what differs from the default hues.
 *
 * Hues that match the defaults entirely are the stock Studio theme, which
 * needs nothing from this package — so they serialize to a bare `buildTheme()`
 * instead.
 *
 * @internal
 */
export function createThemeSnippet(hues: Hues): string {
  const diff = diffHues(hues)
  const entries: string[] = []

  for (const key of HUE_KEYS) {
    const patch = diff[key]

    if (patch) {
      entries.push(`  ${key}: ${serializeHue(patch)},`)
    }
  }

  if (entries.length === 0) {
    return "import {buildTheme} from '@sanity/ui/theme'\n\nexport const theme = buildTheme()\n"
  }

  return `import {createTheme} from '@sanity/themer/legacy'\n\nexport const theme = createTheme({\n${entries.join('\n')}\n})\n`
}
