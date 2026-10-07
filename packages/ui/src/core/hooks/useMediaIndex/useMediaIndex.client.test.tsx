/** @vitest-environment jsdom */

import {act, render, screen} from '@testing-library/react'
import {StrictMode} from 'react'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'

import {buildTheme} from '../../../theme/build/buildTheme'
import {ThemeProvider} from '../../theme/themeProvider'
import {useMediaIndex} from './useMediaIndex'

/**
 * A `window.matchMedia` that understands the `(min-width)` / `(max-width)` queries the hook
 * builds, evaluated against a fake viewport width, and that counts the lists it creates and the
 * `change` listeners attached to them.
 */
function installMatchMedia(initialWidth: number) {
  let width = initialWidth
  const lists: {evaluate: () => boolean; matches: boolean; listeners: Set<EventListener>}[] = []
  const calls: string[] = []
  let removed = 0

  const evaluate = (query: string) => {
    const min = /min-width: (\d+)px/.exec(query)
    const max = /max-width: (\d+)px/.exec(query)

    return (!min || width >= Number(min[1])) && (!max || width <= Number(max[1]))
  }

  window.matchMedia = (query) => {
    calls.push(query)

    const list = {
      evaluate: () => evaluate(query),
      matches: evaluate(query),
      listeners: new Set<EventListener>(),
    }

    lists.push(list)

    return {
      addEventListener: (_type: string, listener: EventListenerOrEventListenerObject | null) => {
        if (typeof listener === 'function') list.listeners.add(listener)
      },
      // oxlint-disable-next-line no-deprecated -- MediaQueryList requires this legacy method
      addListener: () => {},
      dispatchEvent: () => true,
      get matches() {
        return list.matches
      },
      media: query,
      onchange: null,
      removeEventListener: (_type: string, listener: EventListenerOrEventListenerObject | null) => {
        removed += 1
        if (typeof listener === 'function') list.listeners.delete(listener)
      },
      // oxlint-disable-next-line no-deprecated -- MediaQueryList requires this legacy method
      removeListener: () => {},
    }
  }

  return {
    get calls() {
      return calls.length
    },
    get listeners() {
      return lists.reduce((sum, list) => sum + list.listeners.size, 0)
    },
    get removed() {
      return removed
    },
    /** Resizes the fake viewport and fires `change` on every list whose result flips. */
    resize(nextWidth: number) {
      width = nextWidth

      for (const list of lists) {
        const matches = list.evaluate()

        if (matches === list.matches) continue

        list.matches = matches

        // The hook's handlers read `matches` from the list, not from the event
        for (const listener of list.listeners) {
          listener(new Event('change'))
        }
      }
    },
  }
}

function Index({id}: {id: string}) {
  return <output data-testid={id}>{useMediaIndex()}</output>
}

function Tree({media}: {media?: number[]}) {
  return (
    <StrictMode>
      <ThemeProvider theme={buildTheme({media})}>
        <Index id="a" />
        <Index id="b" />
        <Index id="c" />
      </ThemeProvider>
    </StrictMode>
  )
}

const BREAKPOINTS = [360, 600, 900, 1200, 1800, 2400]

const originalMatchMedia = window.matchMedia

describe('useMediaIndex', () => {
  let matchMedia: ReturnType<typeof installMatchMedia>

  beforeEach(() => {
    matchMedia = installMatchMedia(700)
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('keeps its subscription when the theme object changes but the breakpoints do not', () => {
    const {rerender} = render(<Tree media={[...BREAKPOINTS]} />)

    expect(screen.getByTestId('a')).toHaveTextContent('2')

    const callsAfterMount = matchMedia.calls
    const listenersAfterMount = matchMedia.listeners
    const removedAfterMount = matchMedia.removed

    expect(listenersAfterMount).toBe(3 * (BREAKPOINTS.length + 1))

    // A different theme object whose `media` is a different array with the same values
    rerender(<Tree media={[...BREAKPOINTS]} />)

    expect(matchMedia.calls).toBe(callsAfterMount)
    expect(matchMedia.listeners).toBe(listenersAfterMount)
    expect(matchMedia.removed).toBe(removedAfterMount)

    // The surviving subscription still delivers changes
    act(() => matchMedia.resize(1000))

    expect(screen.getByTestId('a')).toHaveTextContent('3')
    expect(screen.getByTestId('b')).toHaveTextContent('3')
    expect(screen.getByTestId('c')).toHaveTextContent('3')
  })

  it('re-subscribes when the breakpoints change', () => {
    const {rerender} = render(<Tree media={[...BREAKPOINTS]} />)

    expect(screen.getByTestId('a')).toHaveTextContent('2')

    const callsAfterMount = matchMedia.calls
    const listenersAfterMount = matchMedia.listeners
    const removedAfterMount = matchMedia.removed

    const nextBreakpoints = [320, 640, 960, 1280, 1920, 2560]

    rerender(<Tree media={nextBreakpoints} />)

    // One new list per range for each of the three hooks, the old listeners gone
    expect(matchMedia.calls).toBe(callsAfterMount + 3 * (nextBreakpoints.length + 1))
    expect(matchMedia.removed).toBe(removedAfterMount + listenersAfterMount)
    expect(matchMedia.listeners).toBe(listenersAfterMount)

    // 700px falls in the 640–959 range of the new breakpoints
    expect(screen.getByTestId('a')).toHaveTextContent('2')

    act(() => matchMedia.resize(630))

    expect(screen.getByTestId('a')).toHaveTextContent('1')
    expect(screen.getByTestId('b')).toHaveTextContent('1')
    expect(screen.getByTestId('c')).toHaveTextContent('1')
  })
})
