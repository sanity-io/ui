/** @vitest-environment node */

import {describe, expect, it} from 'vitest'

import {_getMediaStore} from '../hooks/useMediaIndex/useMediaIndex'
import {_getMediaQueryStore} from './mediaQueryObserver'

// `useSyncExternalStore` reads `getServerSnapshot` on the server, so the stores only need to
// exist; caching them would hold on to every query and breakpoint array a server ever rendered
describe('mediaQueryObserver on the server', () => {
  it('creates stores without caching them', () => {
    expect(_getMediaQueryStore('(prefers-color-scheme: dark)')).not.toBe(
      _getMediaQueryStore('(prefers-color-scheme: dark)'),
    )
    expect(_getMediaStore([600, 900])).not.toBe(_getMediaStore([600, 900]))
  })
})
