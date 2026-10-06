/** @vitest-environment jsdom */

import {act, render, screen} from '@testing-library/react'
import {Suspense} from 'react'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'

import {
  installMatchMedia,
  type MatchMediaController,
} from '../../../test/mocks/matchMediaController'
import {_getMediaQueryStore, _IDLE_STORE_LIMIT} from '../observers/mediaQueryObserver'
import {useMatchMedia} from './useMatchMedia'
import {usePrefersReducedMotion} from './usePrefersReducedMotion'

const QUERY = '(prefers-reduced-motion: reduce)'

const pending = new Promise<void>(() => {})

/** Asks for its query, then suspends for good: the render never commits, so it never subscribes */
function Abandoned({query}: {query: `(${string})`}): React.JSX.Element {
  useMatchMedia(query)

  throw pending
}

function Motion({id}: {id: number}) {
  const reduced = usePrefersReducedMotion()

  return <output data-testid={`motion-${id}`}>{String(reduced)}</output>
}

function Motions({count, label}: {count: number; label: string}) {
  return (
    <>
      <span>{label}</span>
      {Array.from({length: count}, (_, index) => (
        <Motion key={index} id={index} />
      ))}
    </>
  )
}

describe('useMatchMedia', () => {
  let controller: MatchMediaController

  beforeEach(() => {
    controller = installMatchMedia()
  })

  afterEach(() => {
    controller.restore()
  })

  it('evaluates a query once, however many components ask and however often they render', () => {
    const {rerender} = render(<Motions count={20} label="a" />)

    expect(controller.matchMedia).toHaveBeenCalledTimes(1)
    expect(controller.matchMedia).toHaveBeenCalledWith(QUERY)

    rerender(<Motions count={20} label="b" />)
    rerender(<Motions count={20} label="c" />)

    expect(controller.matchMedia).toHaveBeenCalledTimes(1)
  })

  it('shares one change listener and updates every subscriber when the query flips', () => {
    const {unmount} = render(<Motions count={3} label="a" />)

    expect(controller.listenerCount(QUERY)).toBe(1)
    expect(screen.getByTestId('motion-0')).toHaveTextContent('false')

    act(() => controller.setMatches(QUERY, true))

    for (const id of [0, 1, 2]) {
      expect(screen.getByTestId(`motion-${id}`)).toHaveTextContent('true')
    }

    act(() => controller.setMatches(QUERY, false))

    for (const id of [0, 1, 2]) {
      expect(screen.getByTestId(`motion-${id}`)).toHaveTextContent('false')
    }

    unmount()

    expect(controller.listenerCount(QUERY)).toBe(0)
  })

  it('keeps mounted components on the list they subscribed to when window.matchMedia is replaced', () => {
    const {unmount} = render(<Motions count={2} label="a" />)
    const previous = controller

    controller.restore()
    controller = installMatchMedia()

    // Changes keep arriving from the list the components subscribed to…
    act(() => previous.setMatches(QUERY, true))

    expect(screen.getByTestId('motion-0')).toHaveTextContent('true')
    expect(screen.getByTestId('motion-1')).toHaveTextContent('true')
    expect(controller.matchMedia).not.toHaveBeenCalled()

    // …and a remount picks up the replacement
    unmount()
    render(<Motions count={2} label="b" />)

    expect(controller.matchMedia).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId('motion-0')).toHaveTextContent('false')

    act(() => controller.setMatches(QUERY, true))

    expect(screen.getByTestId('motion-0')).toHaveTextContent('true')
    expect(screen.getByTestId('motion-1')).toHaveTextContent('true')
  })

  it('bounds what renders that never subscribe leave behind', async () => {
    const count = _IDLE_STORE_LIMIT + 5
    const query = (index: number): `(${string})` => `(min-width: ${index}px)`

    // Awaited: a sync act reports the never-settling suspensions as unflushed
    await act(async () => {
      for (let index = 0; index < count; index += 1) {
        render(
          <Suspense fallback={null}>
            <Abandoned query={query(index)} />
          </Suspense>,
        )
      }
    })

    // Every abandoned render evaluated its query once (the StrictMode re-render hits the cache)…
    expect(controller.matchMedia).toHaveBeenCalledTimes(count)

    // …the most recent ones are still cached, the oldest made room
    _getMediaQueryStore(query(count - 1)).getSnapshot()

    expect(controller.matchMedia).toHaveBeenCalledTimes(count)

    _getMediaQueryStore(query(0)).getSnapshot()

    expect(controller.matchMedia).toHaveBeenCalledTimes(count + 1)
  })

  it('subscribes afresh after every component unmounted', () => {
    render(<Motions count={2} label="a" />).unmount()

    expect(controller.listenerCount(QUERY)).toBe(0)

    const {unmount} = render(<Motions count={2} label="b" />)

    // The store and its list were evicted with the last subscriber, so the query is evaluated
    // once more, and the new subscribers get their updates
    expect(controller.matchMedia).toHaveBeenCalledTimes(2)
    expect(controller.listenerCount(QUERY)).toBe(1)

    act(() => controller.setMatches(QUERY, true))

    expect(screen.getByTestId('motion-0')).toHaveTextContent('true')
    expect(screen.getByTestId('motion-1')).toHaveTextContent('true')

    unmount()

    expect(controller.listenerCount(QUERY)).toBe(0)
  })
})
