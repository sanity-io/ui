/** @vitest-environment jsdom */

import {platform} from '@floating-ui/react-dom'
import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {type CSSProperties, useState} from 'react'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {BoundaryElementProvider} from '../../utils/boundaryElement/boundaryElementProvider'
import {Button} from '../button/button'
import {Text} from '../text/text'
import {Popover, type PopoverProps} from './popover'

const content = <Text size={1}>Popover content</Text>

function getReference() {
  return screen.getByRole('button', {name: 'Reference'})
}

/** The popover card itself, not just its `content`, so that the test covers the whole hidden tree */
function queryPopoverCard() {
  return document.querySelector('[data-ui="Popover"]')
}

/** `<Activity mode="hidden">` hides its content with an inline `display: none` on the topmost host nodes */
function hiddenByActivity(element: Element) {
  for (let node: Element | null = element; node; node = node.parentElement) {
    if (node instanceof HTMLElement && node.style.display === 'none') return true
  }

  return false
}

/**
 * The intent listeners are registered with an `AbortSignal` and removed by aborting it, so the
 * registrations whose signal has not been aborted are the ones still listening. A registration
 * without a signal can never be removed that way, so it counts as listening for good.
 */
function spyOnIntentListeners(reference: HTMLElement) {
  const addEventListener = vi.spyOn(reference, 'addEventListener')

  return {
    active: () =>
      addEventListener.mock.calls.filter(([type, , options]) => {
        if (type !== 'focusin' && type !== 'pointerenter' && type !== 'pointerdown') return false

        return typeof options === 'object' && options.signal ? !options.signal.aborted : true
      }).length,
  }
}

function expectNotRendered() {
  expect(queryPopoverCard()).toBeNull()
  expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
}

function expectRenderedHidden() {
  expect(queryPopoverCard()).not.toBeNull()
  expect(screen.getByText('Popover content')).not.toBeVisible()
}

function expectVisible() {
  expect(screen.getByText('Popover content')).toBeVisible()
}

/**
 * Records every `ResizeObserver` the popover creates, so that the tests can count observations
 * and deliver sizes. Replaces the no-op mock imported at the top for the tests that stub it in.
 */
class RecordingResizeObserver {
  static instances: RecordingResizeObserver[] = []
  static observed: Element[] = []

  callback: ResizeObserverCallback
  targets = new Set<Element>()
  disconnected = false

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
    RecordingResizeObserver.instances.push(this)
  }

  observe(target: Element) {
    this.targets.add(target)
    RecordingResizeObserver.observed.push(target)
  }

  unobserve(target: Element) {
    this.targets.delete(target)
  }

  disconnect() {
    this.targets.clear()
    this.disconnected = true
  }

  /** Delivers a border-box size for `target`, like the browser does after a resize */
  resize(target: Element, width: number, height: number) {
    const size = {inlineSize: width, blockSize: height}

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

function observersOf(target: Element) {
  return RecordingResizeObserver.instances.filter((ro) => ro.targets.has(target))
}

/** How many times `target` was observed (Floating UI observes the reference and card too) */
function timesObserved(target: Element) {
  return RecordingResizeObserver.observed.filter((observed) => observed === target).length
}

function cardElement() {
  return document.querySelector<HTMLElement>('[data-ui="Popover"]')
}

/** The popover card's inline `max-width`, which follows the boundary width minus the padding */
function cardMaxWidth() {
  return cardElement()?.style.maxWidth
}

/**
 * Lets Floating UI's positioning pass, which runs in microtasks after a commit, finish and commit
 * its result
 */
function settle() {
  return act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)))
}

describe('Popover', () => {
  describe('pre-rendering while closed', () => {
    it('does not render a closed popover until the reference element shows intent to open it', () => {
      render(
        <Popover content={content}>
          <Button text="Reference" />
        </Popover>,
      )

      expectNotRendered()
    })

    it('pre-renders the closed popover, hidden, once the reference element receives focus', () => {
      render(
        <Popover content={content}>
          <Button text="Reference" />
        </Popover>,
      )

      fireEvent.focusIn(getReference())

      expectRenderedHidden()
    })

    it('pre-renders the closed popover, hidden, once a pointer enters the reference element', () => {
      render(
        <Popover content={content}>
          <Button text="Reference" />
        </Popover>,
      )

      fireEvent.pointerEnter(getReference())

      expectRenderedHidden()
    })

    it('pre-renders the closed popover, hidden, once a pointer presses the reference element', () => {
      render(
        <Popover content={content}>
          <Button text="Reference" />
        </Popover>,
      )

      fireEvent.pointerDown(getReference())

      expectRenderedHidden()
    })

    it('has no visible side effects when intent is not followed by an open', () => {
      render(
        <>
          <Popover content={<Button text="Popover content" />}>
            <Button text="Reference" />
          </Popover>
          <Button text="Next" />
        </>,
      )

      const reference = getReference()

      act(() => reference.focus())
      fireEvent.pointerEnter(reference)
      fireEvent.pointerLeave(reference)

      expectRenderedHidden()
      // The pre-rendered content is out of the accessibility tree and did not take focus
      expect(screen.queryByRole('button', {name: 'Popover content'})).not.toBeInTheDocument()
      expect(reference).toHaveFocus()

      act(() => screen.getByRole('button', {name: 'Next'}).focus())

      expectRenderedHidden()
      expect(screen.getByRole('button', {name: 'Next'})).toHaveFocus()
    })

    it('counts a reference element that is focused before the popover renders as intent', () => {
      render(
        <Popover content={content}>
          <Button autoFocus text="Reference" />
        </Popover>,
      )

      expect(getReference()).toHaveFocus()
      expectRenderedHidden()
    })

    it('counts an external `referenceElement` that is focused already as intent', () => {
      const reference = document.createElement('button')

      reference.textContent = 'External reference'
      document.body.appendChild(reference)
      reference.focus()
      expect(reference).toHaveFocus()

      render(<Popover content={content} referenceElement={reference} />)

      expectRenderedHidden()

      reference.remove()
    })

    it('counts focus landing inside the reference element as intent', () => {
      render(
        <Popover content={content}>
          <div data-testid="reference">
            <Button text="Reference" />
          </div>
        </Popover>,
      )

      fireEvent.focusIn(getReference())

      expectRenderedHidden()
    })

    it('shows the pre-rendered popover when it opens', () => {
      const {rerender} = render(
        <Popover content={content}>
          <Button text="Reference" />
        </Popover>,
      )

      fireEvent.pointerEnter(getReference())
      expectRenderedHidden()

      rerender(
        <Popover content={content} open>
          <Button text="Reference" />
        </Popover>,
      )

      expectVisible()
    })

    it('renders the popover when it opens without prior intent, and keeps it rendered after it closes', () => {
      const {rerender} = render(
        <Popover content={content}>
          <Button text="Reference" />
        </Popover>,
      )

      expectNotRendered()

      rerender(
        <Popover content={content} open>
          <Button text="Reference" />
        </Popover>,
      )

      expectVisible()

      rerender(
        <Popover content={content}>
          <Button text="Reference" />
        </Popover>,
      )

      expectRenderedHidden()
    })

    it('renders a popover that is open from the start', () => {
      render(
        <Popover content={content} open>
          <Button text="Reference" />
        </Popover>,
      )

      expectVisible()
    })

    it('preserves the state of the content across reopening', () => {
      function Counter() {
        const [count, setCount] = useState(0)

        return <Button onClick={() => setCount((c) => c + 1)} text={`Count ${count}`} />
      }

      function Example() {
        const [open, setOpen] = useState(false)

        return (
          <Popover content={<Counter />} open={open}>
            <Button onClick={() => setOpen((o) => !o)} text="Reference" />
          </Popover>
        )
      }

      render(<Example />)

      fireEvent.click(getReference())
      fireEvent.click(screen.getByRole('button', {name: 'Count 0'}))
      expect(screen.getByRole('button', {name: 'Count 1'})).toBeVisible()

      fireEvent.click(getReference())
      expect(screen.getByText('Count 1')).not.toBeVisible()

      fireEvent.click(getReference())
      expect(screen.getByRole('button', {name: 'Count 1'})).toBeVisible()
    })

    it('listens for intent on an external `referenceElement`', () => {
      function Example(props: Pick<PopoverProps, 'open'>) {
        const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null)

        return (
          <>
            <Button ref={setReferenceElement} text="Reference" />
            <Popover content={content} open={props.open} referenceElement={referenceElement} />
          </>
        )
      }

      const {rerender} = render(<Example />)

      expectNotRendered()

      fireEvent.focusIn(getReference())
      expectRenderedHidden()

      rerender(<Example open />)
      expectVisible()
    })

    it('stops listening for intent once the popover has rendered', () => {
      const reference = document.createElement('button')
      const intentListeners = spyOnIntentListeners(reference)

      const {rerender} = render(<Popover content={content} referenceElement={reference} />)

      expect(intentListeners.active()).toBe(3)

      rerender(<Popover content={content} open referenceElement={reference} />)

      expect(intentListeners.active()).toBe(0)

      // Nothing to listen for once rendered, closing does not bring the listeners back
      rerender(<Popover content={content} referenceElement={reference} />)

      expect(intentListeners.active()).toBe(0)
    })

    it('pre-renders and shows an `animate` popover the same way', () => {
      const {rerender} = render(
        <Popover animate content={content}>
          <Button text="Reference" />
        </Popover>,
      )

      expectNotRendered()

      fireEvent.pointerEnter(getReference())
      expectRenderedHidden()

      rerender(
        <Popover animate content={content} open>
          <Button text="Reference" />
        </Popover>,
      )

      // `motion` fades the card in from `opacity: 0` over animation frames that do not run here,
      // so assert that `Activity` revealed the card rather than that it has faded in
      const card = queryPopoverCard()

      expect(card).not.toBeNull()
      expect(hiddenByActivity(card!)).toBe(false)
    })

    it('does not render anything when `disabled`', () => {
      render(
        <Popover content={content} disabled open>
          <Button text="Reference" />
        </Popover>,
      )

      expectNotRendered()
      expect(getReference()).toBeVisible()
    })

    it('does not count `open` while `disabled`, so enabling a closed popover renders nothing', () => {
      const {rerender} = render(
        <Popover content={content} disabled open>
          <Button text="Reference" />
        </Popover>,
      )

      expectNotRendered()

      rerender(
        <Popover content={content}>
          <Button text="Reference" />
        </Popover>,
      )

      expectNotRendered()

      fireEvent.pointerEnter(getReference())
      expectRenderedHidden()

      rerender(
        <Popover content={content} open>
          <Button text="Reference" />
        </Popover>,
      )

      expectVisible()
    })

    it('does not count intent while `disabled`', () => {
      const reference = document.createElement('button')
      const intentListeners = spyOnIntentListeners(reference)

      const {rerender} = render(<Popover content={content} disabled referenceElement={reference} />)

      expect(intentListeners.active()).toBe(0)

      fireEvent.focusIn(reference)
      fireEvent.pointerEnter(reference)

      rerender(<Popover content={content} referenceElement={reference} />)

      // Nothing was latched while disabled; once enabled it is listening and still renders nothing
      expectNotRendered()
      expect(intentListeners.active()).toBe(3)

      // Disabling again drops the listeners
      rerender(<Popover content={content} disabled referenceElement={reference} />)

      expect(intentListeners.active()).toBe(0)

      rerender(<Popover content={content} referenceElement={reference} />)
      fireEvent.focusIn(reference)

      expectRenderedHidden()
    })
  })

  describe('boundary size while closed', () => {
    /**
     * jsdom lays nothing out, so the boundary's offset size (what the popover measures on open) is
     * defined on the element
     */
    function Example(props: {boundaryWidth: number; open?: boolean}) {
      const [boundary, setBoundary] = useState<HTMLDivElement | null>(null)

      return (
        <div
          data-testid="boundary"
          ref={(node) => {
            if (node) {
              Object.defineProperty(node, 'offsetWidth', {
                configurable: true,
                value: props.boundaryWidth,
              })
              Object.defineProperty(node, 'offsetHeight', {configurable: true, value: 100})
            }
            setBoundary(node)
          }}
        >
          <BoundaryElementProvider element={boundary}>
            <Popover content={content} open={props.open}>
              <Button text="Reference" />
            </Popover>
          </BoundaryElementProvider>
        </div>
      )
    }

    beforeEach(() => {
      RecordingResizeObserver.instances = []
      RecordingResizeObserver.observed = []
      vi.stubGlobal('ResizeObserver', RecordingResizeObserver)
    })

    afterEach(() => {
      vi.unstubAllGlobals()
    })

    // `strict: false`: StrictMode runs every effect twice on mount, which would double the counts
    // the tests below are about
    it('does not observe the boundary element while closed, pre-rendered on intent or not', () => {
      render(<Example boundaryWidth={300} />, {strict: false})

      expect(RecordingResizeObserver.observed).toEqual([])

      fireEvent.pointerEnter(getReference())
      expectRenderedHidden()

      // No boundary observation, and Floating UI (which observes the reference and the card
      // while open) is not running either
      expect(RecordingResizeObserver.observed).toEqual([])
    })

    it('observes the boundary element only while open, and has its width in the opening commit', () => {
      const {rerender} = render(<Example boundaryWidth={300} />, {strict: false})
      const boundary = screen.getByTestId('boundary')

      rerender(<Example boundaryWidth={300} open />)

      // Measured synchronously on open (`300 - 2 * DEFAULT_POPOVER_PADDING`), before any
      // `ResizeObserver` callback has had a chance to run
      expect(cardMaxWidth()).toBe('292px')
      expect(timesObserved(boundary)).toBe(1)

      // The observer's first delivery is the fractional layout size that `offsetWidth` rounds, so
      // it agrees with the measurement and changes nothing
      act(() => observersOf(boundary)[0].resize(boundary, 300.4, 100))
      expect(cardMaxWidth()).toBe('292px')

      // Followed while open, in whole pixels
      act(() => observersOf(boundary)[0].resize(boundary, 200.6, 100))
      expect(cardMaxWidth()).toBe('193px')

      rerender(<Example boundaryWidth={300} />)

      expect(observersOf(boundary)).toEqual([])
      expect(RecordingResizeObserver.instances.at(-1)?.disconnected).toBe(true)

      // A later open observes it again (the shared observer forgets an element once its last
      // subscriber leaves)
      rerender(<Example boundaryWidth={300} open />)

      expect(timesObserved(boundary)).toBe(2)
      expect(cardMaxWidth()).toBe('292px')
    })
  })

  // Every size style on the card has one writer: React renders `width` and `maxWidth` except
  // where the `size` middleware writes them to the element during positioning (the width when it
  // matches the reference element's, the max width when `constrainSize` caps it to the available
  // room), and React never touches a style it did not render.
  //
  // jsdom lays nothing out, so the geometry is defined on the elements: the boundary's offset size
  // (what the popover measures on open) and client size (what Floating UI clips to; the same
  // unless `boundaryClientWidth` says otherwise, as a scrollbar would), the viewport's client size
  // (`beforeEach`), and the reference element's rect, `REFERENCE_WIDTH` wide (`Example`).
  describe('width and max width', () => {
    const REFERENCE_WIDTH = 100

    /**
     * Positioning passes, counted as the measurements Floating UI takes at the start of every pass
     * — and again for every `reset: {rects: true}` the `size` middleware returns, which no test here
     * triggers: jsdom's card is 0×0 unless a test defines its size, and then keeps it constant
     */
    function passes() {
      return vi.mocked(platform.getElementRects).mock.calls.length
    }

    /** Defines the layout sizes jsdom does not compute on a boundary element */
    function defineBoundarySize(node: HTMLElement, width: number, clientWidth = width) {
      for (const [name, value] of [
        ['offsetWidth', width],
        ['offsetHeight', 100],
        ['clientWidth', clientWidth],
        ['clientHeight', 100],
      ] as const) {
        Object.defineProperty(node, name, {configurable: true, value})
      }
    }

    const plainBoundaries: HTMLElement[] = []

    /**
     * A boundary element of the test's own: a plain element (no own enumerable properties, so
     * `useFloating`'s deep comparison cannot tell two of them apart) in the document, at the
     * origin unless `rect` says otherwise
     */
    function plainBoundary(width: number, clientWidth = width, rect?: {x: number; y: number}) {
      const element = document.createElement('div')

      defineBoundarySize(element, width, clientWidth)
      if (rect) {
        element.getBoundingClientRect = () =>
          DOMRect.fromRect({...rect, width: clientWidth, height: 100})
      }
      document.body.appendChild(element)
      plainBoundaries.push(element)

      return element
    }

    function Example(
      props: {
        boundaryWidth: number
        boundaryClientWidth?: number
        /**
         * A boundary element of the test's own for the provider, instead of the one the example
         * renders; `null` for no boundary at all
         */
        boundaryElement?: HTMLElement | null
        /** Where the reference element is, instead of at the origin */
        referenceRect?: {x: number; y: number}
        style?: CSSProperties
      } & Pick<
        PopoverProps,
        | '__unstable_margins'
        | 'constrainSize'
        | 'fallbackPlacements'
        | 'floatingBoundary'
        | 'matchReferenceWidth'
        | 'open'
        | 'referenceBoundary'
        | 'tone'
        | 'width'
      >,
    ) {
      const {
        boundaryWidth,
        boundaryClientWidth = boundaryWidth,
        boundaryElement,
        referenceRect = {x: 0, y: 0},
        ...popoverProps
      } = props
      // The boundary element reaches the provider through state, in a nested commit of the mount
      // task, as `BoundaryElementProvider`s rendered from a ref callback do
      const [boundary, setBoundary] = useState<HTMLDivElement | null>(null)

      return (
        <div
          data-testid="boundary"
          ref={(node) => {
            if (node) defineBoundarySize(node, boundaryWidth, boundaryClientWidth)
            setBoundary(node)
          }}
        >
          <BoundaryElementProvider
            element={boundaryElement === undefined ? boundary : boundaryElement}
          >
            <Popover content={content} {...popoverProps}>
              <Button
                ref={(node) => {
                  if (node) {
                    node.getBoundingClientRect = () =>
                      DOMRect.fromRect({...referenceRect, width: REFERENCE_WIDTH, height: 20})
                  }
                }}
                text="Reference"
              />
            </Popover>
          </BoundaryElementProvider>
        </div>
      )
    }

    beforeEach(() => {
      RecordingResizeObserver.instances = []
      RecordingResizeObserver.observed = []
      vi.stubGlobal('ResizeObserver', RecordingResizeObserver)
      vi.spyOn(platform, 'getElementRects')
      Object.defineProperty(document.documentElement, 'clientWidth', {
        configurable: true,
        value: 1024,
      })
      Object.defineProperty(document.documentElement, 'clientHeight', {
        configurable: true,
        value: 768,
      })
    })

    afterEach(() => {
      vi.unstubAllGlobals()
      vi.restoreAllMocks()
      // @ts-expect-error -- removes the own property defined above, uncovering the prototype's
      delete document.documentElement.clientWidth
      // @ts-expect-error -- same
      delete document.documentElement.clientHeight
      for (const element of plainBoundaries.splice(0)) element.remove()
    })

    it('renders the max width on the card, so the boundary resizing while open costs no positioning pass', async () => {
      const {rerender} = render(<Example boundaryWidth={300} />)
      const boundary = screen.getByTestId('boundary')

      rerender(<Example boundaryWidth={300} open />)
      await settle()

      expect(cardMaxWidth()).toBe('292px')
      expect(cardElement()?.style.width).toBe('')
      expect(passes()).toBe(1)

      act(() => observersOf(boundary)[0].resize(boundary, 200, 100))

      // In the same commit as the new size, no pass involved
      expect(cardMaxWidth()).toBe('192px')
      await settle()
      expect(passes()).toBe(1)
    })

    it('lets the `size` middleware write the width when it matches the reference element, and never touches it itself', async () => {
      const {rerender} = render(<Example boundaryWidth={300} matchReferenceWidth />)

      rerender(<Example boundaryWidth={300} matchReferenceWidth open />)
      await settle()

      const card = cardElement()!

      // Written by the middleware during the one positioning pass of the open; the max width is
      // still React's
      expect(card.style.width).toBe(`${REFERENCE_WIDTH}px`)
      expect(card.style.maxWidth).toBe('292px')
      expect(passes()).toBe(1)

      // Re-rendering the card leaves the middleware's write alone
      rerender(<Example boundaryWidth={300} matchReferenceWidth open tone="primary" />)
      await settle()

      expect(card.style.width).toBe(`${REFERENCE_WIDTH}px`)
      expect(passes()).toBe(1)
    })

    it('lets the `size` middleware write the max width under `constrainSize`, and repositions once when it changes', async () => {
      const {rerender} = render(<Example boundaryWidth={300} constrainSize />)
      const boundary = screen.getByTestId('boundary')

      rerender(<Example boundaryWidth={300} constrainSize open />)
      await settle()

      // One pass on open, with the max width from the boundary measured in the opening commit
      expect(cardMaxWidth()).toBe('292px')
      expect(passes()).toBe(1)

      // A boundary resize reaches the element through one positioning pass, which also re-reads
      // the room within the boundary (`Math.min`); the room stays 292 here, the cap wins
      act(() => observersOf(boundary)[0].resize(boundary, 200.6, 100))
      await settle()

      expect(cardMaxWidth()).toBe('193px')
      expect(passes()).toBe(2)

      // An unchanged size, or an unrelated re-render, costs no pass
      act(() => observersOf(boundary)[0].resize(boundary, 200.6, 100))
      rerender(<Example boundaryWidth={300} constrainSize open tone="primary" />)
      await settle()

      expect(passes()).toBe(2)

      // Closing and reopening positions once more, reading the current max width
      rerender(<Example boundaryWidth={300} constrainSize />)
      await settle()
      rerender(<Example boundaryWidth={300} constrainSize open />)
      await settle()

      expect(cardMaxWidth()).toBe('292px')
      expect(passes()).toBe(3)
    })

    // With the default `width` of `auto` React has no width of its own to render, so it renders
    // `''` to clear the middleware's; with a `width` property it renders that (the first
    // `container` width here). And `useFloating` compares middleware deeply, functions by their
    // source, so a middleware that keeps its inputs in a closure is never seen to change: the
    // pass would keep writing the reference width over whatever React rendered
    it.each([
      {width: undefined, expected: ''},
      {width: 0, expected: '320px'},
    ])(
      'clears the width the middleware wrote once `matchReferenceWidth` is turned off, and tells Floating UI (width: $width)',
      async ({width, expected}) => {
        const {rerender} = render(
          <Example boundaryWidth={300} constrainSize matchReferenceWidth width={width} />,
        )

        rerender(
          <Example boundaryWidth={300} constrainSize matchReferenceWidth open width={width} />,
        )
        await settle()

        const card = cardElement()!

        expect(card.style.width).toBe(`${REFERENCE_WIDTH}px`)

        rerender(
          <Example
            boundaryWidth={300}
            constrainSize
            matchReferenceWidth={false}
            open
            width={width}
          />,
        )
        await settle()

        // Cleared or set by React in the commit, and the changed middleware repositioned without
        // writing the reference width again
        expect(card.style.width).toBe(expected)
        expect(passes()).toBe(2)

        // Nor does a later pass (here from a window resize, which `autoUpdate` listens for)
        act(() => {
          window.dispatchEvent(new Event('resize'))
        })
        await settle()

        expect(card.style.width).toBe(expected)
        expect(passes()).toBe(3)
      },
    )

    it('repositions once when `constrainSize` is turned on, with Floating UI restarting `autoUpdate`', async () => {
      const {rerender} = render(<Example boundaryClientWidth={285} boundaryWidth={300} open />)
      await settle()

      const card = cardElement()!

      // React's cap
      expect(card.style.maxWidth).toBe('292px')
      expect(passes()).toBe(1)

      rerender(<Example boundaryClientWidth={285} boundaryWidth={300} constrainSize open />)
      await settle()

      // The changed middleware restarts `autoUpdate` with a pass that writes the room within the
      // boundary; the popover must not add a pass of its own for the cap in the same commit
      expect(card.style.maxWidth).toBe('277px')
      expect(card.style.maxHeight).toBe('72px')
      expect(passes()).toBe(2)
    })

    it('tells Floating UI about changed `fallbackPlacements`, although the boundary is read from a ref', async () => {
      // The boundary goes through a ref so that a change of the element does not recreate the
      // middleware; the other options still have to count as a change for `useFloating`, which
      // compares middleware by their `options` and functions by their source text. A 200×30 card
      // under a reference near the bottom of a 600×100 boundary: `bottom` overflows, and whether
      // it flips to `top` or `right` is decided by the fallback placements of the pass
      const {rerender} = render(
        <Example
          boundaryClientWidth={600}
          boundaryWidth={600}
          fallbackPlacements={['top']}
          referenceRect={{x: 150, y: 70}}
        />,
      )

      // Pre-rendered on intent, so that the card can be given a size before the first pass
      fireEvent.pointerEnter(getReference())

      const card = cardElement()!

      Object.defineProperty(card, 'offsetWidth', {configurable: true, value: 200})
      Object.defineProperty(card, 'offsetHeight', {configurable: true, value: 30})

      rerender(
        <Example
          boundaryClientWidth={600}
          boundaryWidth={600}
          fallbackPlacements={['top']}
          open
          referenceRect={{x: 150, y: 70}}
        />,
      )
      await settle()

      expect(card.dataset.placement).toBe('top')

      rerender(
        <Example
          boundaryClientWidth={600}
          boundaryWidth={600}
          fallbackPlacements={['right']}
          open
          referenceRect={{x: 150, y: 70}}
        />,
      )
      await settle()

      // The changed middleware made Floating UI restart `autoUpdate` with a pass
      expect(card.dataset.placement).toBe('right')
      expect(passes()).toBe(2)
    })

    it('repositions an open popover against a swapped boundary element', async () => {
      // Plain elements, which `useFloating`'s deep comparison cannot tell apart (no own enumerable
      // properties): the middleware reads the boundary through a ref and the popover repositions
      // for the swap itself, so Floating UI need not notice
      const boundaries = [300, 200].map((clientWidth) => plainBoundary(300, clientWidth))

      const {rerender} = render(
        <Example boundaryElement={boundaries[0]} boundaryWidth={300} constrainSize open />,
      )
      await settle()

      const card = cardElement()!

      expect(card.style.maxWidth).toBe('292px')
      expect(passes()).toBe(1)

      rerender(<Example boundaryElement={boundaries[1]} boundaryWidth={300} constrainSize open />)
      await settle()

      // One pass, which clipped to the new boundary's room (the cap stayed at `292`)
      expect(card.style.maxWidth).toBe('192px')
      expect(passes()).toBe(2)
    })

    it('repositions once for a swapped boundary element whose width differs', async () => {
      // The swap commits twice in one task: the swap itself, then the new boundary's size measured
      // in that commit (a nested commit, the cap changing from `292` to `192`). Floating UI reads
      // the refs only after the task, so the pass of the first commit sees both changes and the
      // second commit must not add a pass of its own
      const boundaries = [300, 200].map((width) => plainBoundary(width))

      const {rerender} = render(
        <Example boundaryElement={boundaries[0]} boundaryWidth={300} constrainSize open />,
      )
      await settle()

      const card = cardElement()!

      expect(card.style.maxWidth).toBe('292px')
      expect(passes()).toBe(1)

      rerender(<Example boundaryElement={boundaries[1]} boundaryWidth={300} constrainSize open />)
      await settle()

      expect(card.style.maxWidth).toBe('192px')
      expect(passes()).toBe(2)
    })

    it('positions once when it mounts open under a boundary that arrives in the mount task', async () => {
      // The floating element and the boundary element reach Floating UI and the provider in a
      // nested commit of the mount task, and the boundary's size, measured in that commit, in the
      // next: `autoUpdate` starts with a pass in the first, which reads the cap written in the
      // second, so the popover must not add a pass for the cap of its own
      render(<Example boundaryWidth={300} constrainSize open />)
      await settle()

      expect(cardMaxWidth()).toBe('292px')
      expect(passes()).toBe(1)
    })

    it('renders no cap for a boundary without a width, rather than an infinite one', async () => {
      // A boundary that collapses or is `display: none` while the popover is open reports a `0`
      // border-box size; `Infinity` is not a length, so React would leave the previous cap in place
      const {rerender} = render(<Example boundaryWidth={300} />)
      const boundary = screen.getByTestId('boundary')
      const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)

      rerender(<Example boundaryWidth={300} open />)
      await settle()

      expect(cardMaxWidth()).toBe('292px')

      act(() => observersOf(boundary)[0].resize(boundary, 0, 0))

      expect(cardMaxWidth()).toBe('')
      expect(error).not.toHaveBeenCalled()
    })

    it('renders a cap of zero for a boundary narrower than its padding, rather than a negative one', async () => {
      // A negative length is invalid CSS, which the CSSOM ignores: the previous cap would stay
      const {rerender} = render(<Example boundaryWidth={300} />)
      const boundary = screen.getByTestId('boundary')

      rerender(<Example boundaryWidth={300} open />)
      await settle()

      expect(cardMaxWidth()).toBe('292px')

      act(() => observersOf(boundary)[0].resize(boundary, 6, 100))

      expect(cardMaxWidth()).toBe('0px')
    })

    it('has the `size` middleware write sizes of zero, never negative ones', async () => {
      // The padding uses up the room within a 6px wide boundary (the cap from the provider's
      // 300px wide boundary is `292`, so the room is what is written), and horizontal margins of
      // 60px each exceed the 100px wide reference
      render(
        <Example
          __unstable_margins={[0, 60, 0, 60]}
          boundaryClientWidth={6}
          boundaryWidth={300}
          constrainSize
          matchReferenceWidth
          open
        />,
      )
      await settle()

      const card = cardElement()!

      expect(card.style.width).toBe('0px')
      expect(card.style.maxWidth).toBe('0px')
      expect(card.style.maxHeight).toBe('72px')
    })

    it('tells Floating UI about changed margins', async () => {
      // The margins are an array, compared deeply through the `size` middleware's `options`; the
      // reference-matched width is the reference's less the horizontal margins
      const {rerender} = render(<Example boundaryWidth={300} matchReferenceWidth open />)
      await settle()

      const card = cardElement()!

      expect(card.style.width).toBe(`${REFERENCE_WIDTH}px`)

      rerender(
        <Example
          __unstable_margins={[0, 10, 0, 10]}
          boundaryWidth={300}
          matchReferenceWidth
          open
        />,
      )
      await settle()

      expect(card.style.width).toBe(`${REFERENCE_WIDTH - 20}px`)
      expect(passes()).toBe(2)
    })

    it('repositions against the clipping ancestors once the boundary element is gone', async () => {
      // With no boundary there is no cap either (the last measured size is not kept for an element
      // that is no longer there), so the room within the clipping ancestors — the viewport, here —
      // is what constrains the popover
      const {rerender} = render(
        <Example boundaryElement={plainBoundary(300)} boundaryWidth={300} constrainSize open />,
      )
      await settle()

      const card = cardElement()!

      expect(card.style.maxWidth).toBe('292px')

      rerender(<Example boundaryElement={null} boundaryWidth={300} constrainSize open />)
      await settle()

      expect(card.style.maxWidth).toBe('1016px')
      expect(passes()).toBe(2)
    })

    it('repositions for a changed `floatingBoundary` property on its own', async () => {
      // The provider's boundary (300 wide, so the cap stays `292`) is left alone; only the element
      // the `size` middleware clips to changes
      const {rerender} = render(
        <Example boundaryWidth={300} constrainSize floatingBoundary={plainBoundary(300)} open />,
      )
      await settle()

      const card = cardElement()!

      expect(card.style.maxWidth).toBe('292px')

      rerender(
        <Example
          boundaryWidth={300}
          constrainSize
          floatingBoundary={plainBoundary(300, 200)}
          open
        />,
      )
      await settle()

      expect(card.style.maxWidth).toBe('192px')
      expect(passes()).toBe(2)
    })

    it('repositions for a changed `referenceBoundary` property on its own', async () => {
      // The `hide` middleware hides the card once the reference element is clipped by the
      // reference boundary: a boundary to the right of the reference clips it entirely
      const beside = plainBoundary(100, 100, {x: 500, y: 0})
      const around = plainBoundary(300)
      const {rerender} = render(<Example boundaryWidth={300} open referenceBoundary={around} />)
      await settle()

      const card = cardElement()!

      expect(card.hidden).toBe(false)

      rerender(<Example boundaryWidth={300} open referenceBoundary={beside} />)
      await settle()

      expect(card.hidden).toBe(true)
      expect(passes()).toBe(2)

      rerender(<Example boundaryWidth={300} open referenceBoundary={around} />)
      await settle()

      expect(card.hidden).toBe(false)
      expect(passes()).toBe(3)
    })

    it("lets a consumer `style` set the sizes React owns, never the middleware's", async () => {
      const style = {maxHeight: 50, maxWidth: 60, width: 70}

      // With the default `width` the popover has no width of its own, so the consumer's applies;
      // the popover's cap wins over the consumer's max width (the popover's own value always does);
      // nothing constrains the height
      const {rerender} = render(<Example boundaryWidth={300} open style={style} />)
      await settle()

      const card = cardElement()!

      expect(card.style.width).toBe('70px')
      expect(card.style.maxWidth).toBe('292px')
      expect(card.style.maxHeight).toBe('50px')

      // A `width` property wins over the consumer's width
      rerender(<Example boundaryWidth={300} open style={style} width={0} />)
      await settle()

      expect(card.style.width).toBe('320px')

      // The sizes the middleware owns are not the consumer's to set: `matchReferenceWidth` writes
      // the width, `constrainSize` the max width and height, and an unrelated re-render changes
      // nothing (React is passed `undefined` for them, consumer style or not)
      rerender(<Example boundaryWidth={300} constrainSize matchReferenceWidth open style={style} />)
      await settle()

      expect(card.style.width).toBe(`${REFERENCE_WIDTH}px`)
      expect(card.style.maxWidth).toBe('292px')
      expect(card.style.maxHeight).toBe('72px')

      rerender(
        <Example
          boundaryWidth={300}
          constrainSize
          matchReferenceWidth
          open
          style={{...style, width: 80}}
          tone="primary"
        />,
      )
      await settle()

      expect(card.style.width).toBe(`${REFERENCE_WIDTH}px`)
      expect(card.style.maxWidth).toBe('292px')
      expect(card.style.maxHeight).toBe('72px')
    })

    it('clears the max height and takes the max width back once `constrainSize` is turned off', async () => {
      // A boundary with a scrollbar: the room within it (its client width) is narrower than the
      // cap from its border-box width, so the two writers are told apart by their values
      const {rerender} = render(
        <Example boundaryClientWidth={285} boundaryWidth={300} constrainSize />,
      )

      rerender(<Example boundaryClientWidth={285} boundaryWidth={300} constrainSize open />)
      await settle()

      const card = cardElement()!

      // The middleware's: the room within the boundary (`285 - 2 * DEFAULT_POPOVER_PADDING`) and
      // the room below the reference
      expect(card.style.maxWidth).toBe('277px')
      expect(card.style.maxHeight).toBe('72px')

      rerender(<Example boundaryClientWidth={285} boundaryWidth={300} open />)
      await settle()

      // React's cap, and no max height; the middleware is out of the array, so a later pass
      // changes nothing
      expect(card.style.maxWidth).toBe('292px')
      expect(card.style.maxHeight).toBe('')

      act(() => {
        window.dispatchEvent(new Event('resize'))
      })
      await settle()

      expect(card.style.maxWidth).toBe('292px')
      expect(card.style.maxHeight).toBe('')
    })
  })
})
