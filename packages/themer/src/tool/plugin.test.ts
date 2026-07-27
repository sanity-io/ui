import {describe, expect, it, vi} from 'vitest'

import {applyHues} from '../legacy/applyHues'
import {parseHuesFromUrl} from '../legacy/createTheme'
import {hues as defaultHues} from '../legacy/defaults'
import {presets} from '../legacy/presets'
import {diffHues} from './diffHues'
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

describe('diffHues', () => {
  it('reduces the default hues to nothing', () => {
    expect(diffHues(defaultHues)).toEqual({})
  })

  it('round-trips every preset through applyHues', () => {
    for (const preset of presets) {
      expect(applyHues(diffHues(preset.hues)), preset.slug).toEqual(preset.hues)
    }
  })

  it('keeps a default mid point that a customized mid would otherwise reset', () => {
    // caution's default midPoint is 300, and `applyHues` resets the midPoint
    // of a hue whose mid changed to 500 unless the diff carries it explicitly
    const custom = {...defaultHues, caution: {...defaultHues.caution, mid: '#ff0000'}}

    expect(diffHues(custom).caution).toEqual({mid: '#ff0000', midPoint: 300})
    expect(applyHues(diffHues(custom))).toEqual(custom)
  })
})

describe('createThemeSnippet', () => {
  it('points untouched hues at buildTheme', () => {
    expect(createThemeSnippet(defaultHues)).toBe(
      "import {buildTheme} from '@sanity/ui/theme'\n\nexport const theme = buildTheme()\n",
    )
  })

  it('serializes only what differs from the default hues', () => {
    expect(createThemeSnippet(parseHuesFromUrl('?preset=verdant'))).toBe(
      [
        "import {createTheme} from '@sanity/themer/legacy'",
        '',
        'export const theme = createTheme({',
        "  default: {mid: '#5c9199', lightest: '#fcfdfd', darkest: '#0d1415'},",
        "  primary: {mid: '#1cb485', midPoint: 400, lightest: '#fcfdfd', darkest: '#0d1415'},",
        "  transparent: {mid: '#5c9199', lightest: '#fcfdfd', darkest: '#0d1415'},",
        "  positive: {midPoint: 300, lightest: '#fcfdfd', darkest: '#0d1415'},",
        "  caution: {midPoint: 200, lightest: '#fcfdfd', darkest: '#0d1415'},",
        "  critical: {lightest: '#fcfdfd', darkest: '#0d1415'},",
        '})',
        '',
      ].join('\n'),
    )
  })
})
