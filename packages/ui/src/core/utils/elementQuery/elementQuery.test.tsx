/** @vitest-environment jsdom */

import {render as renderWithoutWrapper, screen} from '@testing-library/react'
import {Profiler, type RefObject, StrictMode, useEffect} from 'react'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from 'vitest'

import {render} from '../../../../test/utils'
import {buildTheme} from '../../../theme/build/buildTheme'
import {ThemeProvider} from '../../theme/themeProvider'
import {createBreakpointObserver} from './breakpointObserver'
import {ElementQuery} from './elementQuery'

const MEDIA = [100, 200, 300]

/**
 * A `ResizeObserver` whose entries the test delivers by hand. jsdom never lays anything out, so
 * the real observer would never report; this one records every instance so the test can find the
 * observer currently watching an element (StrictMode creates two per mount) and report a width.
 */
class ResizeObserverMock {
  static instances: ResizeObserverMock[] = []
  /** Notified of every `observe()` call, for the test that checks when observing starts */
  static onObserve: ((target: Element) => void) | undefined

  readonly observe = vi.fn<(target: Element) => void>((target) => {
    ResizeObserverMock.onObserve?.(target)
  })
  readonly unobserve = vi.fn<(target: Element) => void>()
  readonly disconnect = vi.fn<() => void>()

  constructor(readonly callback: ResizeObserverCallback) {
    ResizeObserverMock.instances.push(this)
  }

  report(target: Element, width: number): void {
    const size = {inlineSize: width, blockSize: 40}

    this.callback(
      [
        {
          target,
          contentRect: target.getBoundingClientRect(),
          borderBoxSize: [size],
          contentBoxSize: [size],
          devicePixelContentBoxSize: [size],
        },
      ],
      this,
    )
  }
}

/** The observers that are currently watching `element` */
function observersOf(element: Element): ResizeObserverMock[] {
  return ResizeObserverMock.instances.filter(
    (observer) =>
      observer.observe.mock.calls.some(([target]) => target === element) &&
      !observer.disconnect.mock.calls.length,
  )
}

/** The one observer that is currently watching `element` (created by the latest effect run) */
function observerOf(element: Element): ResizeObserverMock {
  const active = observersOf(element)

  expect(active).toHaveLength(1)

  return active[0]
}

function reportWidth(element: Element, width: number): void {
  observerOf(element).report(element, width)
}

function PassiveEffectProbe({onEffect}: {onEffect: () => void}) {
  useEffect(() => {
    onEffect()
  }, [onEffect])

  return null
}

beforeAll(() => {
  vi.stubGlobal('ResizeObserver', ResizeObserverMock)
})

afterAll(() => {
  vi.unstubAllGlobals()
})

beforeEach(() => {
  ResizeObserverMock.instances = []
  ResizeObserverMock.onObserve = undefined
})

describe('ElementQuery', () => {
  const innerWidthDescriptor = Object.getOwnPropertyDescriptor(window, 'innerWidth')
  let innerWidth: Mock<() => number>

  beforeEach(() => {
    innerWidth = vi.fn(() => 1024)
    Object.defineProperty(window, 'innerWidth', {get: innerWidth, configurable: true})
  })

  afterEach(() => {
    if (innerWidthDescriptor) Object.defineProperty(window, 'innerWidth', innerWidthDescriptor)
  })

  it('never reads the viewport width, and renders no breakpoint attributes until the element has been measured', () => {
    const {rerender} = render(<ElementQuery data-testid="eq" media={MEDIA} />)
    const element = screen.getByTestId('eq')

    // The previous implementation fell back to `window.innerWidth` during render until the
    // observer had reported, so the first paint described the viewport instead of the element
    expect(innerWidth).not.toHaveBeenCalled()
    expect(element).not.toHaveAttribute('data-eq-min')
    expect(element).not.toHaveAttribute('data-eq-max')

    rerender(<ElementQuery data-testid="eq" media={MEDIA} title="re-rendered" />)

    expect(innerWidth).not.toHaveBeenCalled()

    reportWidth(element, 150)

    expect(innerWidth).not.toHaveBeenCalled()
  })

  it('starts observing in the layout phase, before any passive effect runs', () => {
    const order: string[] = []

    ResizeObserverMock.onObserve = () => {
      order.push('observe')
    }

    // The probe is rendered first: were the element observed from a passive effect, the probe's
    // passive effect would still run before it (effects flush in tree order)
    render(
      <>
        <PassiveEffectProbe
          onEffect={() => {
            order.push('passive')
          }}
        />
        <ElementQuery data-testid="eq" media={MEDIA} />
      </>,
      {strict: false},
    )

    expect(order).toEqual(['observe', 'passive'])
  })

  it('observes the element once, however often the component re-renders', () => {
    const {rerender} = render(<ElementQuery data-testid="eq" media={MEDIA} />, {strict: false})
    const element = screen.getByTestId('eq')

    // The layout effect has no dependency array, so it runs after every commit to notice a
    // changed element; while the element and `media` are unchanged it must not observe again
    rerender(<ElementQuery data-testid="eq" media={MEDIA} title="one" />)
    rerender(<ElementQuery data-testid="eq" media={MEDIA} title="two" />)
    rerender(<ElementQuery data-testid="eq" media={MEDIA} className="three" />)

    expect(ResizeObserverMock.instances).toHaveLength(1)
    expect(ResizeObserverMock.instances[0].observe).toHaveBeenCalledTimes(1)
    expect(ResizeObserverMock.instances[0].observe).toHaveBeenCalledWith(element)
    expect(ResizeObserverMock.instances[0].disconnect).not.toHaveBeenCalled()
  })

  it('writes the breakpoint attributes from the observer callback and keeps them in sync with the width', () => {
    render(<ElementQuery data-testid="eq" media={MEDIA} />)
    const element = screen.getByTestId('eq')

    reportWidth(element, 150)

    expect(element).toHaveAttribute('data-eq-min', '0')
    expect(element).toHaveAttribute('data-eq-max', '1 2')

    reportWidth(element, 250)

    expect(element).toHaveAttribute('data-eq-min', '0 1')
    expect(element).toHaveAttribute('data-eq-max', '2')

    // Narrower than every breakpoint: nothing is "min", everything is "max"
    reportWidth(element, 50)

    expect(element).not.toHaveAttribute('data-eq-min')
    expect(element).toHaveAttribute('data-eq-max', '0 1 2')

    // Wider than every breakpoint: everything is "min", nothing is "max"
    reportWidth(element, 350)

    expect(element).toHaveAttribute('data-eq-min', '0 1 2')
    expect(element).not.toHaveAttribute('data-eq-max')
  })

  it('uses the theme breakpoints by default', () => {
    render(<ElementQuery data-testid="eq" />)
    const element = screen.getByTestId('eq')

    // The default theme media is [360, 600, 900, 1200, 1800, 2400]
    reportWidth(element, 700)

    expect(element).toHaveAttribute('data-eq-min', '0 1')
    expect(element).toHaveAttribute('data-eq-max', '2 3 4 5')
  })

  it('does not re-render when the element is resized', () => {
    const onRender = vi.fn()

    render(
      <Profiler id="eq" onRender={onRender}>
        <ElementQuery data-testid="eq" media={MEDIA} />
      </Profiler>,
    )
    const element = screen.getByTestId('eq')
    const rendersBeforeResize = onRender.mock.calls.length

    reportWidth(element, 150)
    reportWidth(element, 250)

    expect(element).toHaveAttribute('data-eq-min', '0 1')
    expect(onRender).toHaveBeenCalledTimes(rendersBeforeResize)
  })

  it('keeps the measured attributes whatever `data-eq-*` props a caller passes', () => {
    const {rerender} = render(
      <ElementQuery data-eq-max="caller" data-eq-min="caller" data-testid="eq" media={MEDIA} />,
    )
    const element = screen.getByTestId('eq')

    // The attributes are reserved for the observer: React never renders the caller's values…
    expect(element).not.toHaveAttribute('data-eq-min')
    expect(element).not.toHaveAttribute('data-eq-max')

    reportWidth(element, 150)

    expect(element).toHaveAttribute('data-eq-min', '0')
    expect(element).toHaveAttribute('data-eq-max', '1 2')

    // …and neither changing nor dropping them touches the measured ones
    rerender(
      <ElementQuery data-eq-max="changed" data-eq-min="changed" data-testid="eq" media={MEDIA} />,
    )

    expect(element).toHaveAttribute('data-eq-min', '0')
    expect(element).toHaveAttribute('data-eq-max', '1 2')

    rerender(<ElementQuery data-testid="eq" media={MEDIA} />)

    expect(element).toHaveAttribute('data-eq-min', '0')
    expect(element).toHaveAttribute('data-eq-max', '1 2')
  })

  it('observes the element again when `media` changes, so the new breakpoints apply without a resize', () => {
    const {rerender} = render(<ElementQuery data-testid="eq" media={MEDIA} />)
    const element = screen.getByTestId('eq')

    reportWidth(element, 250)

    expect(element).toHaveAttribute('data-eq-min', '0 1')
    expect(element).toHaveAttribute('data-eq-max', '2')

    const previousObserver = observerOf(element)

    rerender(<ElementQuery data-testid="eq" media={[50, 150, 250, 350]} />)

    // A new observer replaces the old one; the browser delivers an initial entry for it
    expect(previousObserver.disconnect).toHaveBeenCalledTimes(1)
    expect(observerOf(element)).not.toBe(previousObserver)

    reportWidth(element, 250)

    expect(element).toHaveAttribute('data-eq-min', '0 1 2')
    expect(element).toHaveAttribute('data-eq-max', '3')
  })

  it('survives StrictMode re-running the effects: the element is observed by exactly one live observer', () => {
    // `StrictMode` has to be the outermost element: React only re-runs the mount effects of a
    // newly placed subtree when `StrictMode` is at (or above) its top, and the test wrapper of
    // `test/utils` renders it below the wrapper component, where React skips it on mount
    renderWithoutWrapper(
      <StrictMode>
        <ThemeProvider theme={buildTheme()}>
          <ElementQuery data-testid="eq" media={MEDIA} />
        </ThemeProvider>
      </StrictMode>,
    )
    const element = screen.getByTestId('eq')

    // StrictMode runs the layout effects, their cleanups, then the effects again
    expect(ResizeObserverMock.instances).toHaveLength(2)
    expect(ResizeObserverMock.instances[0].disconnect).toHaveBeenCalledTimes(1)
    expect(ResizeObserverMock.instances[1].observe).toHaveBeenCalledWith(element)
    expect(ResizeObserverMock.instances[1].disconnect).not.toHaveBeenCalled()

    reportWidth(element, 150)

    expect(element).toHaveAttribute('data-eq-min', '0')
  })

  it('disconnects the observer on unmount', () => {
    const {unmount} = render(<ElementQuery data-testid="eq" media={MEDIA} />)
    const observer = observerOf(screen.getByTestId('eq'))

    unmount()

    expect(observer.disconnect).toHaveBeenCalledTimes(1)
  })

  it('forwards the ref to the element and spreads the remaining props onto it', () => {
    const ref: RefObject<HTMLDivElement | null> = {current: null}

    render(
      <ElementQuery className="eq" data-testid="eq" media={MEDIA} ref={ref}>
        <span>child</span>
      </ElementQuery>,
    )
    const element = screen.getByTestId('eq')

    expect(ref.current).toBe(element)
    expect(element).toHaveAttribute('data-ui', 'ElementQuery')
    expect(element).toHaveClass('eq')
    expect(element).toContainElement(screen.getByText('child'))
  })
})

// The component cannot swap the element behind its ref itself (it always renders the same
// `div`), so the swap path of the observer is covered here
describe('createBreakpointObserver', () => {
  it('observes an element once while the element and media are unchanged', () => {
    const observer = createBreakpointObserver()
    const element = document.createElement('div')

    observer.observe(element, MEDIA)
    observer.observe(element, MEDIA)
    observer.observe(element, MEDIA)

    expect(ResizeObserverMock.instances).toHaveLength(1)
    expect(ResizeObserverMock.instances[0].observe).toHaveBeenCalledTimes(1)
    expect(ResizeObserverMock.instances[0].observe).toHaveBeenCalledWith(element)

    reportWidth(element, 150)

    expect(element).toHaveAttribute('data-eq-min', '0')
    expect(element).toHaveAttribute('data-eq-max', '1 2')
  })

  it('moves to a new element, releasing the previous one', () => {
    const observer = createBreakpointObserver()
    const first = document.createElement('div')
    const second = document.createElement('div')

    observer.observe(first, MEDIA)
    reportWidth(first, 150)

    observer.observe(second, MEDIA)

    expect(observersOf(first)).toHaveLength(0)
    expect(ResizeObserverMock.instances[0].disconnect).toHaveBeenCalledTimes(1)

    reportWidth(second, 250)

    expect(second).toHaveAttribute('data-eq-min', '0 1')
    expect(second).toHaveAttribute('data-eq-max', '2')
    // The previous element keeps the attributes it had; nothing observes it any more
    expect(first).toHaveAttribute('data-eq-min', '0')
  })

  it('observes the element again with a new media list', () => {
    const observer = createBreakpointObserver()
    const element = document.createElement('div')

    observer.observe(element, MEDIA)
    observer.observe(element, [50, 150, 250, 350])

    expect(ResizeObserverMock.instances).toHaveLength(2)
    expect(ResizeObserverMock.instances[0].disconnect).toHaveBeenCalledTimes(1)

    reportWidth(element, 250)

    expect(element).toHaveAttribute('data-eq-min', '0 1 2')
    expect(element).toHaveAttribute('data-eq-max', '3')
  })

  it('releases the element for `null`, and on `disconnect()`', () => {
    const observer = createBreakpointObserver()
    const element = document.createElement('div')

    observer.observe(element, MEDIA)
    observer.observe(null, MEDIA)

    expect(observersOf(element)).toHaveLength(0)
    expect(ResizeObserverMock.instances).toHaveLength(1)

    // Observing again after a release starts a fresh observer
    observer.observe(element, MEDIA)

    expect(observersOf(element)).toHaveLength(1)

    observer.disconnect()
    observer.disconnect()

    expect(observersOf(element)).toHaveLength(0)
    expect(ResizeObserverMock.instances[1].disconnect).toHaveBeenCalledTimes(1)
  })
})
