/** @vitest-environment jsdom */

import {fireEvent, screen} from '@testing-library/react'
import {useEffect, useState} from 'react'
import {describe, expect, it} from 'vitest'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
import {render} from '../../../../test/utils'
import {LayerProvider} from './layerProvider'
import {useLayer} from './useLayer'

function Debug(props: {id: string}) {
  const {id} = props
  const layer = useLayer()

  return (
    <div data-testid={id}>
      {`level=${layer.level} size=${layer.size} isTopLayer=${layer.isTopLayer} zIndex=${layer.zIndex}`}
    </div>
  )
}

function LegacyRegistrant() {
  const {registerChild} = useLayer()

  useEffect(() => registerChild(), [registerChild])

  return null
}

describe('LayerProvider', () => {
  it('should provide defaults for a single root layer', () => {
    render(
      <LayerProvider>
        <Debug id="root" />
      </LayerProvider>,
    )

    expect(screen.getByTestId('root')).toHaveTextContent('level=1')
    expect(screen.getByTestId('root')).toHaveTextContent('size=0')
    expect(screen.getByTestId('root')).toHaveTextContent('isTopLayer=true')
  })

  it('should track a nested layer in the parent size', () => {
    render(
      <LayerProvider>
        <Debug id="root" />
        <LayerProvider>
          <Debug id="child" />
        </LayerProvider>
      </LayerProvider>,
    )

    expect(screen.getByTestId('root')).toHaveTextContent('level=1')
    expect(screen.getByTestId('root')).toHaveTextContent('size=1')
    expect(screen.getByTestId('root')).toHaveTextContent('isTopLayer=false')

    expect(screen.getByTestId('child')).toHaveTextContent('level=2')
    expect(screen.getByTestId('child')).toHaveTextContent('size=0')
    expect(screen.getByTestId('child')).toHaveTextContent('isTopLayer=true')
  })

  it('should count distinct descendant levels, propagating to every ancestor', () => {
    render(
      <LayerProvider>
        <Debug id="root" />
        <LayerProvider>
          <Debug id="child" />
          <LayerProvider>
            <Debug id="grandchild" />
          </LayerProvider>
        </LayerProvider>
      </LayerProvider>,
    )

    expect(screen.getByTestId('root')).toHaveTextContent('size=2')
    expect(screen.getByTestId('root')).toHaveTextContent('isTopLayer=false')

    expect(screen.getByTestId('child')).toHaveTextContent('size=1')
    expect(screen.getByTestId('child')).toHaveTextContent('isTopLayer=false')

    expect(screen.getByTestId('grandchild')).toHaveTextContent('size=0')
    expect(screen.getByTestId('grandchild')).toHaveTextContent('isTopLayer=true')
  })

  it('should count sibling layers on the same level as a single level', () => {
    render(
      <LayerProvider>
        <Debug id="root" />
        <LayerProvider>
          <Debug id="child-1" />
        </LayerProvider>
        <LayerProvider>
          <Debug id="child-2" />
        </LayerProvider>
      </LayerProvider>,
    )

    expect(screen.getByTestId('root')).toHaveTextContent('size=1')
    expect(screen.getByTestId('root')).toHaveTextContent('isTopLayer=false')

    expect(screen.getByTestId('child-1')).toHaveTextContent('size=0')
    expect(screen.getByTestId('child-1')).toHaveTextContent('isTopLayer=true')

    expect(screen.getByTestId('child-2')).toHaveTextContent('size=0')
    expect(screen.getByTestId('child-2')).toHaveTextContent('isTopLayer=true')
  })

  it('should restore the parent size when a nested layer unmounts', () => {
    function Fixture() {
      const [open, setOpen] = useState(true)

      return (
        <LayerProvider>
          <Debug id="root" />
          <button onClick={() => setOpen((v) => !v)} type="button">
            toggle
          </button>
          {open && (
            <LayerProvider>
              <Debug id="child" />
              <LayerProvider>
                <Debug id="grandchild" />
              </LayerProvider>
            </LayerProvider>
          )}
        </LayerProvider>
      )
    }

    render(<Fixture />)

    expect(screen.getByTestId('root')).toHaveTextContent('size=2')

    fireEvent.click(screen.getByRole('button', {name: 'toggle'}))

    expect(screen.getByTestId('root')).toHaveTextContent('size=0')
    expect(screen.getByTestId('root')).toHaveTextContent('isTopLayer=true')
    expect(screen.queryByTestId('child')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', {name: 'toggle'}))

    expect(screen.getByTestId('root')).toHaveTextContent('size=2')
    expect(screen.getByTestId('child')).toHaveTextContent('size=1')
    expect(screen.getByTestId('grandchild')).toHaveTextContent('size=0')
  })

  it('should keep the parent size while one of two siblings remains', () => {
    function Fixture() {
      const [open, setOpen] = useState(true)

      return (
        <LayerProvider>
          <Debug id="root" />
          <button onClick={() => setOpen(false)} type="button">
            close
          </button>
          {open && (
            <LayerProvider>
              <Debug id="child-1" />
            </LayerProvider>
          )}
          <LayerProvider>
            <Debug id="child-2" />
          </LayerProvider>
        </LayerProvider>
      )
    }

    render(<Fixture />)

    expect(screen.getByTestId('root')).toHaveTextContent('size=1')

    fireEvent.click(screen.getByRole('button', {name: 'close'}))

    expect(screen.queryByTestId('child-1')).not.toBeInTheDocument()
    expect(screen.getByTestId('root')).toHaveTextContent('size=1')
    expect(screen.getByTestId('root')).toHaveTextContent('isTopLayer=false')
  })

  it('should support legacy registerChild() calls without a level', () => {
    render(
      <LayerProvider>
        <Debug id="root" />
        <LegacyRegistrant />
      </LayerProvider>,
    )

    expect(screen.getByTestId('root')).toHaveTextContent('size=1')
    expect(screen.getByTestId('root')).toHaveTextContent('isTopLayer=false')
  })

  it('should combine legacy children with level children', () => {
    render(
      <LayerProvider>
        <Debug id="root" />
        <LegacyRegistrant />
        <LayerProvider>
          <Debug id="child" />
        </LayerProvider>
      </LayerProvider>,
    )

    expect(screen.getByTestId('root')).toHaveTextContent('size=2')
    expect(screen.getByTestId('child')).toHaveTextContent('size=0')
  })

  it('should stay balanced when a dispose function is called twice', () => {
    function DoubleDispose() {
      const {registerChild} = useLayer()

      useEffect(() => {
        const disposeLevel = registerChild(99)
        const disposeLegacy = registerChild()

        disposeLevel()
        disposeLevel()
        disposeLegacy()
        disposeLegacy()
      }, [registerChild])

      return null
    }

    render(
      <LayerProvider>
        <Debug id="root" />
        <DoubleDispose />
      </LayerProvider>,
    )

    expect(screen.getByTestId('root')).toHaveTextContent('size=0')
    expect(screen.getByTestId('root')).toHaveTextContent('isTopLayer=true')
  })

  it('should calculate zIndex from parent zIndex and zOffset', () => {
    render(
      <LayerProvider zOffset={100}>
        <Debug id="root" />
        <LayerProvider zOffset={10}>
          <Debug id="child" />
        </LayerProvider>
      </LayerProvider>,
    )

    expect(screen.getByTestId('root')).toHaveTextContent('zIndex=100')
    expect(screen.getByTestId('child')).toHaveTextContent('zIndex=110')
  })
})
