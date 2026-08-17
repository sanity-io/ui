import {describe, expect, it, vi} from 'vitest'

import {DEFAULT_ACCENT, deriveTextColor} from '../theme/options'
import {presets} from '../theme/presets'
import {minimizeOptions, sameOptions} from './options'
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

describe('minimizeOptions', () => {
  it('reduces the stock options to nothing', () => {
    expect(minimizeOptions({accent: DEFAULT_ACCENT})).toBeNull()
    expect(
      minimizeOptions({
        accent: '#556bfc',
        text: '#727892',
        background: {dark: '#0d0e12', light: '#ffffff'},
        contrast: 85,
      }),
    ).toBeNull()
  })

  it('drops a text color that matches the derived one', () => {
    expect(minimizeOptions({accent: '#1cb485', text: deriveTextColor('#1cb485')})).toEqual({
      accent: '#1cb485',
    })
  })

  it('keeps only what differs from the defaults', () => {
    expect(
      minimizeOptions({
        accent: '#1CB485',
        text: '#5c9199',
        background: {dark: '#0d0e12', light: '#fcfdfd'},
        contrast: 70,
      }),
    ).toEqual({
      accent: '#1cb485',
      text: '#5c9199',
      background: {light: '#fcfdfd'},
      contrast: 70,
    })
  })

  it('round-trips every preset', () => {
    for (const preset of presets) {
      const minimized = minimizeOptions(preset.options) ?? {accent: DEFAULT_ACCENT}

      expect(sameOptions(minimized, preset.options), preset.slug).toBe(true)
    }
  })
})

describe('createThemeSnippet', () => {
  it('points untouched options at buildTheme from @sanity/ui/theme', () => {
    expect(createThemeSnippet({accent: DEFAULT_ACCENT})).toBe(
      "import {buildTheme} from '@sanity/ui/theme'\n\nexport const theme = buildTheme()\n",
    )
  })

  it('serializes only what differs from the defaults', () => {
    expect(
      createThemeSnippet({
        accent: '#1cb485',
        text: '#5c9199',
        background: {dark: '#0d1415', light: '#fcfdfd'},
        contrast: 70,
      }),
    ).toBe(
      [
        "import {buildTheme} from '@sanity/themer'",
        '',
        'export const theme = buildTheme({',
        "  accent: '#1cb485',",
        "  text: '#5c9199',",
        "  background: {dark: '#0d1415', light: '#fcfdfd'},",
        '  contrast: 70,',
        '})',
        '',
      ].join('\n'),
    )
  })

  it('keeps a customized accent even when everything else is derived', () => {
    expect(createThemeSnippet({accent: '#1cb485'})).toBe(
      [
        "import {buildTheme} from '@sanity/themer'",
        '',
        'export const theme = buildTheme({',
        "  accent: '#1cb485',",
        '})',
        '',
      ].join('\n'),
    )
  })
})
