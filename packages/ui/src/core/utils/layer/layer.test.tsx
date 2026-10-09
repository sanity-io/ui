/** @vitest-environment jsdom */

import {screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Layer} from './layer'
import {LayerContext} from './layerContext'
import {LayerContextValue} from './types'
import {useLayer} from './useLayer'

describe('utils/layer', () => {
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
          // oxlint-disable-next-line jsx-no-constructed-context-values
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
          // oxlint-disable-next-line react/hooks, react/rules-of-hooks
          useLayer()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        const value = undefined

        return (
          // oxlint-disable-next-line no-unsafe-type-assertion
          <LayerContext.Provider value={value as any}>
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
          // oxlint-disable-next-line react/hooks, react/rules-of-hooks
          useLayer()
        } catch (err) {
          log(err)
        }

        return null
      }

      function Root() {
        // NOTE: we’re testing this because the context value may be a function in the future
        const value = () => {
          return {version: 1}
        }

        return (
          // oxlint-disable-next-line jsx-no-constructed-context-values, no-unsafe-type-assertion
          <LayerContext.Provider value={value as any}>
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

  describe('Layer', () => {
    it('forwards its element once, not again on every render, and follows the element type', () => {
      const callbackRef = vi.fn()

      const {rerender, unmount} = render(<Layer ref={callbackRef}>layer</Layer>, {strict: false})

      const element = screen.getByText('layer')

      expect(callbackRef.mock.calls).toEqual([[element]])

      rerender(<Layer ref={callbackRef}>layer</Layer>)
      rerender(<Layer ref={callbackRef}>layer again</Layer>)

      expect(callbackRef.mock.calls).toEqual([[element]])

      // Another element type mounts another element, and the ref moves to it
      rerender(
        <Layer as="section" ref={callbackRef}>
          layer again
        </Layer>,
      )

      const section = screen.getByText('layer again')

      expect(section.tagName).toBe('SECTION')
      expect(callbackRef.mock.calls).toEqual([[element], [null], [section]])

      unmount()

      expect(callbackRef.mock.calls.at(-1)).toEqual([null])
    })
  })
})
