import {describe, expect, it, vi} from 'vitest'

import {themerTool} from './plugin'

// Importing the real `sanity` package in a node test would resolve its
// workspace dependencies (e.g. @sanity/icons) to untransformed .tsx source.
// `definePlugin` only wraps the factory, so the mock returns it as-is.
vi.mock('sanity', () => ({
  definePlugin: (factory: unknown) => factory,
}))

describe('themerTool', () => {
  it('registers the studio components under its own plugin name', () => {
    const plugin = themerTool()

    expect(plugin.name).toBe('themer-legacy')
    expect(plugin.studio?.components?.layout).toBeTypeOf('function')
    expect(plugin.studio?.components?.navbar).toBeTypeOf('function')
    // The sidebar lives in the layout: an active tool layout override would
    // render once per Studio copy in the split preview
    expect(plugin.studio?.components?.activeToolLayout).toBeUndefined()
  })
})
