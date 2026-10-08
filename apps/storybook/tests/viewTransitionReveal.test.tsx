// Installs a React DevTools hook before `react-dom/client` loads, so React reports the priority of
// every commit the way it does to the DevTools profiler. Must stay the first import.
// oxlint-disable-next-line no-unassigned-import
import './helpers/reactDevtoolsHook'
import {Button, Card, Flex, TextInput, ThemeProvider} from '@sanity/ui'
import {Popover} from '@sanity/ui/popover'
import {buildTheme} from '@sanity/ui/theme'
import {Tooltip} from '@sanity/ui/tooltip'
import {composeStories} from '@storybook/react-vite'
import {Activity, startTransition, useState, ViewTransition} from 'react'
import {afterEach, beforeEach, describe, expect, test, vi} from 'vitest'
import {render} from 'vitest-browser-react'

import * as popoverStories from '../stories/primitives/Popover.stories'
import * as tooltipStories from '../stories/primitives/Tooltip.stories'
import {commits, type RecordedCommit} from './helpers/reactDevtoolsHook'

const {WithViewTransition: TooltipWithViewTransition} = composeStories(tooltipStories)
const {WithViewTransition: PopoverWithViewTransition} = composeStories(popoverStories)

const theme = buildTheme()

/** The Scheduler priority React DevTools shows as "Immediate": the commit of a SyncLane update */
const IMMEDIATE_PRIORITY = 1
/** The priority DevTools shows as "User-blocking": a continuous event's commit (a pointer moving) */
const USER_BLOCKING_PRIORITY = 2

interface ObservedTransition {
  ready: 'pending' | 'resolved' | 'rejected'
  finished: boolean
  /** The error `ready` rejected with, a `skipTransition()` ends it with an `AbortError` */
  error: Error | null
  /** `performance.now()` when `ready` resolved: the browser has the transition ready to animate */
  readyAt: number
  /** `performance.now()` of the first animation frame after `ready`: the animation is under way */
  firstFrameAt: number
}

type StartViewTransitionOptions = Parameters<Document['startViewTransition']>[0]

/**
 * Observes every view transition React starts, and runs `duringPreparation` — when given — right
 * after React has applied the transition's DOM mutations and layout effects inside the browser's
 * update callback, while the browser is still preparing the transition (before `ready`). This is
 * the window in which a sync flush makes React skip the transition. The observer is an own
 * property of `document` that shadows the native method, and deleting it restores that method.
 */
function observeViewTransitions(duringPreparation?: () => void): ObservedTransition[] {
  const transitions: ObservedTransition[] = []

  document.startViewTransition = function startViewTransition(
    this: Document,
    options: StartViewTransitionOptions,
  ) {
    const observed: ObservedTransition = {
      ready: 'pending',
      finished: false,
      error: null,
      readyAt: NaN,
      firstFrameAt: NaN,
    }
    const update = typeof options === 'function' ? options : options?.update
    const transition = Document.prototype.startViewTransition.call(this, {
      ...(typeof options === 'object' ? options : {}),
      update: () => {
        const result = update?.()

        duringPreparation?.()

        return result
      },
    })

    transitions.push(observed)
    void (async () => {
      try {
        await transition.ready
        observed.ready = 'resolved'
        observed.readyAt = performance.now()
        requestAnimationFrame(() => {
          observed.firstFrameAt = performance.now()
        })
      } catch (error) {
        observed.ready = 'rejected'
        observed.error = error instanceof Error ? error : new Error(String(error))
      }

      try {
        await transition.finished
      } finally {
        observed.finished = true
      }
    })()

    return transition
  }

  return transitions
}

function restoreStartViewTransition() {
  delete (document as Partial<Document>).startViewTransition
}

async function waitForTransitionToFinish(transitions: ObservedTransition[], index = 0) {
  await expect.poll(() => transitions[index]?.finished, {timeout: 5000}).toBe(true)
}

function describeCommit(commit: RecordedCommit) {
  return `priority ${commit.priority}: ${commit.updaters.join(', ')}`
}

/** The commits of the given priority, with the names of the components that scheduled them */
function commitsOfPriority(priority: number) {
  return commits.filter((commit) => commit.priority === priority).map(describeCommit)
}

/**
 * The urgent commits (Immediate or User-blocking priority) React made between the browser having
 * the transition ready and its first animation frame: sync work that held up the start of the
 * animation. The transition's own commit is reported at that point too, at Normal priority, as is
 * any Idle-priority pre-rendering of hidden content; neither is urgent.
 */
function urgentCommitsBeforeFirstFrame(transition: ObservedTransition) {
  return commits
    .filter(
      (commit) =>
        commit.priority <= USER_BLOCKING_PRIORITY &&
        commit.time > transition.readyAt &&
        commit.time < transition.firstFrameAt,
    )
    .map(describeCommit)
}

/** The button with the given text, whether or not an `Activity` currently hides it */
function button(text: string): HTMLButtonElement {
  const element = Array.from(document.querySelectorAll('button')).find(
    (candidate) => candidate.textContent === text,
  )

  if (!element) throw new Error(`No button with the text "${text}"`)

  return element
}

/**
 * Clicks with a synchronous `click()` rather than `userEvent.click`, so that no pointer moves
 * onto the button, which would count as intent for a popover near it, and records the commits
 * from the click on.
 */
function clickAndRecord(text: string) {
  commits.length = 0
  button(text).click()
}

/** Whether `element` is shown, rather than hidden by an `<Activity>` (`display: none`) */
function isShown(element: HTMLElement) {
  return element.checkVisibility()
}

beforeEach(() => {
  commits.length = 0
})

afterEach(() => {
  restoreStartViewTransition()
  vi.restoreAllMocks()
})

// An `<Activity>` that hides or shows a subtree detaches and attaches every ref in it. Components
// that kept the element from such a ref in state scheduled an update from the ref callback, at the
// Immediate priority of the commit phase. React only commits that update once the view transition
// revealing (or hiding) the subtree is ready to animate, so it ran right before the animation's
// first frame — and, as a pending sync update, it made any sync flush during the browser's
// preparation of the transition skip the transition altogether.
describe('revealing @sanity/ui overlays with a <ViewTransition>', () => {
  test('a Tooltip schedules no Immediate-priority commit when it is revealed or hidden', async () => {
    const transitions = observeViewTransitions()

    await render(<TooltipWithViewTransition />)
    expect(isShown(button('Hover me'))).toBe(false)

    clickAndRecord('Show')
    await waitForTransitionToFinish(transitions)

    expect(transitions[0]).toMatchObject({ready: 'resolved', finished: true})
    expect(isShown(button('Hover me'))).toBe(true)
    expect(commitsOfPriority(IMMEDIATE_PRIORITY)).toEqual([])
    expect(urgentCommitsBeforeFirstFrame(transitions[0])).toEqual([])

    clickAndRecord('Hide')
    await waitForTransitionToFinish(transitions, 1)

    expect(transitions[1]).toMatchObject({ready: 'resolved', finished: true})
    expect(isShown(button('Hover me'))).toBe(false)
    expect(commitsOfPriority(IMMEDIATE_PRIORITY)).toEqual([])
    expect(urgentCommitsBeforeFirstFrame(transitions[1])).toEqual([])
  })

  test('a Popover schedules no Immediate-priority commit when it is revealed or hidden', async () => {
    const transitions = observeViewTransitions()

    await render(<PopoverWithViewTransition />)
    expect(isShown(button('Toggle popover'))).toBe(false)

    clickAndRecord('Show')
    await waitForTransitionToFinish(transitions)

    expect(transitions[0]).toMatchObject({ready: 'resolved', finished: true})
    expect(isShown(button('Toggle popover'))).toBe(true)
    expect(commitsOfPriority(IMMEDIATE_PRIORITY)).toEqual([])
    expect(urgentCommitsBeforeFirstFrame(transitions[0])).toEqual([])
    // Nor did it commit anything in the transition's wake: a transition update inside the
    // `<ViewTransition>` would have been one more transition for React to snapshot and animate
    expect(transitions).toHaveLength(1)

    clickAndRecord('Hide')
    await waitForTransitionToFinish(transitions, 1)

    expect(transitions[1]).toMatchObject({ready: 'resolved', finished: true})
    expect(isShown(button('Toggle popover'))).toBe(false)
    expect(commitsOfPriority(IMMEDIATE_PRIORITY)).toEqual([])
    expect(urgentCommitsBeforeFirstFrame(transitions[1])).toEqual([])
    expect(transitions).toHaveLength(2)
  })

  // A sync update scheduled while the browser prepares a view transition is not committed until
  // the transition is ready to animate — unless something flushes sync work before that, which
  // makes React skip the transition ("A flushSync update cancelled a View Transition…"). A flush
  // that brings a sync update of its own (a keystroke a change handler applies with `setState`)
  // skips it regardless, but one that brings none only does so when an update is already pending:
  // the ref-callback updates of the revealed components used to be exactly that.
  describe('a sync flush while the browser prepares the transition', () => {
    /**
     * Reveals `children` with a view transition, next to a controlled numeric input: a keystroke
     * its change handler rejects schedules nothing, but React still restores the input's
     * controlled value afterwards, and flushes whatever sync work is pending on the page first.
     */
    function Harness(props: {children: React.ReactNode}) {
      const [shown, setShown] = useState(false)
      const [value, setValue] = useState('')

      return (
        <ThemeProvider scheme="light" theme={theme}>
          <Card padding={4}>
            <Flex gap={3}>
              <button id="show" onClick={() => startTransition(() => setShown(true))} type="button">
                show
              </button>
              <TextInput
                id="field"
                onChange={(event) => {
                  if (/^\d*$/.test(event.currentTarget.value)) setValue(event.currentTarget.value)
                }}
                value={value}
              />
              <Activity mode={shown ? 'visible' : 'hidden'}>
                <ViewTransition>
                  <div id="revealed">{props.children}</div>
                </ViewTransition>
              </Activity>
            </Flex>
          </Card>
        </ThemeProvider>
      )
    }

    /**
     * Types a letter into the numeric input the way a keystroke does, which its handler rejects.
     * The value is set through the prototype's setter, past the one React installs on the element
     * to track the values it sets itself, so that React sees the change as the user's.
     */
    function typeIntoField() {
      const input = document.querySelector<HTMLInputElement>('#field')!

      Reflect.set(HTMLInputElement.prototype, 'value', 'a', input)
      input.dispatchEvent(new Event('input', {bubbles: true}))
    }

    async function revealWithKeystroke(children: React.ReactNode) {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
      const transitions = observeViewTransitions(typeIntoField)

      await render(<Harness>{children}</Harness>)
      clickAndRecord('show')
      await waitForTransitionToFinish(transitions)

      return {
        transition: transitions[0],
        warnings: warn.mock.calls
          .map((call) => String(call[0]))
          .filter((message) => message.includes('View Transition')),
      }
    }

    test('does not skip the reveal of a Tooltip and a Popover', async () => {
      const {transition, warnings} = await revealWithKeystroke(
        <>
          <Tooltip content="Tooltip">
            <Button text="Hover me" />
          </Tooltip>
          <Popover content="Popover">
            <Button text="Reference" />
          </Popover>
        </>,
      )

      expect(transition).toMatchObject({ready: 'resolved', finished: true, error: null})
      expect(warnings).toEqual([])
      // The rejected letter was restored away
      expect(document.querySelector<HTMLInputElement>('#field')!.value).toBe('')
      expect(isShown(button('Hover me'))).toBe(true)
    })

    test('control: does not skip the reveal of plain content', async () => {
      const {transition, warnings} = await revealWithKeystroke(<Button text="Plain" />)

      expect(transition).toMatchObject({ready: 'resolved', finished: true, error: null})
      expect(warnings).toEqual([])
    })
  })
})
