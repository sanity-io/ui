import {BoundaryElementProvider, Button, Card, Text, ThemeProvider} from '@sanity/ui'
import {Popover} from '@sanity/ui/popover'
import {buildTheme} from '@sanity/ui/theme'
import {type CSSProperties, Profiler, useState} from 'react'
import {afterEach, beforeEach, describe, expect, type MockInstance, test, vi} from 'vitest'
import {render} from 'vitest-browser-react'
import {page, userEvent} from 'vitest/browser'

const theme = buildTheme()

const BOUNDARY_WIDTH = 240
// `DEFAULT_POPOVER_PADDING` on both sides
const BOUNDARY_PADDING = 4 * 2
// `DEFAULT_POPOVER_DISTANCE`
const DISTANCE = 4

let popoverCommits = 0

function countCommit() {
  popoverCommits++
}

/**
 * A popover inside a scrollable boundary. `toggle` opens and closes it from outside the popover,
 * so that opening can be triggered without pointer intent (a plain `click()`), and `content` is
 * wide enough to need the boundary's max width.
 */
function Harness(props: {
  boundaryStyle?: CSSProperties
  constrainSize?: boolean
  matchReferenceWidth?: boolean
  wrapperStyle?: CSSProperties
}) {
  const [open, setOpen] = useState(false)
  const [boundary, setBoundary] = useState<HTMLDivElement | null>(null)

  return (
    <ThemeProvider scheme="light" theme={theme}>
      <Card padding={4} style={props.wrapperStyle}>
        <div
          id="boundary"
          ref={setBoundary}
          style={{height: 200, overflow: 'auto', width: BOUNDARY_WIDTH, ...props.boundaryStyle}}
        >
          <button id="toggle" onClick={() => setOpen((value) => !value)} type="button">
            toggle
          </button>
          <BoundaryElementProvider element={boundary}>
            <Profiler id="popover" onRender={countCommit}>
              <Popover
                constrainSize={props.constrainSize}
                content={
                  <Text size={1}>
                    Popover content that is far wider than the boundary element it is inside of
                  </Text>
                }
                matchReferenceWidth={props.matchReferenceWidth}
                open={open}
                portal
              >
                <Button id="reference" text="Reference" />
              </Popover>
            </Profiler>
          </BoundaryElementProvider>
          <div style={{height: 1000}} />
        </div>
      </Card>
    </ThemeProvider>
  )
}

function card() {
  return document.querySelector<HTMLElement>('[data-ui="Popover"]')
}

function reference() {
  return document.getElementById('reference')!
}

function boundary() {
  return document.getElementById('boundary')!
}

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

/** Lets observers and listeners that might be pending fire */
const settle = () => new Promise<void>((resolve) => setTimeout(resolve, 100))

async function open() {
  await userEvent.click(page.getByRole('button', {name: 'toggle'}))
  await expect.poll(() => card()?.style.display).toBe('')
  await settle()
}

async function close() {
  await userEvent.click(page.getByRole('button', {name: 'toggle'}))
  await expect.poll(() => card()?.style.display).toBe('none')
  await settle()
}

function windowListeners(spy: MockInstance<Window['addEventListener']>, type: string) {
  return spy.mock.calls.filter((call) => call[0] === type).length
}

describe('closed popover', () => {
  beforeEach(() => {
    popoverCommits = 0
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // Floating UI's `autoUpdate` (observers on the reference and the card, scroll and resize
  // listeners on their overflow ancestors) and the boundary size observation only run while the
  // popover is open: the floating element lives inside `<Activity mode="hidden">`, which detaches
  // its ref, and the boundary is only observed while open. (The intent listeners on the reference
  // element, until the popover has rendered once, are a different matter and stay.)
  test('holds no boundary or Floating UI observation and no positioning listeners while closed', async () => {
    await render(<Harness />)

    const resizeObserve = vi.spyOn(ResizeObserver.prototype, 'observe')
    const intersectionObserve = vi.spyOn(IntersectionObserver.prototype, 'observe')
    const measureReference = vi.spyOn(reference(), 'getBoundingClientRect')

    // (a) pre-rendered on intent, never opened
    await userEvent.hover(page.getByRole('button', {name: 'Reference'}))
    await expect.poll(() => card()).not.toBeNull()
    await settle()
    popoverCommits = 0

    // Spied on only now: the first `motion` component on the page (the card) registers motion's
    // one-time `resize` listener for its projection root, which is not the popover's
    const addWindowListener = vi.spyOn(window, 'addEventListener')

    boundary().style.width = `${BOUNDARY_WIDTH - 40}px`
    boundary().scrollTop = 20
    window.dispatchEvent(new Event('resize'))
    await settle()

    expect(resizeObserve).not.toHaveBeenCalled()
    expect(intersectionObserve).not.toHaveBeenCalled()
    expect(windowListeners(addWindowListener, 'scroll')).toBe(0)
    expect(windowListeners(addWindowListener, 'resize')).toBe(0)
    expect(measureReference).not.toHaveBeenCalled()
    expect(popoverCommits).toBe(0)

    // (b) opened, then closed again
    await open()

    expect(resizeObserve).toHaveBeenCalledWith(boundary())
    expect(resizeObserve).toHaveBeenCalledWith(reference())
    expect(intersectionObserve).toHaveBeenCalledWith(reference())
    expect(windowListeners(addWindowListener, 'scroll')).toBeGreaterThan(0)
    expect(measureReference).toHaveBeenCalled()

    await close()
    resizeObserve.mockClear()
    intersectionObserve.mockClear()
    addWindowListener.mockClear()
    measureReference.mockClear()
    popoverCommits = 0

    boundary().style.width = `${BOUNDARY_WIDTH}px`
    boundary().scrollTop = 40
    window.dispatchEvent(new Event('resize'))
    await settle()

    expect(resizeObserve).not.toHaveBeenCalled()
    expect(intersectionObserve).not.toHaveBeenCalled()
    expect(windowListeners(addWindowListener, 'scroll')).toBe(0)
    expect(windowListeners(addWindowListener, 'resize')).toBe(0)
    expect(measureReference).not.toHaveBeenCalled()
    expect(popoverCommits).toBe(0)
  })

  describe('first painted frame', () => {
    function readFrame() {
      const cardRect = card()!.getBoundingClientRect()
      const referenceRect = reference().getBoundingClientRect()
      const boundaryRect = boundary().getBoundingClientRect()

      return {
        display: card()!.style.display,
        hidden: card()!.hidden,
        maxHeight: card()!.style.maxHeight,
        maxWidth: card()!.style.maxWidth,
        width: cardRect.width,
        top: Math.round(cardRect.top),
        left: cardRect.left,
        right: cardRect.right,
        expectedTop: Math.round(referenceRect.bottom + DISTANCE),
        referenceWidth: referenceRect.width,
        boundaryLeft: boundaryRect.left,
        boundaryRight: boundaryRect.right,
      }
    }

    /**
     * Opens the popover with a synchronous `click()` and reads the DOM in the next animation
     * frame callback, which runs before that frame is painted: whatever it sees is what the user
     * sees first. The frame after it must agree, or the first frame was corrected afterwards.
     */
    async function openAndReadFirstFrame() {
      document.getElementById('toggle')!.click()

      await nextFrame()
      const first = readFrame()

      await nextFrame()
      const second = readFrame()

      return {first, second}
    }

    function expectPositionedAndSized(frame: ReturnType<typeof readFrame>) {
      expect(frame.display).toBe('')
      expect(frame.hidden).toBe(false)
      expect(frame.top).toBe(frame.expectedTop)
      expect(frame.left).toBeGreaterThanOrEqual(frame.boundaryLeft)
      expect(frame.right).toBeLessThanOrEqual(frame.boundaryRight)
      expect(frame.maxWidth).toBe(`${BOUNDARY_WIDTH - BOUNDARY_PADDING}px`)
      expect(frame.width).toBeLessThanOrEqual(BOUNDARY_WIDTH - BOUNDARY_PADDING)
    }

    test('is positioned and sized for the boundary when opened without prior intent', async () => {
      await render(<Harness />)

      const {first, second} = await openAndReadFirstFrame()

      expectPositionedAndSized(first)
      expect(second).toEqual(first)
    })

    test('is positioned and sized for the boundary when opened after being pre-rendered on intent', async () => {
      await render(<Harness />)

      await userEvent.hover(page.getByRole('button', {name: 'Reference'}))
      await expect.poll(() => card()).not.toBeNull()
      await settle()

      const {first, second} = await openAndReadFirstFrame()

      expectPositionedAndSized(first)
      expect(second).toEqual(first)
    })

    test('follows the reference element and the boundary when reopened after they changed', async () => {
      await render(<Harness />)

      await open()
      await close()

      // Nothing tracked these while closed; the reopen has to catch up before the first paint
      // (a small scroll: the `hide` middleware hides the card once the reference is clipped)
      boundary().style.width = `${BOUNDARY_WIDTH}px`
      boundary().scrollTop = 10
      await settle()

      const {first, second} = await openAndReadFirstFrame()

      expectPositionedAndSized(first)
      expect(second).toEqual(first)
    })

    test('matches the reference width when `matchReferenceWidth` is set', async () => {
      await render(<Harness matchReferenceWidth />)

      const {first, second} = await openAndReadFirstFrame()

      expect(first.display).toBe('')
      expect(first.top).toBe(first.expectedTop)
      expect(Math.abs(first.width - first.referenceWidth)).toBeLessThan(1)
      expect(second).toEqual(first)
    })

    // With `constrainSize` the `size` middleware writes the max width (the smaller of the room
    // within the boundary and the cap from the boundary width) and the max height to the card
    // during the positioning pass, instead of React rendering the cap
    test('is capped to the room within the boundary when `constrainSize` is set', async () => {
      await render(<Harness constrainSize />)

      const {first, second} = await openAndReadFirstFrame()
      // The room is the boundary's client width (its scrollbar excluded, unlike the cap from its
      // border-box width) minus the padding on both sides
      const room = boundary().clientWidth - BOUNDARY_PADDING
      // And below the reference: from the card's top (the reference's bottom plus the distance) to
      // the bottom of the boundary's client box, less the padding
      const roomBelow =
        boundary().getBoundingClientRect().top +
        boundary().clientHeight -
        reference().getBoundingClientRect().bottom -
        DISTANCE -
        BOUNDARY_PADDING / 2

      expect(first.display).toBe('')
      expect(first.top).toBe(first.expectedTop)
      expect(first.maxWidth).toBe(`${Math.min(room, BOUNDARY_WIDTH - BOUNDARY_PADDING)}px`)
      expect(first.width).toBeLessThanOrEqual(room)
      expect(Math.abs(parseFloat(first.maxHeight) - roomBelow)).toBeLessThan(1)
      expect(second).toEqual(first)
    })
  })

  // The styles the `size` middleware owns are written during positioning, so they follow their
  // inputs through positioning passes rather than through renders of the card
  describe('size while open', () => {
    test('follows the reference width in the positioning pass when `matchReferenceWidth` is set', async () => {
      await render(<Harness matchReferenceWidth />)

      await open()

      // The middleware writes the reference's layout width, fractional and all
      const referenceWidth = reference().getBoundingClientRect().width

      expect(Math.abs(parseFloat(card()!.style.width) - referenceWidth)).toBeLessThan(0.01)
      popoverCommits = 0

      // The reference growing resizes the card inside the positioning pass that follows it. The
      // one commit is Floating UI's, for its positioning data (the `hide` middleware's offsets
      // follow the reference's rect); the reference width used to be mirrored into state from
      // inside the pass as well, for a second commit that rendered the width already written
      reference().style.width = '180px'
      await expect.poll(() => card()!.style.width).toBe('180px')
      await settle()

      expect(Math.abs(card()!.getBoundingClientRect().width - 180)).toBeLessThan(1)
      expect(popoverCommits).toBe(1)
    })

    test('follows the boundary width when `constrainSize` is set', async () => {
      await render(<Harness constrainSize />)

      await open()
      popoverCommits = 0

      const narrower = BOUNDARY_WIDTH - 40

      // The boundary shrinking changes the cap (measured by the popover's own observer) and the
      // room (read by the middleware), neither of which Floating UI's `autoUpdate` watches: the
      // popover repositions itself for the new cap, and the pass reads the new room too
      boundary().style.width = `${narrower}px`
      await expect
        .poll(() => card()!.style.maxWidth)
        .toBe(
          `${Math.min(boundary().clientWidth - BOUNDARY_PADDING, narrower - BOUNDARY_PADDING)}px`,
        )
      await settle()

      expect(card()!.getBoundingClientRect().right).toBeLessThanOrEqual(
        boundary().getBoundingClientRect().right,
      )
      // This is where the popover's own pass costs something: the commit for the new boundary
      // size, the commit of that pass's positioning data (the card shrank inside the pass, and
      // Floating UI's `flip` records the placements it tried with the old and the new size), and
      // the commit of the pass `autoUpdate` runs for the card's new size. Without the explicit
      // pass the cap would be written to the element directly and the second commit saved — at
      // the price of a cap that ignores the room within the boundary until the next pass.
      expect(popoverCommits).toBe(3)
    })
  })

  // The boundary is measured synchronously when the popover opens and followed by the shared
  // `ResizeObserver` from then on. The two have to agree, or the observer's first delivery would
  // correct the max width a frame after the first paint — the very thing the synchronous measure
  // is there to prevent. `ResizeObserverEntry.borderBoxSize` is the layout size without CSS
  // transforms, in the element's writing mode, so that is what the measurement reproduces (in
  // whole pixels), not `getBoundingClientRect`.
  describe('boundary measured like the observer reports it', () => {
    /** The boundary's border-box size as a `ResizeObserver` reports it */
    function observedBorderBox(element: Element) {
      return new Promise<ResizeObserverSize>((resolve) => {
        const observer = new ResizeObserver(([entry]) => {
          observer.disconnect()
          resolve(entry.borderBoxSize[0])
        })

        observer.observe(element)
      })
    }

    const cases: Array<{name: string; props: Parameters<typeof Harness>[0]}> = [
      {
        name: 'a boundary mid scale transform, with a fractional width',
        props: {boundaryStyle: {transform: 'scale(0.5)', width: 240.5}},
      },
      {
        name: 'a boundary inside a scaled ancestor',
        props: {boundaryStyle: {width: 240.5}, wrapperStyle: {transform: 'scale(0.37)'}},
      },
      {
        name: 'a boundary in a vertical writing mode (its inline size is its height)',
        props: {boundaryStyle: {writingMode: 'vertical-rl'}},
      },
    ]

    for (const {name, props} of cases) {
      test(`agrees with the observer for ${name}`, async () => {
        await render(<Harness {...props} />)

        const observed = await observedBorderBox(boundary())
        const expectedMaxWidth = `${Math.round(observed.inlineSize) - BOUNDARY_PADDING}px`

        document.getElementById('toggle')!.click()
        await nextFrame()

        // The synchronous measurement, before the popover's own observer has delivered anything
        expect(card()!.style.maxWidth).toBe(expectedMaxWidth)

        // The observer's first delivery, and the frames after it, change nothing
        await settle()
        await nextFrame()
        expect(card()!.style.maxWidth).toBe(expectedMaxWidth)
      })
    }
  })
})
