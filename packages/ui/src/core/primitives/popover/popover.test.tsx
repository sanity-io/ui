/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {Activity, type CSSProperties, Profiler, useState} from 'react'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {_elementSizeObserver} from '../../observers/elementSizeObserver'
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
  return document.querySelector<HTMLElement>('[data-ui="Popover"]')
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
  const intentRegistrations = () =>
    addEventListener.mock.calls.filter(
      ([type]) => type === 'focusin' || type === 'pointerenter' || type === 'pointerdown',
    )

  return {
    active: () =>
      intentRegistrations().filter(([, , options]) =>
        typeof options === 'object' && options.signal ? !options.signal.aborted : true,
      ).length,
    /** Every registration so far, including the ones aborted since */
    total: () => intentRegistrations().length,
  }
}

/** jsdom measures every element as 0×0: a width that `matchReferenceWidth` copies onto the card */
function giveWidth(element: HTMLElement, width: number) {
  element.getBoundingClientRect = () => new DOMRect(0, 0, width, 32)
}

function popoverCardWidth() {
  return queryPopoverCard()?.style.width
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

    it('listens for intent on the cloned child whenever an `<Activity>` shows it, until the popover has rendered', () => {
      function Example(props: {shown: boolean}) {
        return (
          <Activity mode={props.shown ? 'visible' : 'hidden'}>
            <Popover content={content}>
              <Button text="Reference" />
            </Popover>
          </Activity>
        )
      }

      const {rerender} = render(<Example shown />, {strict: false})
      const reference = getReference()
      const intentListeners = spyOnIntentListeners(reference)

      rerender(<Example shown={false} />)
      rerender(<Example shown />)

      expect(intentListeners.active()).toBe(3)

      fireEvent.pointerEnter(reference)

      expectRenderedHidden()
      expect(intentListeners.active()).toBe(0)

      rerender(<Example shown={false} />)
      rerender(<Example shown />)

      expect(intentListeners.total()).toBe(3)
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

  describe('the reference element', () => {
    const phasesOf = (onRender: ReturnType<typeof vi.fn>) =>
      onRender.mock.calls.map((call: unknown[]) => call[1])

    // Floating UI's `refs.setReference` as the ref callback set the element into state, a nested
    // update. The pass React makes later over the closed popover's hidden `Activity` is not
    // asserted on.
    it('schedules no follow-up commit for the reference element when it mounts', () => {
      const onRender = vi.fn()

      render(
        <Profiler id="popover" onRender={onRender}>
          <Popover content={content}>
            <Button text="Reference" />
          </Popover>
        </Profiler>,
        {strict: false},
      )

      expect(phasesOf(onRender)[0]).toBe('mount')
      expect(phasesOf(onRender)).not.toContain('nested-update')
    })

    it('hands Floating UI the reference element as the popover opens, and a replacement while it is open', async () => {
      const {rerender} = render(
        <Popover content={content} matchReferenceWidth>
          <Button text="Reference" />
        </Popover>,
      )

      giveWidth(getReference(), 240)

      rerender(
        <Popover content={content} matchReferenceWidth open>
          <Button text="Reference" />
        </Popover>,
      )

      expectVisible()
      await expect.poll(popoverCardWidth).toBe('240px')

      rerender(
        <Popover content={content} matchReferenceWidth open>
          <Button key="replacement" text="Reference" />
        </Popover>,
      )

      giveWidth(getReference(), 320)

      await expect.poll(popoverCardWidth).toBe('320px')
    })

    // A ref of our own that changed along with the child's would detach the element from Floating
    // UI and attach it again on every render: a nested update while open, and new intent listeners
    // while closed
    it('swaps an inline child ref that changes every render without touching Floating UI or the listeners', () => {
      const onRender = vi.fn()
      const seen: (HTMLElement | null)[] = []

      function Example(props: {open?: boolean; render: number}) {
        'use no memo'

        return (
          <Popover content={content} open={props.open}>
            <Button
              data-render={props.render}
              ref={(element: HTMLElement | null) => {
                seen.push(element)
              }}
              text="Reference"
            />
          </Popover>
        )
      }

      const {rerender} = render(
        <Profiler id="popover" onRender={onRender}>
          <Example open render={0} />
        </Profiler>,
        {strict: false},
      )

      const reference = getReference()

      expectVisible()
      expect(seen).toEqual([reference])
      onRender.mockClear()

      for (const pass of [1, 2, 3]) {
        rerender(
          <Profiler id="popover" onRender={onRender}>
            <Example open render={pass} />
          </Profiler>,
        )
      }

      expect(phasesOf(onRender)).toEqual(['update', 'update', 'update'])
      expect(seen).toEqual([reference, null, reference, null, reference, null, reference])

      // Closing detaches the card from Floating UI, a nested update of its own
      rerender(
        <Profiler id="popover" onRender={onRender}>
          <Example render={4} />
        </Profiler>,
      )
      onRender.mockClear()

      const intentListeners = spyOnIntentListeners(reference)

      for (const pass of [5, 6, 7]) {
        rerender(
          <Profiler id="popover" onRender={onRender}>
            <Example render={pass} />
          </Profiler>,
        )
      }

      expect(intentListeners.total()).toBe(0)
      expect(phasesOf(onRender)).not.toContain('nested-update')
    })

    it('attaches the child’s own ref with React’s own sequence under StrictMode', () => {
      const callbackRef = vi.fn()
      const cleanup = vi.fn()
      const callbackRefWithCleanup = vi.fn((_node: HTMLButtonElement | null) => cleanup)
      const onRender = vi.fn()

      // `render` puts `<StrictMode>` at the top of the tree, where it has to be for React to attach
      // the refs of the subtree twice on mount
      render(
        <Profiler id="popover" onRender={onRender}>
          <Popover content={content}>
            <Button ref={callbackRef} text="Reference" />
          </Popover>
          <Popover content={<Text size={1}>Other content</Text>}>
            <Button ref={callbackRefWithCleanup} text="Other reference" />
          </Popover>
        </Profiler>,
      )

      const reference = getReference()
      const otherReference = screen.getByRole('button', {name: 'Other reference'})

      expect(callbackRef.mock.calls).toEqual([[reference], [null], [reference]])
      expect(callbackRefWithCleanup.mock.calls).toEqual([[otherReference], [otherReference]])
      expect(cleanup).toHaveBeenCalledTimes(1)
      expect(phasesOf(onRender)).not.toContain('nested-update')
    })

    it('leaves the child’s own ref on the child when a `referenceElement` is given', () => {
      const ref = {current: null as HTMLButtonElement | null}

      render(
        <Popover content={content} referenceElement={document.createElement('div')}>
          <Button ref={ref} text="Reference" />
        </Popover>,
      )

      expect(ref.current).toBe(getReference())
    })
  })

  describe('boundary size while closed', () => {
    /**
     * Records every `ResizeObserver` the popover creates, so that the tests can count observations
     * and deliver sizes. Replaces the no-op mock imported at the top for these tests only.
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

    /** The popover card's inline `max-width`, which follows the boundary width minus the padding */
    function cardMaxWidth() {
      return document.querySelector<HTMLElement>('[data-ui="Popover"]')?.style.maxWidth
    }

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

  // The `size` middleware writes the width (`matchReferenceWidth`) and the max width and height
  // (`constrainSize`) to the card while positioning it; React renders them otherwise. jsdom lays
  // nothing out, so the sizes the popover and Floating UI read are defined on the elements.
  describe('size styles', () => {
    const REFERENCE_WIDTH = 100

    /**
     * An open popover in a boundary whose offset width less the padding is the cap (`292` by
     * default) and whose client width less the padding is the room the middleware measures
     */
    function Example(
      props: {boundaryClientWidth?: number; style?: CSSProperties} & Pick<
        PopoverProps,
        '__unstable_margins' | 'constrainSize' | 'matchReferenceWidth' | 'width'
      >,
    ) {
      const {boundaryClientWidth = 300, ...popoverProps} = props
      const [boundary, setBoundary] = useState<HTMLDivElement | null>(null)

      return (
        <div
          data-testid="boundary"
          ref={(node) => {
            if (node) {
              Object.defineProperties(node, {
                clientHeight: {configurable: true, value: 100},
                clientWidth: {configurable: true, value: boundaryClientWidth},
                offsetHeight: {configurable: true, value: 100},
                offsetWidth: {configurable: true, value: 300},
              })
            }
            setBoundary(node)
          }}
        >
          <BoundaryElementProvider element={boundary}>
            <Popover content={content} open {...popoverProps}>
              <Button
                ref={(node) => {
                  if (node) {
                    node.getBoundingClientRect = () =>
                      DOMRect.fromRect({width: REFERENCE_WIDTH, height: 20})
                  }
                }}
                text="Reference"
              />
            </Popover>
          </BoundaryElementProvider>
        </div>
      )
    }

    /** Lets the positioning pass, which runs in microtasks after a commit, finish */
    const settle = () => act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)))

    /** Delivers a border-box width of the boundary to the popover, as its observer would */
    function resizeBoundary(width: number) {
      const boundary = screen.getByTestId('boundary')
      const [, subscriber] = vi
        .mocked(_elementSizeObserver.subscribe)
        .mock.calls.findLast(([element]) => element === boundary)!
      const size = {width, height: 100}

      act(() =>
        // oxlint-disable-next-line no-deprecated -- still part of what subscribers receive
        subscriber({_contentRect: DOMRect.fromRect(size), border: size, content: size}),
      )
    }

    beforeEach(() => {
      vi.spyOn(_elementSizeObserver, 'subscribe')
      // Floating UI clips to the viewport too
      Object.defineProperties(document.documentElement, {
        clientHeight: {configurable: true, value: 768},
        clientWidth: {configurable: true, value: 1024},
      })
    })

    afterEach(() => {
      vi.restoreAllMocks()
      Reflect.deleteProperty(document.documentElement, 'clientHeight')
      Reflect.deleteProperty(document.documentElement, 'clientWidth')
    })

    it.each([
      {width: undefined, expected: ''},
      {width: 0, expected: '320px'},
    ])(
      'hands the width back to React once `matchReferenceWidth` is turned off (width: $width)',
      async ({width, expected}) => {
        // `constrainSize` keeps the `size` middleware in the array, only its options change
        const {rerender} = render(<Example constrainSize matchReferenceWidth width={width} />)
        await settle()

        const card = queryPopoverCard()!

        expect(card.style.width).toBe(`${REFERENCE_WIDTH}px`)

        rerender(<Example constrainSize width={width} />)
        await settle()

        expect(card.style.width).toBe(expected)

        // Nor does a later pass (`autoUpdate` listens for window resizes) write it again
        act(() => {
          window.dispatchEvent(new Event('resize'))
        })
        await settle()

        expect(card.style.width).toBe(expected)
      },
    )

    it('hands the max width and height back to React once `constrainSize` is turned off', async () => {
      // The room (`277`) is narrower than the cap (`292`), so that the two writers are told apart
      const {rerender} = render(<Example boundaryClientWidth={285} constrainSize />)
      await settle()

      const card = queryPopoverCard()!

      expect(card.style.maxWidth).toBe('277px')
      expect(card.style.maxHeight).toBe('72px')

      rerender(<Example boundaryClientWidth={285} />)
      await settle()

      expect(card.style.maxWidth).toBe('292px')
      expect(card.style.maxHeight).toBe('')
    })

    it('applies a changed cap within the room under `constrainSize`', async () => {
      render(<Example boundaryClientWidth={150} constrainSize />)
      await settle()

      const card = queryPopoverCard()!

      expect(card.style.maxWidth).toBe('142px')

      resizeBoundary(250)
      await settle()

      expect(card.style.maxWidth).toBe('142px')

      resizeBoundary(100)
      await settle()

      expect(card.style.maxWidth).toBe('92px')
    })

    it("lets a consumer `style` set the sizes React renders, but not the middleware's", async () => {
      // The popover has no width of its own (`auto`); its cap wins over the consumer's
      const {rerender} = render(
        <Example boundaryClientWidth={285} style={{maxHeight: 50, maxWidth: 60, width: 70}} />,
      )
      await settle()

      const card = queryPopoverCard()!

      expect(card.style.width).toBe('70px')
      expect(card.style.maxWidth).toBe('292px')
      expect(card.style.maxHeight).toBe('50px')

      rerender(
        <Example
          boundaryClientWidth={285}
          constrainSize
          matchReferenceWidth
          style={{maxHeight: 55, maxWidth: 65, width: 75}}
        />,
      )
      await settle()

      expect(card.style.width).toBe(`${REFERENCE_WIDTH}px`)
      expect(card.style.maxWidth).toBe('277px')
      expect(card.style.maxHeight).toBe('72px')

      // Re-rendering for another consumer style, with no positioning pass to follow
      rerender(
        <Example
          boundaryClientWidth={285}
          constrainSize
          matchReferenceWidth
          style={{maxHeight: 50, maxWidth: 60, width: 70}}
        />,
      )
      await settle()

      expect(card.style.width).toBe(`${REFERENCE_WIDTH}px`)
      expect(card.style.maxWidth).toBe('277px')
      expect(card.style.maxHeight).toBe('72px')
    })

    it('renders a cap of zero for a boundary narrower than its padding, and none for one without a width', async () => {
      render(<Example />)
      await settle()

      const card = queryPopoverCard()!
      const error = vi.spyOn(console, 'error')

      expect(card.style.maxWidth).toBe('292px')

      // CSS ignores a negative length, which would keep the previous cap
      resizeBoundary(6)

      expect(card.style.maxWidth).toBe('0px')

      // What a `display: none` boundary reports; React warns about an `Infinity` style
      resizeBoundary(0)

      expect(card.style.maxWidth).toBe('')
      expect(error).not.toHaveBeenCalled()
    })

    it('has the `size` middleware write sizes of zero, never negative ones', async () => {
      const {rerender} = render(<Example constrainSize matchReferenceWidth />)
      await settle()

      const card = queryPopoverCard()!

      // Margins wider than the reference and taller than the room below it, and a boundary narrower
      // than its padding: CSS ignores a negative length, which would keep the first render's sizes
      rerender(
        <Example
          __unstable_margins={[60, 60, 60, 60]}
          boundaryClientWidth={6}
          constrainSize
          matchReferenceWidth
        />,
      )
      await settle()

      expect(card.style.width).toBe('0px')
      expect(card.style.maxWidth).toBe('0px')
      expect(card.style.maxHeight).toBe('0px')
    })
  })
})
