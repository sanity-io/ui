/** @vitest-environment jsdom */

import {act, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {ComponentProps, Profiler} from 'react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {describe, expect, it} from 'vitest'

import {render} from '../../../../test/utils'
import {Autocomplete} from './autocomplete'

/**
 * The results popover opens and closes one render after the state that calls for it
 * (`useDeferredValue` in autocomplete.tsx): the urgent commit carries the new input and state,
 * the deferred commit flips `aria-expanded` (and with it the popover's `open`). Each test records
 * the committed `value` and `aria-expanded` of the input through a `Profiler`, collapsing commits
 * that repeat the previous state (`TextInput` re-attaches its forwarded ref whenever it renders,
 * which commits the same state once more).
 */

const OPTIONS = [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}]

const SHOW_ALL = () => true

function getInput() {
  return screen.getByRole<HTMLInputElement>('combobox')
}

function getOption(value: string) {
  // The popover stays `hidden` in jsdom (Floating UI never positions it there)
  return screen.getByRole('option', {hidden: true, name: value})
}

function renderAutocomplete(props: Partial<ComponentProps<typeof Autocomplete>> = {}) {
  const commits: string[] = []
  const recordCommit = () => {
    const input = getInput()
    const state = `${JSON.stringify(input.value)} ${input.getAttribute('aria-expanded')}`

    if (commits.at(-1) !== state) commits.push(state)
  }

  render(
    <>
      <Profiler id="autocomplete" onRender={recordCommit}>
        <Autocomplete id="ac" options={OPTIONS} {...props} />
      </Profiler>
      <button type="button">Outside</button>
    </>,
  )

  return {commits, outside: screen.getByRole('button', {name: 'Outside'})}
}

async function blurTo(element: HTMLElement) {
  act(() => element.focus())

  await waitFor(() => expect(getInput()).toHaveAttribute('aria-expanded', 'false'))
}

declare global {
  // The flag React reads to decide whether updates must happen inside `act`; Testing Library sets
  // it for the test and clears it while waiting
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined
}

/**
 * Runs `fn` outside of React's act environment, where the urgent update of a discrete event
 * commits in a microtask and a deferred render needs a task of its own.
 */
async function outsideAct(fn: () => Promise<void>) {
  const previous = globalThis.IS_REACT_ACT_ENVIRONMENT

  globalThis.IS_REACT_ACT_ENVIRONMENT = false

  try {
    await fn()
  } finally {
    globalThis.IS_REACT_ACT_ENVIRONMENT = previous
  }
}

describe('components/autocomplete (deferred popover)', () => {
  it('opens in a later task than the focus that calls for it', async () => {
    const user = userEvent.setup()
    const {outside} = renderAutocomplete({openOnFocus: true})

    // Once rendered, the popover no longer pre-renders on intent, so the focus below is only
    // the autocomplete's own open (the open button ends in the same `input/focus`)
    await user.click(getInput())
    await blurTo(outside)

    await outsideAct(async () => {
      getInput().focus()
      await Promise.resolve()

      expect(getInput()).toHaveAttribute('aria-expanded', 'false')

      await waitFor(() => expect(getInput()).toHaveAttribute('aria-expanded', 'true'))
    })
  })

  it('shows the first keystroke before the list opens for it', async () => {
    const user = userEvent.setup()
    const {commits} = renderAutocomplete()

    await user.click(getInput())

    expect(getInput()).toHaveAttribute('aria-expanded', 'false')

    commits.length = 0

    await user.type(getInput(), 'b', {skipClick: true})

    expect(commits).toEqual(['"b" false', '"b" true'])
  })

  it('shows the selected value before the list closes', async () => {
    const user = userEvent.setup()
    const {commits} = renderAutocomplete({filterOption: SHOW_ALL, openOnFocus: true})

    await user.click(getInput())
    commits.length = 0

    await user.click(getOption('bar'))

    await waitFor(() => expect(getInput()).toHaveAttribute('aria-expanded', 'false'))

    expect(commits).toEqual(['"bar" true', '"bar" false'])
  })

  it('shows the cleared input before the list closes', async () => {
    const user = userEvent.setup()
    const {commits} = renderAutocomplete({openOnFocus: true, value: 'foo'})

    await user.click(getInput())

    expect(getInput()).toHaveAttribute('aria-expanded', 'true')

    commits.length = 0

    await user.click(screen.getByRole('button', {name: 'Clear'}))

    expect(commits).toEqual(['"" true', '"" false'])
  })

  it('restores the input before the list closes when focus leaves', async () => {
    const user = userEvent.setup()
    const {commits, outside} = renderAutocomplete()

    await user.type(getInput(), 'ba')
    commits.length = 0

    await blurTo(outside)

    expect(commits).toEqual(['"" true', '"" false'])
  })

  it('restores the input before the list closes on Escape', async () => {
    const user = userEvent.setup()
    const {commits} = renderAutocomplete()

    await user.type(getInput(), 'ba')
    commits.length = 0

    await user.keyboard('{Escape}')

    expect(commits).toEqual(['"" true', '"" false'])
  })

  it('keeps arrow navigation and typing within an open list in the urgent commit', async () => {
    const user = userEvent.setup()
    const {commits} = renderAutocomplete({filterOption: SHOW_ALL, openOnFocus: true})

    await user.click(getInput())
    commits.length = 0

    await user.keyboard('{ArrowDown}')

    expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-foo')
    expect(commits).toEqual(['"" true'])

    commits.length = 0

    await user.type(getInput(), 'b', {skipClick: true})

    expect(commits).toEqual(['"b" true'])
  })
})
