/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {useState} from 'react'
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
