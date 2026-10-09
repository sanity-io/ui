/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {Activity, Profiler, useState} from 'react'
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

/**
 * Floating UI measures the reference element through `getBoundingClientRect`, which jsdom answers
 * with zeros: gives `element` a width of its own, so that what Floating UI positions against is
 * observable (`matchReferenceWidth` copies it onto the card).
 */
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

    it('listens for intent again when an `<Activity>` shows the reference element again', () => {
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

      // The listeners went on as the element attached, before the spy: hiding takes them off
      rerender(<Example shown={false} />)

      expect(intentListeners.total()).toBe(0)
      expectNotRendered()

      // Showing attaches the element again, and with it the listeners
      rerender(<Example shown />)

      expect(intentListeners.active()).toBe(3)
      expect(getReference()).toBe(reference)

      fireEvent.pointerEnter(reference)
      expectRenderedHidden()
    })

    it('does not listen for intent again on an element shown again once the popover has rendered', () => {
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

      fireEvent.pointerEnter(reference)
      expectRenderedHidden()

      rerender(<Example shown={false} />)
      rerender(<Example shown />)

      expect(getReference()).toBe(reference)
      expect(intentListeners.total()).toBe(0)
      expectRenderedHidden()
    })

    it('counts no intent on the cloned child while `disabled`, and does again once enabled', () => {
      const {rerender} = render(
        <Popover content={content} disabled>
          <Button text="Reference" />
        </Popover>,
      )

      fireEvent.pointerEnter(getReference())
      fireEvent.focusIn(getReference())
      expectNotRendered()

      rerender(
        <Popover content={content}>
          <Button text="Reference" />
        </Popover>,
      )

      expectNotRendered()

      fireEvent.pointerEnter(getReference())
      expectRenderedHidden()

      // Disabling drops the pre-rendered popover along with the listeners
      rerender(
        <Popover content={content} disabled>
          <Button text="Reference" />
        </Popover>,
      )

      fireEvent.pointerEnter(getReference())
      expectNotRendered()
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

    /**
     * Mounting used to schedule a second commit from the first one: Floating UI's ref callback
     * set the element into state, in the commit phase, at Immediate priority (a "nested update"
     * to the profiler), which also held up the first frame of any view transition revealing the
     * element. The element now lives in a ref, which nothing needs to re-render for; Floating UI
     * is handed it when the popover opens. The pass in which React renders the (empty) content of
     * the hidden `Activity` the closed popover is in, which a bare `<Activity mode="hidden">`
     * gets as well, is React's to schedule and not asserted on.
     */
    it('schedules no follow-up commit for the reference element when it mounts', () => {
      const onRender = vi.fn()

      const {rerender} = render(
        <Profiler id="popover" onRender={onRender}>
          <Popover content={content}>
            <Button text="Reference" />
          </Popover>
        </Profiler>,
        {strict: false},
      )

      expect(phasesOf(onRender)[0]).toBe('mount')
      expect(phasesOf(onRender)).not.toContain('nested-update')

      // Floating UI receives the element along with the card, as the popover opens
      rerender(
        <Profiler id="popover" onRender={onRender}>
          <Popover content={content} open>
            <Button text="Reference" />
          </Popover>
        </Profiler>,
      )

      expectVisible()
    })

    it('hands Floating UI the reference element as the popover opens, and a replacement while it is open', async () => {
      const {rerender} = render(
        <Popover content={content} matchReferenceWidth>
          <Button text="Reference" />
        </Popover>,
        {strict: false},
      )

      giveWidth(getReference(), 240)

      rerender(
        <Popover content={content} matchReferenceWidth open>
          <Button text="Reference" />
        </Popover>,
      )

      expectVisible()
      // Positioning is asynchronous (`computePosition`); the width of the reference lands on the card
      await expect.poll(popoverCardWidth).toBe('240px')

      // A `Button` of another key mounts a new element, which Floating UI positions against right away
      rerender(
        <Popover content={content} matchReferenceWidth open>
          <Button key="replacement" text="Reference" />
        </Popover>,
      )

      giveWidth(getReference(), 320)

      await expect.poll(popoverCardWidth).toBe('320px')
    })

    /**
     * An inline `ref={(el) => …}` on the child is a new function every render of the parent
     * (unless the React Compiler memoizes it). React detaches the old one and attaches the new one
     * for it, and nothing else: our ref callback on the element stays the same, so Floating UI
     * is not told about the element again (an Immediate-priority update while the popover is
     * open), and the intent listeners are not taken off and put on again while it is closed.
     */
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
      // React's own semantics for a changed ref: the old one is called with `null`, the new one
      // with the element
      expect(seen).toEqual([reference, null, reference, null, reference, null, reference])

      // Closing hides the card in its `Activity`, which detaches the card's ref: Floating UI's
      // `setFloating(null)` is a nested update of its own there (as on `main`), not asserted on
      rerender(
        <Profiler id="popover" onRender={onRender}>
          <Example render={4} />
        </Profiler>,
      )

      onRender.mockClear()

      // Closed: the intent listeners stay the ones put on when the element attached
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

      // `render` puts `<StrictMode>` at the top of the tree, which is where it has to be for React
      // to run the mount effects (and refs) of the subtree twice
      const {rerender} = render(
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

      // StrictMode detaches and attaches every ref once more on mount
      expect(callbackRef.mock.calls).toEqual([[reference], [null], [reference]])
      expect(callbackRefWithCleanup.mock.calls).toEqual([[otherReference], [otherReference]])
      expect(cleanup).toHaveBeenCalledTimes(1)
      expect(phasesOf(onRender)).not.toContain('nested-update')

      rerender(
        <Profiler id="popover" onRender={onRender}>
          <Popover content={content} open>
            <Button ref={callbackRef} text="Reference" />
          </Popover>
          <Popover content={<Text size={1}>Other content</Text>}>
            <Button ref={callbackRefWithCleanup} text="Other reference" />
          </Popover>
        </Profiler>,
      )

      expectVisible()
      expect(callbackRef).toHaveBeenCalledTimes(3)
      expect(callbackRefWithCleanup).toHaveBeenCalledTimes(2)
    })

    it('attaches the child’s own ref from the commit that mounts it', () => {
      const ref = {current: null as HTMLButtonElement | null}
      const callbackRef = vi.fn()

      const {rerender, unmount} = render(
        <Popover content={content}>
          <Button ref={ref} text="Reference" />
        </Popover>,
        {strict: false},
      )

      expect(ref.current).toBe(getReference())

      // Re-rendering does not detach and attach the ref again
      rerender(
        <Popover content={content}>
          <Button ref={callbackRef} text="Reference" />
        </Popover>,
      )

      // A new ref is attached (and the old one detached) the way React does it for a ref prop
      expect(ref.current).toBeNull()
      expect(callbackRef.mock.calls).toEqual([[getReference()]])

      rerender(
        <Popover content={content}>
          <Button ref={callbackRef} text="Reference" />
        </Popover>,
      )

      expect(callbackRef).toHaveBeenCalledTimes(1)

      unmount()

      expect(callbackRef.mock.calls).toEqual([[expect.any(HTMLButtonElement)], [null]])
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
})
