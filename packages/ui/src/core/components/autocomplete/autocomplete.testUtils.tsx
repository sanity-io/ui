import {act, RenderResult, screen, waitFor} from '@testing-library/react'
import {ComponentProps, Profiler} from 'react'
import {expect} from 'vitest'

import {render} from '../../../../test/utils'
import {Autocomplete} from './autocomplete'

export type AutocompleteTestProps = Partial<ComponentProps<typeof Autocomplete>>

export const OPTIONS = [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}]

/** Every option matches, so an open list always shows all of them */
export const SHOW_ALL = () => true

export function getInput() {
  return screen.getByRole<HTMLInputElement>('combobox')
}

/**
 * The results popover keeps its `hidden` attribute until Floating UI has positioned it, which
 * never happens in jsdom, so the options have to be queried as hidden.
 */
export function getOption(value: string) {
  return screen.getByRole('option', {hidden: true, name: value})
}

/**
 * Moves focus to an element outside the autocomplete and waits for the (deferred) blur handling to
 * close the list. `Autocomplete` only treats a blur as leaving once focus has settled outside of it.
 */
export async function blurTo(element: HTMLElement) {
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
export async function outsideAct(fn: () => Promise<void>) {
  const previous = globalThis.IS_REACT_ACT_ENVIRONMENT

  globalThis.IS_REACT_ACT_ENVIRONMENT = false

  try {
    await fn()
  } finally {
    globalThis.IS_REACT_ACT_ENVIRONMENT = previous
  }
}

/**
 * A keystroke as the browser delivers it, outside of `act`: the value is set through the
 * prototype setter so that React's value tracker sees the change, then `input` is dispatched.
 */
export function typeNatively(input: HTMLInputElement, value: string) {
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(input, value)
  input.dispatchEvent(new Event('input', {bubbles: true}))
}

/**
 * Renders the autocomplete with an element to move focus to, and records the committed state of
 * the input (`value` and `aria-expanded`) through a `Profiler`, collapsing commits that repeat the
 * previous state: the popover commits several times per open on its own (positioning, reveal), so
 * what the log pins is the order of the states a user could see, not the number of commits.
 */
export function renderAutocomplete(props: AutocompleteTestProps = {}): Omit<
  RenderResult,
  'rerender'
> & {
  commits: string[]
  outside: HTMLElement
  rerender: (nextProps?: AutocompleteTestProps) => void
} {
  const commits: string[] = []
  const recordCommit = () => {
    const input = getInput()
    const state = `${JSON.stringify(input.value)} ${input.getAttribute('aria-expanded')}`

    if (commits.at(-1) !== state) commits.push(state)
  }
  const ui = (nextProps: AutocompleteTestProps) => (
    <>
      <Profiler id="autocomplete" onRender={recordCommit}>
        <Autocomplete id="ac" options={OPTIONS} {...nextProps} />
      </Profiler>
      <button type="button">Outside</button>
    </>
  )
  const result = render(ui(props))

  return {
    ...result,
    commits,
    outside: screen.getByRole('button', {name: 'Outside'}),
    rerender: (nextProps: AutocompleteTestProps = {}) => result.rerender(ui(nextProps)),
  }
}
