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

    // A later subscriber attaches it again
    const third = vi.fn()
    const unsubscribeThird = store.subscribe(third)

    expect(controller.listenerCount(QUERY)).toBe(1)

    controller.setMatches(QUERY, true)

    expect(third).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(2)

    unsubscribeThird()

    // Lists are created once; subscribing and reading never evaluate the query again
    expect(controller.matchMedia).toHaveBeenCalledTimes(1)
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
