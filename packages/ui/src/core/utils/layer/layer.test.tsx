/** @vitest-environment jsdom */

import {fireEvent, screen} from '@testing-library/react'
import {useEffect, useState} from 'react'
import {describe, expect, it, vi} from 'vitest'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {render} from '../../../../test/utils'
import {Layer} from './layer'
import {LayerContext} from './layerContext'
import {LayerProvider} from './layerProvider'
import {LayerContextValue} from './types'
import {useLayer} from './useLayer'

function LayerProbe({testId}: {testId: string}) {
  const layer = useLayer()

  return (
    <div data-testid={testId}>
      {`isTopLayer=${layer.isTopLayer} size=${layer.size} level=${layer.level}`}
    </div>
  )
}

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

  describe('LayerProvider', () => {
    it('is the top layer when it has no child layers', () => {
      render(
        <LayerProvider>
          <LayerProbe testId="root" />
        </LayerProvider>,
      )

      expect(screen.getByTestId('root')).toHaveTextContent('isTopLayer=true size=0 level=1')
    })

    it('counts unique nested levels, not sibling occupants of the same level', () => {
      render(
        <LayerProvider>
          <LayerProbe testId="root" />
          <Layer>
            <LayerProbe testId="a" />
          </Layer>
          <Layer>
            <LayerProbe testId="b" />
          </Layer>
        </LayerProvider>,
      )

      expect(screen.getByTestId('root')).toHaveTextContent('isTopLayer=false size=1')
      expect(screen.getByTestId('a')).toHaveTextContent('isTopLayer=true size=0')
      expect(screen.getByTestId('b')).toHaveTextContent('isTopLayer=true size=0')
    })

    it('increments size for each nested level and restores it on unmount', () => {
      function Root() {
        const [deep, setDeep] = useState(true)

        return (
          <LayerProvider>
            <LayerProbe testId="root" />
            <button type="button" onClick={() => setDeep(false)}>
              close
            </button>
            <Layer>
              <LayerProbe testId="mid" />
              {deep && (
                <Layer>
                  <LayerProbe testId="inner" />
                </Layer>
              )}
            </Layer>
          </LayerProvider>
        )
      }

      render(<Root />)

      expect(screen.getByTestId('root')).toHaveTextContent('isTopLayer=false size=2')
      expect(screen.getByTestId('mid')).toHaveTextContent('isTopLayer=false size=1')
      expect(screen.getByTestId('inner')).toHaveTextContent('isTopLayer=true size=0')

      fireEvent.click(screen.getByRole('button', {name: 'close'}))

      expect(screen.getByTestId('root')).toHaveTextContent('isTopLayer=false size=1')
      expect(screen.getByTestId('mid')).toHaveTextContent('isTopLayer=true size=0')
      expect(screen.queryByTestId('inner')).toBeNull()
    })

    it('supports legacy registerChild() calls without a level', () => {
      function LegacyChild() {
        const {registerChild} = useLayer()

        useEffect(() => registerChild(), [registerChild])

        return null
      }

      render(
        <LayerProvider>
          <LayerProbe testId="root" />
          <LegacyChild />
          <LegacyChild />
        </LayerProvider>,
      )

      expect(screen.getByTestId('root')).toHaveTextContent('isTopLayer=false size=2')
    })
  })
})
