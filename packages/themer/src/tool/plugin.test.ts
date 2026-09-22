import {describe, expect, it, vi} from 'vitest'

import {deriveTextColor} from '../theme/options'
import {presets} from '../theme/presets'
import {minimizeOptions, sameOptions} from './options'
import {themerTool} from './plugin'
import {createThemeSnippet} from './snippet'

// Importing the real `sanity` package in a node test would resolve its
// workspace dependencies (e.g. @sanity/icons) to untransformed .tsx source.
// `definePlugin` only wraps the factory, so the mock returns it as-is.
vi.mock('sanity', () => ({
  definePlugin: (factory: unknown) => factory,
  useColorSchemeValue: () => 'light',
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
    expect(minimizeOptions({})).toBeNull()
    expect(minimizeOptions({light: {accent: '#556bfc'}})).toBeNull()
    expect(
      minimizeOptions({
        light: {accent: '#556bfc', text: '#727892', background: '#ffffff', contrast: 85},
        dark: {accent: '#556bfc', text: '#727892', background: '#0d0e12', contrast: 85},
      }),
    ).toBeNull()
  })

  it('drops a text color that matches the derived one', () => {
    expect(minimizeOptions({light: {accent: '#1cb485', text: deriveTextColor('#1cb485')}})).toEqual(
      {light: {accent: '#1cb485'}},
    )
  })

  it('keeps only what differs from the defaults in each scheme', () => {
    expect(
      minimizeOptions({
        light: {accent: '#1CB485', text: '#5c9199', background: '#fcfdfd', contrast: 70},
        dark: {accent: '#556bfc', background: '#0d0e12', contrast: 85},
      }),
    ).toEqual({
      light: {accent: '#1cb485', text: '#5c9199', background: '#fcfdfd', contrast: 70},
    })
  })

  it('round-trips every preset', () => {
    for (const preset of presets) {
      const minimized = minimizeOptions(preset.options) ?? {}

      expect(sameOptions(minimized, preset.options), preset.slug).toBe(true)
    }
  })
})

describe('sameOptions', () => {
  it('compares the resolved schemes', () => {
    expect(sameOptions({}, {light: {accent: '#556BFC', contrast: 85}})).toBe(true)
    expect(sameOptions({light: {accent: '#1cb485'}}, {dark: {accent: '#1cb485'}})).toBe(false)
  })
})

describe('createThemeSnippet', () => {
  it('points untouched options at buildTheme from @sanity/ui/theme', () => {
    expect(createThemeSnippet({})).toBe(
      "import {buildTheme} from '@sanity/ui/theme'\n\nexport const theme = buildTheme()\n",
    )
  })

  it('serializes only what differs from the defaults, scheme by scheme', () => {
    expect(
      createThemeSnippet({
        light: {accent: '#1cb485', text: '#5c9199', background: '#fcfdfd', contrast: 70},
        dark: {accent: '#22fca8', background: '#0d1415'},
      }),
    ).toBe(
      [
        "import {buildTheme} from '@sanity/themer'",
        '',
        'export const theme = buildTheme({',
        '  light: {',
        "    accent: '#1cb485',",
        "    text: '#5c9199',",
        "    background: '#fcfdfd',",
        '    contrast: 70,',
        '  },',
        "  dark: {accent: '#22fca8', background: '#0d1415'},",
        '})',
        '',
      ].join('\n'),
    )
  })

  it('leaves out a scheme that is all defaults', () => {
    expect(createThemeSnippet({dark: {accent: '#1cb485'}, light: {contrast: 85}})).toBe(
      [
        "import {buildTheme} from '@sanity/themer'",
        '',
        'export const theme = buildTheme({',
        "  dark: {accent: '#1cb485'},",
        '})',
        '',
      ].join('\n'),
    )
  })
})
