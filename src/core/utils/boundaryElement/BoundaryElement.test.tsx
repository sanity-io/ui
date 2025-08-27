import {describe, expect, it, vi} from 'vitest'

import {render} from '$test/utils'

import {BoundaryElementContext} from './BoundaryElementContext'
import type {BoundaryElementContextValue} from './types'
import {useBoundaryElement} from './useBoundaryElement'

describe('utils/boundaryElement', () => {
  describe('useBoundaryElement', () => {
    it('should get context value', async () => {
      const log = vi.fn()

      function Debug() {
        const rootBoundaryElement = useBoundaryElement()

        log(rootBoundaryElement)

        return <>debug</>
      }

      function Root() {
        const value: BoundaryElementContextValue = {
          version: 0.0,
          element: null,
        }

        return (
          <BoundaryElementContext.Provider value={value}>
            <Debug />
          </BoundaryElementContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
      expect(log.mock.calls[0][0].element).toBe(null)
    })

    it('should provide default value when no context value is provided', async () => {
      const log = vi.fn()

      function Debug() {
        const rootBoundaryElement = useBoundaryElement()

        log(rootBoundaryElement)

        return null
      }

      function Root() {
        return (
          <BoundaryElementContext.Provider
            // @ts-expect-error - we want to test the error case
            value={undefined}
          >
            <Debug />
          </BoundaryElementContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
      expect(log.mock.calls[0][0].element).toBe(null)
    })

    it('should fail when context value is not compatible', async () => {
      const log = vi.fn()

      function Debug() {
        try {
          useBoundaryElement()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        // NOTE: we’re testing this because the context value may be a function in the future

        return (
          <BoundaryElementContext.Provider
            // @ts-expect-error - we want to test the error case
            value={() => ({version: 1})}
          >
            <Debug />
          </BoundaryElementContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual(
        'useBoundaryElement(): the context value is not compatible',
      )
    })
  })
})
