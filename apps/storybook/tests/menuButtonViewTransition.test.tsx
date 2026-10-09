// Installs a React DevTools hook before `react-dom/client` loads, so React reports the priority of
// every commit the way it does to the DevTools profiler. Must stay the first import.
// oxlint-disable-next-line no-unassigned-import
import './helpers/reactDevtoolsHook'
import {composeStories} from '@storybook/react-vite'
import {afterEach, beforeEach, describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'

import * as menuButtonStories from '../stories/components/MenuButton.stories'
import {commits} from './helpers/reactDevtoolsHook'

const {WithViewTransition} = composeStories(menuButtonStories)

/** The Scheduler priority React DevTools shows as "Immediate": the commit of a SyncLane update */
const IMMEDIATE_PRIORITY = 1

interface ObservedTransition {
  ready: 'pending' | 'resolved' | 'rejected'
  finished: boolean
}

/** Observes every view transition React starts. `delete` restores the native method afterwards. */
function observeViewTransitions(): ObservedTransition[] {
  const transitions: ObservedTransition[] = []

  document.startViewTransition = function startViewTransition(
    this: Document,
    options: Parameters<Document['startViewTransition']>[0],
  ) {
    const observed: ObservedTransition = {ready: 'pending', finished: false}
    const transition = Document.prototype.startViewTransition.call(this, options)

    transitions.push(observed)
    void (async () => {
      try {
        await transition.ready
        observed.ready = 'resolved'
      } catch {
        observed.ready = 'rejected'
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

async function waitForTransitionToFinish(transitions: ObservedTransition[], index = 0) {
  await expect.poll(() => transitions[index]?.finished, {timeout: 5000}).toBe(true)
}

/** The components that scheduled the Immediate-priority commits recorded so far */
function immediateUpdaters() {
  return commits
    .filter((commit) => commit.priority === IMMEDIATE_PRIORITY)
    .flatMap((commit) => commit.updaters)
}

/** The button with the given text, whether or not an `Activity` currently hides it */
function button(text: string): HTMLButtonElement {
  const element = Array.from(document.querySelectorAll('button')).find(
    (candidate) => candidate.textContent === text,
  )

  if (!element) throw new Error(`No button with the text "${text}"`)

  return element
}

beforeEach(() => {
  commits.length = 0
})

afterEach(() => {
  delete (document as Partial<Document>).startViewTransition
})

// An `<Activity>` that hides or shows a subtree detaches and attaches every ref in it. `MenuButton`
// kept the button element from such a ref in state, so it scheduled an update from the ref
// callback at the Immediate priority of the commit phase, which React commits the moment the view
// transition revealing (or hiding) the button is ready to animate. (`Popover` did the same for
// its reference element; that is fixed separately, so only `MenuButton` is asserted on here.)
describe('revealing a MenuButton with a <ViewTransition>', () => {
  test('MenuButton schedules no Immediate-priority commit when it is revealed or hidden', async () => {
    const transitions = observeViewTransitions()

    await render(<WithViewTransition />)
    expect(button('Open').checkVisibility()).toBe(false)

    commits.length = 0
    // A synchronous `click()` rather than `userEvent.click`: the pointer moving onto the button
    // would otherwise count as intent for the popover next to it
    button('Show').click()
    await waitForTransitionToFinish(transitions)

    expect(transitions[0]).toEqual({ready: 'resolved', finished: true})
    expect(button('Open').checkVisibility()).toBe(true)
    expect(immediateUpdaters()).not.toContain('MenuButton')

    // Opening the menu mounts it, and `Menu` registers its element with `MenuButton` from a ref
    // callback: that registration used to be a second Immediate-priority `MenuButton` commit,
    // right after the one the click itself schedules (the only one allowed here; it becomes a
    // transition once the open state is set in one).
    commits.length = 0
    button('Open').click()
    await expect.poll(() => document.querySelector('[role="menu"]')?.checkVisibility()).toBe(true)

    expect(immediateUpdaters().filter((name) => name === 'MenuButton').length).toBeLessThanOrEqual(
      1,
    )

    commits.length = 0
    button('Hide').click()
    await waitForTransitionToFinish(transitions, 1)

    expect(transitions[1]).toEqual({ready: 'resolved', finished: true})
    expect(button('Open').checkVisibility()).toBe(false)
    expect(immediateUpdaters()).not.toContain('MenuButton')
  })
})
