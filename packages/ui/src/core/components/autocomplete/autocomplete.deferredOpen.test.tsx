/** @vitest-environment jsdom */

import {act, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {ComponentProps, startTransition, use} from 'react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Autocomplete} from './autocomplete'
import {
  blurTo,
  getInput,
  getOption,
  OPTIONS,
  outsideAct,
  renderAutocomplete,
  SHOW_ALL,
  typeNatively,
} from './autocomplete.testUtils'

/**
 * The results popover opens one render after the state that asks for it (`useDeferredValue` in
 * autocomplete.tsx): the urgent commit carries the new input and state, the deferred commit flips
 * `aria-expanded` (and with it the popover's `open`). Closing is urgent. The recorded commits
 * collapse repeats (see `renderAutocomplete`), so the tests pin the order of the states a user
 * could see — "the keystroke shows before the list opens", "the list closes with the selected
 * value and no state in between" — not the number of commits.
 */
describe('components/autocomplete (deferred popover)', () => {
  it('opens in a later task than the focus that asks for it', async () => {
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

  // `useDeferredValue` keeps its previous value until its deferred render has committed. Were
  // `shouldExpand` itself deferred, a close followed by a reopen before that render would find the
  // deferred value still `true` and open urgently; the open cycle number does not have that past.
  it('defers a reopen that comes before the deferred render of the previous close', async () => {
    const user = userEvent.setup()
    const {commits} = renderAutocomplete({openOnFocus: true})

    await user.click(getInput())

    expect(getInput()).toHaveAttribute('aria-expanded', 'true')

    commits.length = 0

    await outsideAct(async () => {
      // Escape closes in the urgent commit of its event …
      getInput().dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key: 'Escape'}))
      await Promise.resolve()

      expect(getInput()).toHaveAttribute('aria-expanded', 'false')

      // … and a keystroke in the next microtask, before any deferred render has run, reopens:
      // closed in its urgent commit, open in a later task
      typeNatively(getInput(), 'b')
      await Promise.resolve()

      expect(getInput()).toHaveValue('b')
      expect(getInput()).toHaveAttribute('aria-expanded', 'false')

      await waitFor(() => expect(getInput()).toHaveAttribute('aria-expanded', 'true'))
    })

    expect(commits).toEqual(['"" false', '"b" false', '"b" true'])
  })

  // With nothing to show there is no popover, so the open cycle has to start when results
  // arrive for the pending query, not when the query started
  it('shows the pending query closed, then opens once results arrive', async () => {
    const user = userEvent.setup()
    const {commits, rerender} = renderAutocomplete({openOnFocus: true, options: []})

    await user.click(getInput())

    expect(getInput()).toHaveAttribute('aria-expanded', 'false')

    commits.length = 0

    rerender({openOnFocus: true, options: OPTIONS})

    expect(commits).toEqual(['"" false', '"" true'])
  })

  it('shows a query that starts matching closed, then opens for it', async () => {
    const user = userEvent.setup()
    const {commits} = renderAutocomplete()

    await user.type(getInput(), 'x')

    expect(getInput()).toHaveAttribute('aria-expanded', 'false')

    commits.length = 0

    // Replaces the selected "x" in one keystroke (an empty query would match every option)
    await user.type(getInput(), 'b', {
      initialSelectionEnd: 1,
      initialSelectionStart: 0,
      skipClick: true,
    })

    expect(commits).toEqual(['"b" false', '"b" true'])
  })

  // The `(query !== null && loading)` branch: the open button with nothing loaded yet
  it('shows a query that is loading closed, then opens once the options are in', async () => {
    const user = userEvent.setup()
    const {commits, rerender} = renderAutocomplete({loading: true, openButton: true, options: []})

    await user.click(screen.getByRole('button', {name: 'Open'}))
    await waitFor(() => expect(getInput()).toHaveFocus())

    expect(getInput()).toHaveAttribute('aria-expanded', 'false')

    commits.length = 0

    rerender({loading: false, openButton: true, options: OPTIONS})

    expect(commits).toEqual(['"" false', '"" true'])
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

  it('opens in the same render when that render is already a transition', () => {
    const {commits, rerender} = renderAutocomplete({openOnFocus: true, options: []})

    act(() => {
      getInput().focus()
    })

    expect(getInput()).toHaveAttribute('aria-expanded', 'false')

    commits.length = 0

    // A parent delivering options inside `startTransition` renders at transition priority
    // already, so there is nothing to defer: the list opens with them
    act(() => {
      startTransition(() => {
        rerender({openOnFocus: true, options: OPTIONS})
      })
    })

    expect(commits).toEqual(['"" true'])
  })

  it('closes with the selected value, with no state in between', async () => {
    const user = userEvent.setup()
    const {commits} = renderAutocomplete({filterOption: SHOW_ALL, openOnFocus: true})

    await user.click(getInput())
    commits.length = 0

    await user.click(getOption('bar'))

    await waitFor(() => expect(getInput()).toHaveAttribute('aria-expanded', 'false'))

    expect(commits).toEqual(['"bar" false'])
  })

  it('closes with the cleared input, with no state in between', async () => {
    const user = userEvent.setup()
    const {commits} = renderAutocomplete({openOnFocus: true, value: 'foo'})

    await user.click(getInput())

    expect(getInput()).toHaveAttribute('aria-expanded', 'true')

    commits.length = 0

    await user.click(screen.getByRole('button', {name: 'Clear'}))

    expect(commits).toEqual(['"" false'])
  })

  it('closes with the restored input when focus leaves, with no state in between', async () => {
    const user = userEvent.setup()
    const {commits, outside} = renderAutocomplete()

    await user.type(getInput(), 'ba')
    commits.length = 0

    await blurTo(outside)

    expect(commits).toEqual(['"" false'])
  })

  it('closes with the restored input on Escape, with no state in between', async () => {
    const user = userEvent.setup()
    const {commits} = renderAutocomplete()

    await user.type(getInput(), 'ba')
    commits.length = 0

    await user.keyboard('{Escape}')

    expect(commits).toEqual(['"" false'])
  })

  // The deferred render that opens the list is a re-render from the latest state, not an update
  // waiting in the reducer, so a `value` prop that changes while that render is held cannot be
  // overtaken by it. (A `startTransition(() => dispatch(…))` would be: React applies a
  // render-phase update, the prop sync, to the memoized state only while a lower-priority update
  // is pending in the same hook, and the transition then lands on top of it.)
  it('applies a `value` prop that changes while the opening render is held', async () => {
    let resolveContent!: () => void
    const content = new Promise<void>((resolve) => {
      resolveContent = resolve
    })

    // Suspends until `resolveContent()`; with no Suspense boundary above it, the render that
    // shows the list stays pending and the committed state keeps the list closed
    function SuspendingOption({value}: {value: string}) {
      use(content)

      return <div>{value}</div>
    }

    const renderOption = (option: {value: string}) => <SuspendingOption value={option.value} />
    const {rerender} = render(
      <Autocomplete
        filterOption={SHOW_ALL}
        id="ac"
        openOnFocus
        options={OPTIONS}
        renderOption={renderOption}
        value="foo"
      />,
    )

    // Focus asks for the list; the deferred render that would open it suspends on the content
    // (awaited `act`, as React asks for whenever a render suspends inside one)
    await act(async () => {
      getInput().focus()
    })

    expect(getInput()).toHaveValue('foo')
    expect(getInput()).toHaveAttribute('aria-expanded', 'false')

    // The parent changes the value while that render is pending: the sync drops the query, so
    // the list is no longer asked for
    await act(async () => {
      rerender(
        <Autocomplete
          filterOption={SHOW_ALL}
          id="ac"
          openOnFocus
          options={OPTIONS}
          renderOption={renderOption}
          value="bar"
        />,
      )
    })

    expect(getInput()).toHaveValue('bar')
    expect(getInput()).toHaveAttribute('aria-expanded', 'false')

    await act(async () => {
      resolveContent()
      await content
    })

    // The held render does not reopen the list or bring back the previous value
    expect(getInput()).toHaveValue('bar')
    expect(getInput()).toHaveAttribute('aria-expanded', 'false')

    // A render that is no longer held still opens it on demand, highlighting the new value
    await act(async () => {
      getInput().blur()
    })
    await waitFor(() => expect(getInput()).toHaveAttribute('aria-expanded', 'false'))
    await act(async () => {
      getInput().focus()
    })

    expect(getInput()).toHaveAttribute('aria-expanded', 'true')
    expect(getInput()).toHaveValue('bar')
    expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-bar')
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

  describe('renderPopover', () => {
    type RenderPopover = NonNullable<ComponentProps<typeof Autocomplete>['renderPopover']>

    /** Records the `hidden` flag each render, and renders the content when shown */
    function createRenderPopover() {
      const hidden = vi.fn<(value: boolean) => void>()
      const renderPopover: RenderPopover = (props) => {
        hidden(props.hidden)

        return props.hidden ? null : <div data-testid="custom-popover">{props.content}</div>
      }

      return {hidden, renderPopover}
    }

    it('shows the list one render after it is asked for', async () => {
      const user = userEvent.setup()
      const {hidden, renderPopover} = createRenderPopover()
      const {commits} = renderAutocomplete({
        filterOption: SHOW_ALL,
        openOnFocus: true,
        renderPopover,
      })

      hidden.mockClear()
      commits.length = 0

      await user.click(getInput())

      // Hidden in the urgent render of the focus, shown in the deferred one (StrictMode renders
      // twice, so repeats are collapsed)
      const flags = hidden.mock.calls.map(([value]) => value)

      expect(flags.filter((value, index) => value !== flags[index - 1])).toEqual([true, false])
      expect(commits).toEqual(['"" false', '"" true'])
      expect(screen.getByTestId('custom-popover')).toBeInTheDocument()
    })

    it('keeps the list hidden while loading without options, then shows it with them', async () => {
      const user = userEvent.setup()
      const {renderPopover} = createRenderPopover()
      const {commits, rerender} = renderAutocomplete({
        filterOption: SHOW_ALL,
        loading: true,
        openOnFocus: true,
        options: [],
        renderPopover,
      })

      await user.click(getInput())

      // Nothing to show yet: not even the renderer's own "no results" state
      expect(getInput()).toHaveAttribute('aria-expanded', 'false')
      expect(screen.queryByTestId('custom-popover')).toBeNull()

      commits.length = 0

      // The results are the closed → open flip, shown one render after they arrive
      rerender({
        filterOption: SHOW_ALL,
        loading: false,
        openOnFocus: true,
        options: OPTIONS,
        renderPopover,
      })

      expect(commits).toEqual(['"" false', '"" true'])
      expect(screen.getByTestId('custom-popover')).toContainElement(getOption('bar'))
    })

    it('shows the renderer once loading ends without options', async () => {
      const user = userEvent.setup()
      const {renderPopover} = createRenderPopover()
      const {rerender} = renderAutocomplete({
        loading: true,
        openOnFocus: true,
        options: [],
        renderPopover,
      })

      await user.click(getInput())
      rerender({loading: false, openOnFocus: true, options: [], renderPopover})

      // The renderer decides what to show for no results (a message, say)
      expect(getInput()).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByTestId('custom-popover')).toBeEmptyDOMElement()
    })

    // Known limit: a renderer with options that filter client-side shows a query without matches
    // (as "no results"), so a later match is a change inside the shown list, not an open
    it('treats a query that starts matching as a change inside the shown list', async () => {
      const user = userEvent.setup()
      const {renderPopover} = createRenderPopover()
      const {commits} = renderAutocomplete({renderPopover})

      await user.type(getInput(), 'x')

      expect(getInput()).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByTestId('custom-popover')).toBeEmptyDOMElement()

      commits.length = 0

      await user.type(getInput(), 'b', {
        initialSelectionEnd: 1,
        initialSelectionStart: 0,
        skipClick: true,
      })

      expect(commits).toEqual(['"b" true'])
      expect(screen.getByTestId('custom-popover')).toContainElement(getOption('bar'))
    })
  })
})
