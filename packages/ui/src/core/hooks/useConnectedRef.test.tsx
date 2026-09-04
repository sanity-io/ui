/** @vitest-environment jsdom */

import {act, render} from '@testing-library/react'
import {Activity, type ReactNode, Suspense} from 'react'
import {describe, expect, it, vi} from 'vitest'

import {useConnectedRef} from './useConnectedRef'

function Fixture({
  children = 'content',
  onChange,
  visible = true,
}: {
  children?: ReactNode
  onChange: (node: HTMLDivElement | null) => void
  visible?: boolean
}) {
  const ref = useConnectedRef(onChange)

  return visible ? <div ref={ref}>{children}</div> : null
}

function createSuspender() {
  let suspended = false
  let resolve: (() => void) | undefined
  let promise: Promise<void> | undefined

  const Component = ({children}: {children: ReactNode}) => {
    if (suspended) throw promise
    return children
  }

  return {
    Component,
    suspend() {
      suspended = true
      promise = new Promise<void>((nextResolve) => {
        resolve = nextResolve
      })
    },
    resume() {
      suspended = false
      resolve?.()
    },
  }
}

describe('useConnectedRef', () => {
  it('ignores Activity detach and reveal callbacks for connected nodes', async () => {
    const onChange = vi.fn()
    const {rerender, unmount} = render(
      <Activity mode="visible">
        <Fixture onChange={onChange} />
      </Activity>,
    )

    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenLastCalledWith(expect.any(HTMLDivElement))
    onChange.mockClear()

    rerender(
      <Activity mode="hidden">
        <Fixture onChange={onChange} />
      </Activity>,
    )
    await act(async () => undefined)

    rerender(
      <Activity mode="visible">
        <Fixture onChange={onChange} />
      </Activity>,
    )

    expect(onChange).not.toHaveBeenCalled()

    unmount()
    await act(async () => undefined)
  })

  it('ignores Suspense detach and reveal callbacks for connected nodes', async () => {
    const onChange = vi.fn()
    const suspender = createSuspender()
    const renderFixture = () => (
      <Suspense fallback={<div>loading</div>}>
        <suspender.Component>
          <Fixture onChange={onChange} />
        </suspender.Component>
      </Suspense>
    )
    const {rerender, unmount} = render(renderFixture())

    expect(onChange).toHaveBeenCalledOnce()
    onChange.mockClear()

    suspender.suspend()
    rerender(renderFixture())
    await act(async () => undefined)

    await act(async () => {
      suspender.resume()
      rerender(renderFixture())
    })

    expect(onChange).not.toHaveBeenCalled()

    unmount()
    await act(async () => undefined)
  })

  it('forwards null after a node is removed from the document', async () => {
    const onChange = vi.fn()
    const {rerender} = render(<Fixture onChange={onChange} />)
    onChange.mockClear()

    rerender(<Fixture onChange={onChange} visible={false} />)
    await act(async () => undefined)

    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith(null)
  })
})
