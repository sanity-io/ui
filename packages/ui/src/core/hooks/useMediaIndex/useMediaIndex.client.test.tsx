/** @vitest-environment jsdom */

import {act, render, screen} from '@testing-library/react'
import {StrictMode, Suspense} from 'react'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'

import {
  installMatchMedia,
  type MatchMediaController,
} from '../../../../test/mocks/matchMediaController'
import {buildTheme} from '../../../theme/build/buildTheme'
import {_IDLE_STORE_LIMIT} from '../../observers/mediaQueryObserver'
import {ThemeProvider} from '../../theme/themeProvider'
import {useTheme_v2} from '../../theme/useTheme'
import {_getMediaStore, type _MediaStore, useMediaIndex} from './useMediaIndex'

/** Eviction of a store that lost its last subscriber is deferred to a microtask */
const evictions = () => Promise.resolve()

const QUERIES = [
  'screen and (max-width: 599px)',
  'screen and (min-width: 600px) and (max-width: 899px)',
  'screen and (min-width: 900px)',
]

function Index({id}: {id: string}) {
  const mediaIndex = useMediaIndex()

  return <output data-testid={id}>{mediaIndex}</output>
}

function Indexes({count, media}: {count: number; media: number[]}) {
  const theme = buildTheme({media})

  return (
    <ThemeProvider theme={theme}>
      {Array.from({length: count}, (_, index) => (
        <Index key={index} id={`index-${index}`} />
      ))}
    </ThemeProvider>
  )
}

describe('useMediaIndex', () => {
  let controller: MatchMediaController

  beforeEach(() => {
    controller = installMatchMedia({[QUERIES[0]]: true})
  })

  afterEach(() => {
    controller.restore()
  })

  it('evaluates each breakpoint query once and shares one listener across components', () => {
    const {unmount} = render(<Indexes count={20} media={[600, 900]} />)

    expect(controller.matchMedia).toHaveBeenCalledTimes(QUERIES.length)

    for (const query of QUERIES) {
      expect(controller.matchMedia).toHaveBeenCalledWith(query)
      expect(controller.listenerCount(query)).toBe(1)
    }

    unmount()

    for (const query of QUERIES) {
      expect(controller.listenerCount(query)).toBe(0)
    }
  })

  it('shares one listener per query with components that mount later', () => {
    // StrictMode unsubscribes and resubscribes the first root's components on mount, which
    // evicts their stores in between; the second root must still land on them
    render(
      <StrictMode>
        <Indexes count={1} media={[600, 900]} />
      </StrictMode>,
    )
    render(
      <StrictMode>
        <Indexes count={1} media={[600, 900]} />
      </StrictMode>,
    )

    expect(controller.matchMedia).toHaveBeenCalledTimes(QUERIES.length)

    for (const query of QUERIES) {
      expect(controller.listenerCount(query)).toBe(1)
    }
  })

  it('shares the store between equal breakpoint arrays that are different instances', () => {
    render(
      <>
        <Indexes count={1} media={[600, 900]} />
        <Indexes count={1} media={[600, 900]} />
      </>,
    )

    expect(controller.matchMedia).toHaveBeenCalledTimes(QUERIES.length)

    for (const query of QUERIES) {
      expect(controller.listenerCount(query)).toBe(1)
    }
  })

  it('updates every component when the matching query changes', () => {
    render(<Indexes count={2} media={[600, 900]} />)

    expect(screen.getByTestId('index-0')).toHaveTextContent('0')
    expect(screen.getByTestId('index-1')).toHaveTextContent('0')

    act(() => {
      controller.setMatches(QUERIES[0], false)
      controller.setMatches(QUERIES[1], true)
    })

    expect(screen.getByTestId('index-0')).toHaveTextContent('1')
    expect(screen.getByTestId('index-1')).toHaveTextContent('1')

    act(() => {
      controller.setMatches(QUERIES[1], false)
      controller.setMatches(QUERIES[2], true)
    })

    expect(screen.getByTestId('index-0')).toHaveTextContent('2')
    expect(screen.getByTestId('index-1')).toHaveTextContent('2')

    // Rendering and subscribing never re-evaluate a query
    expect(controller.matchMedia).toHaveBeenCalledTimes(QUERIES.length)
  })

  it('keeps mounted components on the lists they subscribed to when window.matchMedia is replaced', async () => {
    const {unmount} = render(<Indexes count={2} media={[600, 900]} />)
    const previous = controller

    controller.restore()
    controller = installMatchMedia({[QUERIES[2]]: true})

    // The index keeps following the lists the components subscribed to…
    expect(screen.getByTestId('index-0')).toHaveTextContent('0')

    act(() => {
      previous.setMatches(QUERIES[0], false)
      previous.setMatches(QUERIES[1], true)
    })

    expect(screen.getByTestId('index-0')).toHaveTextContent('1')
    expect(screen.getByTestId('index-1')).toHaveTextContent('1')
    expect(controller.matchMedia).not.toHaveBeenCalled()

    // …and a remount picks up the replacement
    unmount()
    await evictions()
    render(<Indexes count={2} media={[600, 900]} />)

    expect(controller.matchMedia).toHaveBeenCalledTimes(QUERIES.length)
    expect(screen.getByTestId('index-0')).toHaveTextContent('2')
  })

  it('caps the stores kept for breakpoint arrays that never subscribe', () => {
    const arrays = Array.from({length: _IDLE_STORE_LIMIT + 1}, (_, index) => [600 + index])
    const stores = arrays.map((media) => {
      const store = _getMediaStore(media)

      store.getSnapshot()

      return store
    })

    // The most recently requested stores are still shared…
    expect(_getMediaStore(arrays[1])).toBe(stores[1])
    expect(_getMediaStore(arrays[_IDLE_STORE_LIMIT])).toBe(stores[_IDLE_STORE_LIMIT])

    // …the least recently requested one made room
    expect(_getMediaStore(arrays[0])).not.toBe(stores[0])
  })

  it('bounds what renders that never subscribe leave behind', async () => {
    const pending = new Promise<void>(() => {})
    const seen: _MediaStore[] = []

    // Asks for its breakpoints, then suspends for good: the render never commits, so it never
    // subscribes. The store is recorded through the same lookup the hook uses.
    function Abandoned(): React.JSX.Element {
      useMediaIndex()
      seen.push(_getMediaStore(useTheme_v2().media))

      throw pending
    }

    const count = _IDLE_STORE_LIMIT + 5
    const arrays = Array.from({length: count}, (_, index) => [600 + index])

    // Awaited: a sync act reports the never-settling suspensions as unflushed
    await act(async () => {
      for (const media of arrays) {
        render(
          <ThemeProvider theme={buildTheme({media})}>
            <Suspense fallback={null}>
              <Abandoned />
            </Suspense>
          </ThemeProvider>,
        )
      }
    })

    // The most recent abandoned renders' stores are still shared, the oldest made room
    expect(_getMediaStore(arrays[count - 1])).toBe(seen.at(-1))
    expect(_getMediaStore(arrays[0])).not.toBe(seen[0])
  })

  it('subscribes afresh after every component unmounted', async () => {
    render(<Indexes count={2} media={[600, 900]} />).unmount()
    await evictions()

    for (const query of QUERIES) {
      expect(controller.listenerCount(query)).toBe(0)
    }

    const {unmount} = render(<Indexes count={2} media={[600, 900]} />)

    // The stores and their lists were evicted with the last subscriber, so each query is
    // evaluated once more, and the new subscribers get their updates
    expect(controller.matchMedia).toHaveBeenCalledTimes(QUERIES.length * 2)
    expect(screen.getByTestId('index-0')).toHaveTextContent('0')

    act(() => {
      controller.setMatches(QUERIES[0], false)
      controller.setMatches(QUERIES[2], true)
    })

    expect(screen.getByTestId('index-0')).toHaveTextContent('2')
    expect(screen.getByTestId('index-1')).toHaveTextContent('2')

    unmount()

    for (const query of QUERIES) {
      expect(controller.listenerCount(query)).toBe(0)
    }
  })
})
