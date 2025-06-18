import {describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test'
import {LayerContext} from './layerContext'
import type {LayerContextValue} from './types'
import {useLayer} from './useLayer'

describe('primitives/layer', () => {
  describe('useLayer', () => {
    it('should get context value', async () => {
      const log = vi.fn()

      function Debug() {
        const rootLayer = useLayer()

        log(rootLayer)

        return <>debug</>
      }

      function Root() {
        const value: LayerContextValue = {
          version: 0.0,
          isTopLayer: true,
          level: 0,
          registerChild: () => () => undefined,
          size: 0,
          zIndex: 0,
        }

        return (
          <LayerContext.Provider value={value}>
            <Debug />
          </LayerContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].version).toBe(0.0)
      expect(log.mock.calls[0][0].isTopLayer).toBe(true)
      expect(typeof log.mock.calls[0][0].registerChild).toBe('function')
      expect(log.mock.calls[0][0].size).toBe(0)
      expect(log.mock.calls[0][0].zIndex).toBe(0)
    })

    it('should fail when no context value is provided', async () => {
      const log = vi.fn()

      function Debug() {
        try {
          useLayer()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        return (
          <LayerContext.Provider
            // @ts-expect-error - we want to test the error case
            value={undefined}
          >
            <Debug />
          </LayerContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual('useLayer(): missing context value')
    })

    it('should fail when context value is not compatible', async () => {
      const log = vi.fn()

      function Debug() {
        try {
          useLayer()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        // NOTE: we’re testing this because the context value may be a function in the future

        return (
          <LayerContext.Provider
            // @ts-expect-error - we want to test the error case
            value={() => ({version: 1})}
          >
            <Debug />
          </LayerContext.Provider>
        )
      }

      render(<Root />)

      expect(log.mock.calls[0][0].message).toEqual(
        'useLayer(): the context value is not compatible',
      )
    })
  })
})
