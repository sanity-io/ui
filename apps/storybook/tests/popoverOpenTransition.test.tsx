import {Button, Card, Text, ThemeProvider} from '@sanity/ui'
import {Breadcrumbs} from '@sanity/ui/breadcrumbs'
import {Popover} from '@sanity/ui/popover'
import {buildTheme} from '@sanity/ui/theme'
import {Profiler, startTransition, useState} from 'react'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {page, userEvent} from 'vitest/browser'

const theme = buildTheme()

// `DEFAULT_POPOVER_DISTANCE`
const DISTANCE = 4

/** The popover card's inline `display` at every commit of the popover: `''` shown, `none` hidden */
let commitDisplays: string[] = []

function recordCommit() {
  commitDisplays.push(card()?.style.display ?? 'not rendered')
}

/**
 * Burns `ms` of main-thread time. A plain function rather than inline in the component below, so
 * that the React Compiler lint rules do not see `performance.now()` called during render: the
 * render result does not depend on it, only how long the render takes does.
 */
function burnMainThread(ms: number) {
  const end = performance.now() + ms

  while (performance.now() < end) {
    // busy
  }
}

/**
 * Takes `ms` to render, so that the popover content takes long enough to render for React to
 * split a transition render of it into several tasks.
 */
function SlowItem(props: {ms: number; name: string}) {
  burnMainThread(props.ms)

  return <Text size={1}>{props.name}</Text>
}

const SLOW_ITEMS = Array.from({length: 40}, (_, index) => `Item ${index}`)

/** Roughly 80 ms of rendering, a dozen or more 5 ms slices for React */
const slowContent = (
  <div>
    {SLOW_ITEMS.map((name) => (
      <SlowItem key={name} ms={2} name={name} />
    ))}
  </div>
)

/**
 * A controlled popover whose `open` is set the way the prop's docs ask for, inside
 * `startTransition` (or synchronously, as the control). `toggle` sits outside the popover so
 * that it can be clicked without the pointer showing intent on the reference first.
 */
function Harness(props: {content?: React.ReactNode; sync?: boolean}) {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    if (props.sync) {
      setOpen((value) => !value)
    } else {
      startTransition(() => setOpen((value) => !value))
    }
  }

  return (
    <ThemeProvider scheme="light" theme={theme}>
      <Card padding={4}>
        <button id="toggle" onClick={toggle} type="button">
          toggle
        </button>
        <Profiler id="popover" onRender={recordCommit}>
          <Popover content={props.content ?? <Text size={1}>Popover content</Text>} open={open}>
            <Button id="reference" text="Reference" />
          </Popover>
        </Profiler>
      </Card>
    </ThemeProvider>
  )
}

function card() {
  return document.querySelector<HTMLElement>('[data-ui="Popover"]')
}

function toggle() {
  return document.getElementById('toggle')!
}

function reference() {
  return document.getElementById('reference')!
}

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

/** Lets observers and listeners that might be pending fire */
const settle = () => new Promise<void>((resolve) => setTimeout(resolve, 100))

/**
 * Moves the pointer onto the toggle button, away from the popover's reference element, so that a
 * pointer left over the reference by an earlier test does not count as intent in this one.
 */
async function parkPointer() {
  await userEvent.hover(page.elementLocator(toggle()))
}

/**
 * What the next painted frame shows of the popover: whether it is rendered, whether `Activity`
 * shows it, whether Floating UI has positioned it against its reference (above or below it,
 * whichever placement it resolved) and whether its content is laid out. Read inside an animation
 * frame callback, this is what the user sees.
 */
function readFrame(getReference: () => HTMLElement = reference) {
  const element = card()

  if (!element) {
    return {
      rendered: false,
      display: '',
      hidden: false,
      visible: false,
      positioned: false,
      contentLaidOut: false,
    }
  }

  const cardRect = element.getBoundingClientRect()
  const referenceRect = getReference().getBoundingClientRect()
  const text = element.querySelector('[data-ui="Text"]')

  return {
    rendered: true,
    display: element.style.display,
    hidden: element.hidden,
    visible: element.checkVisibility({opacityProperty: true, visibilityProperty: true}),
    positioned: element.dataset.placement?.startsWith('top')
      ? Math.round(cardRect.bottom) === Math.round(referenceRect.top - DISTANCE)
      : Math.round(cardRect.top) === Math.round(referenceRect.bottom + DISTANCE),
    contentLaidOut: text !== null && text.getBoundingClientRect().height > 0,
  }
}

const SHOWN = {
  rendered: true,
  display: '',
  hidden: false,
  visible: true,
  positioned: true,
  contentLaidOut: true,
}

const HIDDEN = {rendered: true, display: 'none', visible: false}

/**
 * Toggles the popover with a synchronous `click()` on `trigger` and reads the DOM in the next
 * animation frame callback, which runs before that frame is painted: whatever it sees is what the
 * user sees first. The frame after it must agree, or the first frame was corrected afterwards.
 */
async function clickAndReadFirstFrame(
  trigger: HTMLElement,
  getReference: () => HTMLElement = reference,
) {
  trigger.click()

  await nextFrame()
  const first = readFrame(getReference)

  await nextFrame()
  const second = readFrame(getReference)

  return {first, second}
}

describe('opening a popover in a transition', () => {
  describe('first painted frame', () => {
    test('shows the popover when it was pre-rendered on intent', async () => {
      await render(<Harness />)

      await userEvent.hover(page.getByRole('button', {name: 'Reference'}))
      await expect.poll(() => card()).not.toBeNull()
      await parkPointer()
      await settle()

      const {first, second} = await clickAndReadFirstFrame(toggle())

      expect(first).toEqual(SHOWN)
      expect(second).toEqual(first)
    })

    test('shows the popover when it opens without prior intent', async () => {
      await render(<Harness />)
      await parkPointer()

      expect(card()).toBeNull()

      const {first, second} = await clickAndReadFirstFrame(toggle())

      expect(first).toEqual(SHOWN)
      expect(second).toEqual(first)
    })

    test('shows the popover when the intent to open it and the open come from the same event', async () => {
      await render(<Harness />)
      await parkPointer()
      commitDisplays = []

      // A pointer that presses the reference arms the pre-render and opens the popover in the
      // same task, so both are transitions of the same event, and the popover is rendered
      // shown in one commit rather than hidden first
      reference().dispatchEvent(new PointerEvent('pointerdown', {bubbles: true}))
      const {first, second} = await clickAndReadFirstFrame(toggle())

      expect(first).toEqual(SHOWN)
      expect(second).toEqual(first)
      expect(commitDisplays[0]).toBe('')
      expect(commitDisplays).not.toContain('none')
    })

    test('hides the popover again, and shows it again', async () => {
      await render(<Harness />)
      await parkPointer()

      await clickAndReadFirstFrame(toggle())

      const closed = await clickAndReadFirstFrame(toggle())

      expect(closed.first).toMatchObject(HIDDEN)
      expect(closed.second).toEqual(closed.first)

      const reopened = await clickAndReadFirstFrame(toggle())

      expect(reopened.first).toEqual(SHOWN)
      expect(reopened.second).toEqual(reopened.first)
    })
  })

  // What the transition is for: a click that comes before the pre-render of the content is done
  // (here, in the same task as the intent that starts it) renders what is left in the
  // background, in slices between which the browser keeps painting, instead of synchronously in
  // the click, where the page is frozen until the content has rendered.
  describe('open before the pre-render is done', () => {
    /**
     * Arms the pre-render and opens the popover in one task, then counts the animation frames
     * that are painted before the popover shows.
     */
    async function openAndCountFramesUntilShown() {
      let frames = 0
      let shown = false

      const tick = () => {
        if (readFrame().visible) {
          shown = true

          return
        }

        frames++
        requestAnimationFrame(tick)
      }

      reference().dispatchEvent(new PointerEvent('pointerdown', {bubbles: true}))
      toggle().click()
      requestAnimationFrame(tick)

      await expect.poll(() => shown, {timeout: 5000}).toBe(true)

      return frames
    }

    test('keeps painting while the content renders in a transition', async () => {
      await render(<Harness content={slowContent} />)
      await parkPointer()

      const frames = await openAndCountFramesUntilShown()

      expect(frames).toBeGreaterThanOrEqual(1)
      await expect.element(page.getByText('Item 39')).toBeVisible()
    })

    test('control: a synchronous open freezes the page until the content has rendered', async () => {
      await render(<Harness content={slowContent} sync />)
      await parkPointer()

      const frames = await openAndCountFramesUntilShown()

      expect(frames).toBe(0)
      await expect.element(page.getByText('Item 39')).toBeVisible()
    })
  })

  describe('Breadcrumbs', () => {
    function BreadcrumbsHarness() {
      return (
        <ThemeProvider scheme="light" theme={theme}>
          <Card padding={4}>
            <button id="toggle" type="button">
              outside
            </button>
            <Breadcrumbs maxLength={4}>
              <Text>Root</Text>
              <Text>Category A</Text>
              <Text>Category B</Text>
              <Text>Category C</Text>
              <Text>Category D</Text>
              <Text>Item</Text>
            </Breadcrumbs>
          </Card>
        </ThemeProvider>
      )
    }

    /** The expand button, which is the popover's reference element */
    function expandButton() {
      return document.querySelector<HTMLElement>('[data-ui="Breadcrumbs"] button')!
    }

    test('shows the collapsed items in the first painted frame after a click on the expand button', async () => {
      await render(<BreadcrumbsHarness />)
      await parkPointer()

      expect(card()).toBeNull()

      // Pre-rendered on intent (the pointer over the button), hidden
      await userEvent.hover(page.getByRole('button', {name: '…'}))
      await expect.poll(() => card()).not.toBeNull()
      expect(card()!.style.display).toBe('none')
      await parkPointer()
      await settle()

      const opened = await clickAndReadFirstFrame(expandButton(), expandButton)

      expect(opened.first).toEqual(SHOWN)
      expect(opened.second).toEqual(opened.first)
      expect(expandButton()).toHaveAttribute('data-selected')
      await expect.element(page.getByText('Category B')).toBeVisible()

      const closed = await clickAndReadFirstFrame(expandButton(), expandButton)

      expect(closed.first).toMatchObject(HIDDEN)
      expect(closed.second).toEqual(closed.first)
      expect(expandButton()).not.toHaveAttribute('data-selected')
    })

    test('expands with the pointer and collapses on a click outside', async () => {
      await render(<BreadcrumbsHarness />)

      await userEvent.click(page.getByRole('button', {name: '…'}))
      await expect.element(page.getByText('Category B')).toBeVisible()

      // A click inside the popover keeps it open
      await userEvent.click(page.getByText('Category C'))
      await settle()
      expect(card()!.style.display).toBe('')

      await userEvent.click(page.getByRole('button', {name: 'outside'}))
      await expect.poll(() => card()!.style.display).toBe('none')
      await expect.element(page.getByText('Category B')).not.toBeVisible()
    })
  })
})
