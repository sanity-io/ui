import {describe, expect, it, vi} from 'vitest'

import {themerTool} from './plugin'
import {createThemeSnippet} from './snippet'

// Importing the real `sanity` package in a node test would resolve its
// workspace dependencies (e.g. @sanity/icons) to untransformed .tsx source.
// `definePlugin` only wraps the factory, so the mock returns it as-is.
vi.mock('sanity', () => ({
  definePlugin: (factory: unknown) => factory,
}))

describe('themerTool', () => {
  it('registers the studio components', () => {
    const plugin = themerTool()

    expect(plugin.name).toBe('@sanity/themer/tool')
    expect(plugin.studio?.components?.layout).toBeTypeOf('function')
    expect(plugin.studio?.components?.navbar).toBeTypeOf('function')
    expect(plugin.studio?.components?.activeToolLayout).toBeTypeOf('function')
  })
})

describe('createThemeSnippet', () => {
  it('serializes an empty draft to a plain createTheme call', () => {
    expect(createThemeSnippet({})).toBe(
      "import {createTheme} from '@sanity/themer'\n\nexport const theme = createTheme()\n",
    )
  })

  it('serializes colors in a stable order', () => {
    expect(createThemeSnippet({darkBackground: '#0d1415', primary: '#1cb485'})).toBe(
      [
        "import {createTheme} from '@sanity/themer'",
        '',
        'export const theme = createTheme({',
        "  primary: '#1cb485',",
        "  darkBackground: '#0d1415',",
        '})',
        '',
      ].join('\n'),
    )
  })

  it('serializes preset colors that have no sidebar picker', () => {
    expect(createThemeSnippet({critical: '#fe3459', primary: '#1cb485'})).toContain(
      "  critical: '#fe3459',",
    )
  })
})
