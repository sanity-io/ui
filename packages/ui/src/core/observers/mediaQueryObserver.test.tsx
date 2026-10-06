/** @vitest-environment jsdom */

// oxlint-disable-next-line no-unassigned-import
import '../../../test/mocks/resizeObserver.mock'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {
  installMatchMedia,
  type MatchMediaController,
} from '../../../test/mocks/matchMediaController'
import {render} from '../../../test/utils'
import {Button} from '../primitives/button/button'
import {Text} from '../primitives/text/text'
import {Tooltip} from '../primitives/tooltip/tooltip'
import {_getMediaQueryList, _getMediaQueryStore} from './mediaQueryObserver'

const QUERY = '(prefers-reduced-motion: reduce)'

describe('mediaQueryObserver', () => {
  let controller: MatchMediaController

  beforeEach(() => {
    controller = installMatchMedia()
  })

  afterEach(() => {
    controller.restore()
  })

  it('creates one MediaQueryList per query', () => {
    const list = _getMediaQueryList(QUERY)

    expect(_getMediaQueryList(QUERY)).toBe(list)
    expect(_getMediaQueryList('(prefers-color-scheme: dark)')).not.toBe(list)
    expect(controller.matchMedia).toHaveBeenCalledTimes(2)
  })

  it('drops its lists when window.matchMedia is replaced', () => {
    const list = _getMediaQueryList(QUERY)

    controller.restore()
    controller = installMatchMedia()

    expect(_getMediaQueryList(QUERY)).not.toBe(list)
    expect(controller.matchMedia).toHaveBeenCalledTimes(1)
  })

  it('shares one change listener between the subscribers of a query', () => {
    const store = _getMediaQueryStore(QUERY)
    const first = vi.fn()
    const second = vi.fn()

    expect(_getMediaQueryStore(QUERY)).toBe(store)
    expect(store.getSnapshot()).toBe(false)

    const unsubscribeFirst = store.subscribe(first)
    const unsubscribeSecond = store.subscribe(second)

    expect(controller.listenerCount(QUERY)).toBe(1)

    controller.setMatches(QUERY, true)

    expect(first).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(1)
    expect(store.getSnapshot()).toBe(true)

    // The listener stays as long as one subscriber is left…
    unsubscribeFirst()

    expect(controller.listenerCount(QUERY)).toBe(1)

    controller.setMatches(QUERY, false)

    expect(first).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(2)

    // …and goes with the last one
    unsubscribeSecond()

    expect(controller.listenerCount(QUERY)).toBe(0)

    // Subscribing and reading never evaluated the query again
    expect(controller.matchMedia).toHaveBeenCalledTimes(1)
  })

  it('evicts the store and its list with the last subscriber, and recreates them for the next', () => {
    const store = _getMediaQueryStore(QUERY)
    const unsubscribe = store.subscribe(vi.fn())

    expect(controller.matchMedia).toHaveBeenCalledTimes(1)

    unsubscribe()

    expect(controller.listenerCount(QUERY)).toBe(0)

    const next = _getMediaQueryStore(QUERY)
    const subscriber = vi.fn()

    expect(next).not.toBe(store)

    const unsubscribeNext = next.subscribe(subscriber)

    // A fresh list for the fresh store…
    expect(controller.matchMedia).toHaveBeenCalledTimes(2)
    expect(controller.listenerCount(QUERY)).toBe(1)

    // …that still delivers changes
    controller.setMatches(QUERY, true)

    expect(subscriber).toHaveBeenCalledTimes(1)
    expect(next.getSnapshot()).toBe(true)

    unsubscribeNext()

    expect(controller.listenerCount(QUERY)).toBe(0)
  })

  it('keeps serving a store that was evicted before a late subscriber reached it', () => {
    // A component subscribes in a commit to the store it rendered with, which another
    // component's unmount can have evicted in the same commit
    const evicted = _getMediaQueryStore(QUERY)

    evicted.subscribe(vi.fn())()

    const current = _getMediaQueryStore(QUERY)
    const late = vi.fn()
    const unsubscribeLate = evicted.subscribe(late)
    const unsubscribeCurrent = current.subscribe(vi.fn())

    expect(current).not.toBe(evicted)

    controller.setMatches(QUERY, true)

    expect(late).toHaveBeenCalledTimes(1)
    expect(evicted.getSnapshot()).toBe(true)

    // The orphan's last subscriber leaving does not evict the current store
    unsubscribeLate()

    expect(_getMediaQueryStore(QUERY)).toBe(current)
    expect(controller.listenerCount(QUERY)).toBe(1)

    unsubscribeCurrent()

    expect(controller.listenerCount(QUERY)).toBe(0)
  })

  it('keeps a subscribed store on the list it listens to when window.matchMedia is replaced', () => {
    const store = _getMediaQueryStore(QUERY)
    const subscriber = vi.fn()
    const unsubscribe = store.subscribe(subscriber)
    const previous = controller

    controller.restore()
    controller = installMatchMedia({[QUERY]: true})

    // The snapshot comes from the list the listener is attached to, not from the replacement
    expect(store.getSnapshot()).toBe(false)
    expect(controller.matchMedia).not.toHaveBeenCalled()

    previous.setMatches(QUERY, true)

    expect(subscriber).toHaveBeenCalledTimes(1)
    expect(store.getSnapshot()).toBe(true)

    // Once the store has been let go of, the next subscriber lands on the new implementation
    unsubscribe()

    const next = _getMediaQueryStore(QUERY)
    const nextSubscriber = vi.fn()
    const unsubscribeNext = next.subscribe(nextSubscriber)

    expect(controller.matchMedia).toHaveBeenCalledTimes(1)
    expect(next.getSnapshot()).toBe(true)

    controller.setMatches(QUERY, false)

    expect(nextSubscriber).toHaveBeenCalledTimes(1)
    expect(next.getSnapshot()).toBe(false)

    unsubscribeNext()
  })

  it('evaluates each media query once for any number of closed tooltips', () => {
    const count = 20

    function Tooltips({label}: {label: string}) {
      return (
        <>
          {Array.from({length: count}, (_, index) => (
            <Tooltip key={index} content={<Text size={1}>{`${label} ${index}`}</Text>}>
              <Button mode="bleed" text={`Hover ${index}`} />
            </Tooltip>
          ))}
        </>
      )
    }

    const {rerender} = render(<Tooltips label="a" />)

    // 7 breakpoint ranges for the `Layer` inside each tooltip, plus `prefers-reduced-motion`
    const queries = new Set(controller.matchMedia.mock.calls.map(([query]) => query))

    expect(queries.size).toBe(8)
    expect(controller.matchMedia).toHaveBeenCalledTimes(8)

    rerender(<Tooltips label="b" />)

    expect(controller.matchMedia).toHaveBeenCalledTimes(8)
  })
})
