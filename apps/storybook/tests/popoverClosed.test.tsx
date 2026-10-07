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
