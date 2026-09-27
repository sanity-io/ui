/** @vitest-environment jsdom */

import {act, startTransition, Suspense, use, useEffect, ViewTransition} from 'react'
import {createRoot, type Root} from 'react-dom/client'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {useTypedDeferredValue} from './useTypedDeferredValue'

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true

let container: HTMLDivElement
let root: Root

beforeEach(() => {
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
})

afterEach(async () => {
  await act(async () => root.unmount())
  container.remove()
})

// What React reads of the document while it runs a view transition, and
// jsdom does not have. Takes them back off with `restoreViewTransitions`
function stubViewTransitions() {
  const startViewTransition = vi.fn(
    (options: {update: () => void | Promise<void>; types?: string[] | null}) => {
      // Applies the DOM change straight away, as a browser would before capturing the new state
      void options.update()

      return {
        finished: Promise.resolve(),
        ready: Promise.resolve(),
        skipTransition: () => {},
        types: new Set(options.types ?? []),
        updateCallbackDone: Promise.resolve(),
      }
    },
  )

  Object.defineProperty(document, 'startViewTransition', {
    configurable: true,
    value: startViewTransition,
  })
  Object.defineProperty(document, 'fonts', {
    configurable: true,
    value: {status: 'loaded'},
  })
  Element.prototype.getAnimations = () => []

  return startViewTransition
}

function restoreViewTransitions() {
  Reflect.deleteProperty(document, 'startViewTransition')
  Reflect.deleteProperty(document, 'fonts')
  Reflect.deleteProperty(Element.prototype, 'getAnimations')
}

describe('useTypedDeferredValue', () => {
  it('commits nothing of a value that changed back before its deferred render did', async () => {
    const committed: boolean[] = []
    let release = () => {}
    const held = new Promise<void>((resolve) => {
      release = resolve
    })

    // Holds the deferred render up, the way a slow one (mounting a whole
    // Studio) would be, until the test lets go
    function Hold() {
      use(held)

      return null
    }

    function Probe(props: {value: boolean}) {
      const deferred = useTypedDeferredValue(props.value, 'test')

      useEffect(() => {
        committed.push(deferred)
      })

      return <Suspense fallback={null}>{deferred && <Hold />}</Suspense>
    }

    await act(async () => root.render(<Probe value={false} />))
    await act(async () => root.render(<Probe value={true} />))
    // The deferred render of `true` is held up — and the value changes back
    await act(async () => root.render(<Probe value={false} />))
    release()
    await act(async () => {})

    expect(committed).not.toContain(true)

    // Nothing is held up anymore: the deferred value follows
    await act(async () => root.render(<Probe value={true} />))

    expect(committed.at(-1)).toBe(true)
  })

  it('gives the view transition of the deferred render its type', async () => {
    const startViewTransition = stubViewTransitions()

    function Probe(props: {value: boolean}) {
      const deferred = useTypedDeferredValue(props.value, 'test-type')

      return deferred ? (
        <ViewTransition>
          <div>shown</div>
        </ViewTransition>
      ) : null
    }

    try {
      await act(async () => root.render(<Probe value={false} />))
      await act(async () => root.render(<Probe value={true} />))
      await act(async () => {})

      expect(container.textContent).toBe('shown')
      expect(startViewTransition).toHaveBeenCalledTimes(1)
      expect(startViewTransition.mock.calls[0][0].types).toEqual(['test-type'])
    } finally {
      restoreViewTransitions()
    }
  })

  it('gives its type to no view transition but the one it asked for', async () => {
    const startViewTransition = stubViewTransitions()
    let release = () => {}
    const held = new Promise<void>((resolve) => {
      release = resolve
    })

    function Hold() {
      use(held)

      return null
    }

    function Probe(props: {other: number; value: boolean}) {
      const deferred = useTypedDeferredValue(props.value, 'test-type')

      return (
        <>
          <Suspense fallback={null}>{deferred && <Hold />}</Suspense>
          <ViewTransition>
            <div>other {props.other}</div>
          </ViewTransition>
        </>
      )
    }

    try {
      await act(async () => root.render(<Probe other={0} value={false} />))
      await act(async () => root.render(<Probe other={0} value={true} />))
      // The deferred render of `true` is held up — and the value changes back,
      // so the type it asked for belongs to a transition that never commits
      await act(async () => root.render(<Probe other={0} value={false} />))
      release()
      await act(async () => {})

      startViewTransition.mockClear()

      // A transition of somebody else's, with no type of its own
      await act(async () => {
        startTransition(() => root.render(<Probe other={1} value={false} />))
      })

      expect(container.textContent).toBe('other 1')
      expect(startViewTransition.mock.calls.flatMap((call) => call[0].types ?? [])).not.toContain(
        'test-type',
      )
    } finally {
      restoreViewTransitions()
    }
  })
})
