/** @vitest-environment jsdom */

import {screen} from '@testing-library/react'
import {useEffect} from 'react'
import {describe, expect, it} from 'vitest'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {render} from '../../../../test/utils'
import {Layer} from './layer'
import {LayerProvider} from './layerProvider'
import {LayerContextValue} from './types'
import {useLayer} from './useLayer'

function LayerInfo({id}: {id: string}) {
  const {isTopLayer, level, size, zIndex} = useLayer()

  return (
    <output data-testid={id}>
      {`level=${level} size=${size} isTopLayer=${isTopLayer} zIndex=${zIndex}`}
    </output>
  )
}

function expectLayer(id: string, info: string) {
  expect(screen.getByTestId(id)).toHaveTextContent(info, {normalizeWhitespace: false})
}

function LegacyChild() {
  const {registerChild} = useLayer()

  useEffect(() => registerChild(), [registerChild])

  return null
}

function DisposeTwiceChild() {
  const {registerChild} = useLayer()

  useEffect(() => {
    const dispose = registerChild(2)

    dispose()
    dispose()
  }, [registerChild])

  return null
}

function RegisteredChild() {
  const {registerChild} = useLayer()

  useEffect(() => registerChild(2), [registerChild])

  return null
}

function Tree(props: {a?: boolean; b?: boolean; sibling?: boolean}) {
  const {a = false, b = false, sibling = false} = props

  return (
    <LayerProvider>
      <LayerInfo id="root" />
      {a && (
        <Layer>
          <LayerInfo id="a" />
          {b && (
            <Layer>
              <LayerInfo id="b" />
            </Layer>
          )}
        </Layer>
      )}
      {sibling && (
        <Layer>
          <LayerInfo id="sibling" />
        </Layer>
      )}
    </LayerProvider>
  )
}

describe('utils/layer', () => {
  describe('LayerProvider', () => {
    it('should be the top layer while no child layers are mounted', () => {
      render(
        <LayerProvider zOffset={100}>
          <LayerInfo id="root" />
        </LayerProvider>,
      )

      expectLayer('root', 'level=1 size=0 isTopLayer=true zIndex=100')
    })

    it('should count the nested levels below each layer', () => {
      render(
        <LayerProvider zOffset={100}>
          <LayerInfo id="root" />
          <Layer zOffset={10}>
            <LayerInfo id="a" />
            <Layer zOffset={10}>
              <LayerInfo id="b" />
            </Layer>
          </Layer>
        </LayerProvider>,
      )

      expectLayer('root', 'level=1 size=2 isTopLayer=false zIndex=100')
      expectLayer('a', 'level=2 size=1 isTopLayer=false zIndex=110')
      expectLayer('b', 'level=3 size=0 isTopLayer=true zIndex=120')
    })

    it('should count sibling layers as one level', () => {
      render(<Tree a sibling />)

      expectLayer('root', 'level=1 size=1 isTopLayer=false zIndex=0')
      expectLayer('a', 'level=2 size=0 isTopLayer=true zIndex=1')
      expectLayer('sibling', 'level=2 size=0 isTopLayer=true zIndex=1')
    })

    it('should become the top layer again when the child layers unmount', () => {
      const {rerender} = render(<Tree a b sibling />)

      expectLayer('root', 'level=1 size=2 isTopLayer=false zIndex=0')
      expectLayer('a', 'level=2 size=1 isTopLayer=false zIndex=1')

      rerender(<Tree a sibling />)

      expectLayer('root', 'level=1 size=1 isTopLayer=false zIndex=0')
      expectLayer('a', 'level=2 size=0 isTopLayer=true zIndex=1')

      rerender(<Tree sibling />)

      expectLayer('root', 'level=1 size=1 isTopLayer=false zIndex=0')

      rerender(<Tree />)

      expectLayer('root', 'level=1 size=0 isTopLayer=true zIndex=0')
    })

    it('should count children that register without a level', () => {
      const {rerender} = render(
        <LayerProvider>
          <LayerInfo id="root" />
          <LegacyChild />
          <LegacyChild />
        </LayerProvider>,
      )

      expectLayer('root', 'level=1 size=2 isTopLayer=false zIndex=0')

      rerender(
        <LayerProvider>
          <LayerInfo id="root" />
          <LegacyChild />
        </LayerProvider>,
      )

      expectLayer('root', 'level=1 size=1 isTopLayer=false zIndex=0')

      rerender(
        <LayerProvider>
          <LayerInfo id="root" />
        </LayerProvider>,
      )

      expectLayer('root', 'level=1 size=0 isTopLayer=true zIndex=0')
    })

    it('should ignore a repeated child disposer call', () => {
      render(
        <LayerProvider>
          <LayerInfo id="root" />
          <RegisteredChild />
          <DisposeTwiceChild />
        </LayerProvider>,
      )

      expectLayer('root', 'level=1 size=1 isTopLayer=false zIndex=0')
    })

    it('should keep `registerChild` stable while child layers come and go', () => {
      const seen = new Set<LayerContextValue['registerChild']>()

      function TrackRegisterChild() {
        seen.add(useLayer().registerChild)

        return null
      }

      const {rerender} = render(
        <LayerProvider>
          <TrackRegisterChild />
        </LayerProvider>,
      )

      rerender(
        <LayerProvider>
          <TrackRegisterChild />
          <Layer>
            <Layer />
          </Layer>
        </LayerProvider>,
      )

      rerender(
        <LayerProvider>
          <TrackRegisterChild />
        </LayerProvider>,
      )

      expect(seen.size).toBe(1)
    })
  })
})
