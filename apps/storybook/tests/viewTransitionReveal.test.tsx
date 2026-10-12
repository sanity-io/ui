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
import {commits, installed} from './helpers/reactDevtoolsHook'

const {WithViewTransition: TooltipWithViewTransition} = composeStories(tooltipStories)
const {WithViewTransition: PopoverWithViewTransition} = composeStories(popoverStories)

const theme = buildTheme()

/** The Scheduler priority of a SyncLane commit, which React DevTools shows as "Immediate" */
const IMMEDIATE_PRIORITY = 1

interface ObservedTransition {
  /** `skipTransition()` rejects `ready` */
  ready: 'pending' | 'resolved' | 'rejected'
  finished: boolean
}

/**
 * Observes the view transitions React starts. `duringPreparation` runs right after React has
 * applied a transition's DOM mutations and layout effects, while the browser still prepares it:
 * the window in which a sync flush makes React skip the transition.
 */
function observeViewTransitions(duringPreparation?: () => void): ObservedTransition[] {
  const transitions: ObservedTransition[] = []

  document.startViewTransition = function startViewTransition(this: Document, options) {
    const update = typeof options === 'function' ? options : options?.update
    const transition = Document.prototype.startViewTransition.call(this, {
      ...(typeof options === 'object' ? options : {}),
      update: () => {
        const result = update?.()

        duringPreparation?.()

        return result
      },
    })
    const observed: ObservedTransition = {ready: 'pending', finished: false}

    transitions.push(observed)
    void (async () => {
      try {
        await transition.ready
        observed.ready = 'resolved'
      } catch {
        observed.ready = 'rejected'
      }

      await transition.finished
      observed.finished = true
    })()

    return transition
  }

  return transitions
}

/** The button with the given text, whether or not an `Activity` hides it */
function button(text: string): HTMLButtonElement {
  const element = Array.from(document.querySelectorAll('button')).find(
    (candidate) => candidate.textContent === text,
  )

  if (!element) throw new Error(`No button with the text "${text}"`)

  return element
}

/**
 * Clicks the button with the given text and waits for the view transition the click starts,
 * recording the commits from the click on. A synchronous `click()` moves no pointer onto it, which
 * would count as intent to open a popover.
 */
async function clickAndWaitForTransition(text: string, transitions: ObservedTransition[]) {
  const index = transitions.length

  commits.length = 0
  button(text).click()
  await expect.poll(() => transitions[index]?.finished, {timeout: 5000}).toBe(true)

  return transitions[index]
}

function updaters() {
  return commits.flatMap((commit) => commit.updaters)
}

function immediateCommitUpdaters() {
  return commits
    .filter((commit) => commit.priority === IMMEDIATE_PRIORITY)
    .map((commit) => commit.updaters.join(', '))
}

beforeEach(() => {
  // Without the hook, nothing is recorded and every assertion that nothing was would pass
  expect(installed).toBe(true)
})

afterEach(() => {
  delete (document as Partial<Document>).startViewTransition
  vi.restoreAllMocks()
})

// An `<Activity>` that hides or shows a subtree detaches and attaches every ref in it. A component
// that sets the element of a ref into state does so in the commit phase, at Immediate priority,
// and inside a `<ViewTransition>` React commits that update as the transition is ready to animate,
// holding up its first frame.
describe('revealing @sanity/ui overlays with a <ViewTransition>', () => {
  test.each([
    ['Tooltip', TooltipWithViewTransition, 'Hover me'],
    ['Popover', PopoverWithViewTransition, 'Toggle popover'],
  ])(
    'a %s schedules no Immediate-priority commit when it is revealed or hidden',
    async (_name, Story, reference) => {
      const transitions = observeViewTransitions()

      await render(<Story />)

      expect(await clickAndWaitForTransition('Show', transitions)).toMatchObject({
        ready: 'resolved',
      })
      expect(button(reference).checkVisibility()).toBe(true)
      // The click's own commit: proof that commits are being recorded
      expect(updaters()).toContain('ViewTransitionStory')
      expect(immediateCommitUpdaters()).toEqual([])

      expect(await clickAndWaitForTransition('Hide', transitions)).toMatchObject({
        ready: 'resolved',
      })
      expect(button(reference).checkVisibility()).toBe(false)
      expect(updaters()).toContain('ViewTransitionStory')
      expect(immediateCommitUpdaters()).toEqual([])
    },
  )

  // A sync update pending while the browser prepares a view transition makes any sync flush in
  // that window skip the transition ("A flushSync update cancelled a View Transition…"). React
  // flushes sync work as it restores the value of a controlled input after a change it rejected.
  describe('a sync flush while the browser prepares the reveal', () => {
    function Harness(props: {children: React.ReactNode}) {
      const [shown, setShown] = useState(false)
      const [value, setValue] = useState('')

      return (
        <ThemeProvider scheme="light" theme={theme}>
          <Card padding={4}>
            <Flex gap={3}>
              <button onClick={() => startTransition(() => setShown(true))} type="button">
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
                  <div>{props.children}</div>
                </ViewTransition>
              </Activity>
            </Flex>
          </Card>
        </ThemeProvider>
      )
    }

    /**
     * Types a letter into the numeric input, which its change handler rejects. The value is set
     * through the prototype's setter, past the one React tracks its own writes with, so that React
     * sees a change by the user.
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

      const transition = await clickAndWaitForTransition('show', transitions)

      // The rejected letter was restored away
      expect(document.querySelector<HTMLInputElement>('#field')!.value).toBe('')

      return {
        transition,
        warnings: warn.mock.calls
          .map(([message]) => String(message))
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

      expect(transition).toMatchObject({ready: 'resolved'})
      expect(warnings).toEqual([])
    })

    test('control: does not skip the reveal of plain content', async () => {
      const {transition, warnings} = await revealWithKeystroke(<Button text="Plain" />)

      expect(transition).toMatchObject({ready: 'resolved'})
      expect(warnings).toEqual([])
    })
  })
})
