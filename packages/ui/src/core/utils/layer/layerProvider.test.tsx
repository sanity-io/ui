/** @vitest-environment jsdom */

import {act, screen} from '@testing-library/react'
import {memo, useEffect, useState} from 'react'
import {describe, expect, it} from 'vitest'

import {render} from '../../../../test/utils'
import {LayerProvider} from './layerProvider'
import {useLayer} from './useLayer'

function LayerProbe({testId}: {testId: string}) {
  const {isTopLayer, level, size} = useLayer()

  return (
    <div
      data-is-top={String(isTopLayer)}
      data-level={level}
      data-size={size}
      data-testid={testId}
    />
  )
}

describe('utils/layer', () => {
  describe('LayerProvider', () => {
    it('is the top layer when it has no children', () => {
      render(
        <LayerProvider>
          <LayerProbe testId="root" />
        </LayerProvider>,
      )

      expect(screen.getByTestId('root')).toHaveAttribute('data-is-top', 'true')
      expect(screen.getByTestId('root')).toHaveAttribute('data-size', '0')
      expect(screen.getByTestId('root')).toHaveAttribute('data-level', '1')
    })

    it('tracks nested layers by unique descendant level', () => {
      render(
        <LayerProvider>
          <LayerProbe testId="root" />
          <LayerProvider>
            <LayerProbe testId="child" />
            <LayerProvider>
              <LayerProbe testId="grandchild" />
            </LayerProvider>
          </LayerProvider>
        </LayerProvider>,
      )

      expect(screen.getByTestId('root')).toHaveAttribute('data-size', '2')
      expect(screen.getByTestId('root')).toHaveAttribute('data-is-top', 'false')
      expect(screen.getByTestId('child')).toHaveAttribute('data-size', '1')
      expect(screen.getByTestId('child')).toHaveAttribute('data-is-top', 'false')
      expect(screen.getByTestId('grandchild')).toHaveAttribute('data-size', '0')
      expect(screen.getByTestId('grandchild')).toHaveAttribute('data-is-top', 'true')
    })

    it('counts sibling layers at the same level as one unique level', () => {
      render(
        <LayerProvider>
          <LayerProbe testId="root" />
          <LayerProvider>
            <LayerProbe testId="a" />
          </LayerProvider>
          <LayerProvider>
            <LayerProbe testId="b" />
          </LayerProvider>
        </LayerProvider>,
      )

      expect(screen.getByTestId('root')).toHaveAttribute('data-size', '1')
      expect(screen.getByTestId('root')).toHaveAttribute('data-is-top', 'false')
      expect(screen.getByTestId('a')).toHaveAttribute('data-level', '2')
      expect(screen.getByTestId('b')).toHaveAttribute('data-level', '2')
    })

    it('restores the parent as the top layer when children unmount', () => {
      function App({nested}: {nested: boolean}) {
        return (
          <LayerProvider>
            <LayerProbe testId="root" />
            {nested && (
              <LayerProvider>
                <LayerProbe testId="child" />
              </LayerProvider>
            )}
          </LayerProvider>
        )
      }

      const {rerender} = render(<App nested />)

      expect(screen.getByTestId('root')).toHaveAttribute('data-size', '1')
      expect(screen.getByTestId('root')).toHaveAttribute('data-is-top', 'false')

      rerender(<App nested={false} />)

      expect(screen.getByTestId('root')).toHaveAttribute('data-size', '0')
      expect(screen.getByTestId('root')).toHaveAttribute('data-is-top', 'true')
    })

    it('keeps size when one of several siblings at the same level unmounts', () => {
      function App({a, b}: {a: boolean; b: boolean}) {
        return (
          <LayerProvider>
            <LayerProbe testId="root" />
            {a && (
              <LayerProvider>
                <LayerProbe testId="a" />
              </LayerProvider>
            )}
            {b && (
              <LayerProvider>
                <LayerProbe testId="b" />
              </LayerProvider>
            )}
          </LayerProvider>
        )
      }

      const {rerender} = render(<App a b />)

      expect(screen.getByTestId('root')).toHaveAttribute('data-size', '1')

      rerender(<App a={false} b />)

      expect(screen.getByTestId('root')).toHaveAttribute('data-size', '1')
      expect(screen.queryByTestId('a')).not.toBeInTheDocument()

      rerender(<App a={false} b={false} />)

      expect(screen.getByTestId('root')).toHaveAttribute('data-size', '0')
    })

    it('supports the legacy registerChild() path that omits a level', () => {
      function LegacyChild() {
        const {registerChild} = useLayer()

        useEffect(() => registerChild(), [registerChild])

        return null
      }

      function App({count}: {count: number}) {
        return (
          <LayerProvider>
            <LayerProbe testId="root" />
            {Array.from({length: count}, (_, index) => (
              <LegacyChild key={index} />
            ))}
          </LayerProvider>
        )
      }

      const {rerender} = render(<App count={2} />)

      expect(screen.getByTestId('root')).toHaveAttribute('data-size', '2')
      expect(screen.getByTestId('root')).toHaveAttribute('data-is-top', 'false')

      rerender(<App count={0} />)

      expect(screen.getByTestId('root')).toHaveAttribute('data-size', '0')
      expect(screen.getByTestId('root')).toHaveAttribute('data-is-top', 'true')
    })

    it('does not notify memoized consumers when only occupancy of an existing level changes', () => {
      const seenSizes: number[] = []

      const MemoProbe = memo(function MemoProbe() {
        const {size} = useLayer()

        seenSizes.push(size)

        return <div data-size={size} data-testid="probe" />
      })

      function App() {
        const [siblings, setSiblings] = useState(1)

        return (
          <LayerProvider>
            <button onClick={() => setSiblings(2)} type="button">
              add sibling
            </button>
            <MemoProbe />
            {Array.from({length: siblings}, (_, index) => (
              <LayerProvider key={index}>
                <LayerProbe testId={`child-${index}`} />
              </LayerProvider>
            ))}
          </LayerProvider>
        )
      }

      render(<App />)

      expect(screen.getByTestId('probe')).toHaveAttribute('data-size', '1')

      const rendersAfterFirstChild = seenSizes.length

      act(() => {
        screen.getByRole('button', {name: 'add sibling'}).click()
      })

      expect(screen.getByTestId('probe')).toHaveAttribute('data-size', '1')
      expect(screen.getByTestId('child-1')).toBeInTheDocument()
      expect(seenSizes.length).toBe(rendersAfterFirstChild)
    })
  })
})
