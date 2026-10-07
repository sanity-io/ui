/** @vitest-environment jsdom */

import {act, fireEvent, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {ComponentProps, Profiler, useState} from 'react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Autocomplete} from './autocomplete'

type Props = ComponentProps<typeof Autocomplete>

const OPTIONS = [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}]

// Every option matches, so an open list always shows all of them
const SHOW_ALL = () => true

function getInput() {
  return screen.getByRole<HTMLInputElement>('combobox')
}

/**
 * The results popover keeps its `hidden` attribute until Floating UI has positioned it, which
 * never happens in jsdom, so the options have to be queried as hidden.
 */
function getOption(value: string) {
  return screen.getByRole('option', {hidden: true, name: value})
}

/**
 * Moves focus to an element outside the autocomplete and waits for the (deferred) blur handling to
 * close the list. `Autocomplete` only treats a blur as leaving once focus has settled outside of it.
 */
async function blurTo(element: HTMLElement) {
  act(() => element.focus())

  await waitFor(() => expect(getInput()).toHaveAttribute('aria-expanded', 'false'))
}

/**
 * Renders the autocomplete with an element to move focus to, and records the state of the input
 * (`value`, `aria-expanded`, `aria-activedescendant`) after every commit of the subtree.
 */
function renderAutocomplete(props: Partial<Props> = {}) {
  const commits: string[] = []
  const recordCommit = () => {
    const input = getInput()

    commits.push(
      [
        JSON.stringify(input.value),
        input.getAttribute('aria-expanded'),
        input.getAttribute('aria-activedescendant'),
      ].join(' '),
    )
  }
  const ui = (nextProps: Partial<Props>) => (
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
    rerender: (nextProps: Partial<Props> = {}) => result.rerender(ui(nextProps)),
  }
}

/** A parent that answers `onChange` synchronously, with the selected value or another one */
function ControlledParent({answer}: {answer: (selected: string) => string}) {
  const [value, setValue] = useState('foo')

  return (
    <Autocomplete
      filterOption={SHOW_ALL}
      id="ac"
      onChange={(selected) => setValue(answer(selected))}
      openOnFocus
      options={OPTIONS}
      value={value}
    />
  )
}

describe('components/autocomplete', () => {
  describe('open button', () => {
    it('renders no open button by default', () => {
      render(<Autocomplete id="ac" options={OPTIONS} />)

      expect(screen.queryByRole('button', {name: 'Open'})).toBeNull()
    })

    it('labels the open button "Open" when `openButton` is `true`', () => {
      render(<Autocomplete id="ac" openButton options={OPTIONS} />)

      expect(screen.getByRole('button', {name: 'Open'})).toBeInTheDocument()
    })

    it('forwards the `openButton` object to the button', () => {
      render(
        <Autocomplete
          id="ac"
          openButton={{'aria-label': 'Show countries', 'title': 'Countries'}}
          options={OPTIONS}
        />,
      )

      const button = screen.getByRole('button', {name: 'Show countries'})

      expect(button).toHaveAttribute('title', 'Countries')
    })

    it('runs the `openButton` onClick and expands the list on click', () => {
      const onClick = vi.fn()

      render(<Autocomplete id="ac" openButton={{onClick}} options={OPTIONS} placeholder="Search" />)

      const input = screen.getByPlaceholderText('Search')

      fireEvent.focus(input)

      expect(input).toHaveAttribute('aria-expanded', 'false')

      fireEvent.click(screen.getByRole('button', {name: 'Open'}))

      expect(onClick).toHaveBeenCalledTimes(1)
      expect(input).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('controlled value', () => {
    it('renders the `value` prop through `renderValue`', () => {
      const options = [
        {value: 'foo', title: 'Foo'},
        {value: 'bar', title: 'Bar'},
      ]

      render(
        <Autocomplete
          id="ac"
          options={options}
          renderValue={(value, option) => option?.title ?? value}
          value="bar"
        />,
      )

      expect(getInput()).toHaveValue('Bar')
      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-bar')
    })

    it('renders an empty input for an empty `value`', () => {
      renderAutocomplete({value: ''})

      expect(getInput()).toHaveValue('')
      expect(getInput()).not.toHaveAttribute('aria-activedescendant')
      expect(screen.queryByRole('button', {name: 'Clear'})).toBeNull()
    })

    it('follows a new `value` prop and makes it the active option', () => {
      const {rerender} = renderAutocomplete({value: 'foo'})

      expect(getInput()).toHaveValue('foo')
      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-foo')

      rerender({value: 'bar'})

      expect(getInput()).toHaveValue('bar')
      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-bar')
      expect(screen.getByRole('button', {name: 'Clear'})).toBeInTheDocument()

      rerender({value: ''})

      expect(getInput()).toHaveValue('')
      expect(screen.queryByRole('button', {name: 'Clear'})).toBeNull()
    })

    it('shows a new `value` prop in the first commit after it changed', () => {
      const {commits, rerender} = renderAutocomplete({value: 'foo'})

      commits.length = 0

      rerender({value: 'bar'})

      // The first commit shows the new value, and no committed frame showed the previous one
      expect(commits[0]).toBe('"bar" false ac-option-bar')
      expect(commits).not.toContain('"foo" false ac-option-foo')
    })

    it('keeps the current value when the `value` prop becomes undefined', () => {
      const {rerender} = renderAutocomplete({value: 'foo'})

      rerender({value: undefined})

      expect(getInput()).toHaveValue('foo')
    })

    it('drops a pending query when the `value` prop changes', async () => {
      const user = userEvent.setup()
      const {rerender} = renderAutocomplete({value: 'foo'})

      await user.click(getInput())
      await user.type(getInput(), 'ba')

      expect(getInput()).toHaveValue('fooba')
      expect(getInput()).toHaveAttribute('aria-expanded', 'true')

      rerender({value: 'baz'})

      expect(getInput()).toHaveValue('baz')
      expect(getInput()).toHaveAttribute('aria-expanded', 'false')
    })

    it('selecting an option calls `onSelect`, `onChange` and `onQueryChange`, and shows it', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const onQueryChange = vi.fn()
      const onSelect = vi.fn()

      renderAutocomplete({onChange, onQueryChange, onSelect, value: 'foo'})

      // Typing edits the rendered value, so replace it with a query
      await user.clear(getInput())
      await user.type(getInput(), 'ba')

      expect(onQueryChange).toHaveBeenLastCalledWith('ba')
      expect(getInput()).toHaveAttribute('aria-expanded', 'true')

      await user.click(getOption('bar'))

      await waitFor(() => expect(onChange).toHaveBeenCalledWith('bar'))
      expect(onSelect).toHaveBeenCalledWith('bar')
      expect(onQueryChange).toHaveBeenLastCalledWith(null)
      expect(getInput()).toHaveValue('bar')
      expect(getInput()).toHaveFocus()

      // The list closes in a deferred render
      await waitFor(() => expect(getInput()).toHaveAttribute('aria-expanded', 'false'))
    })

    it('keeps showing a selection that the parent did not accept', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const {rerender} = renderAutocomplete({
        filterOption: SHOW_ALL,
        onChange,
        openOnFocus: true,
        value: 'foo',
      })

      await user.click(getInput())
      await user.click(getOption('bar'))

      await waitFor(() => expect(onChange).toHaveBeenCalledWith('bar'))

      // The parent re-renders with the value it already had
      rerender({filterOption: SHOW_ALL, onChange, openOnFocus: true, value: 'foo'})

      expect(getInput()).toHaveValue('bar')
      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-bar')
    })

    it('shows the value the parent answers a selection with', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const {rerender} = renderAutocomplete({
        filterOption: SHOW_ALL,
        onChange,
        openOnFocus: true,
        value: 'foo',
      })

      await user.click(getInput())
      await user.click(getOption('bar'))

      await waitFor(() => expect(onChange).toHaveBeenCalledWith('bar'))

      // The parent rejects "bar" and sets something else
      rerender({filterOption: SHOW_ALL, onChange, openOnFocus: true, value: 'baz'})

      expect(getInput()).toHaveValue('baz')
      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-baz')
    })

    it('shows the value a parent answers a selection with in the same tick', async () => {
      const user = userEvent.setup()

      render(<ControlledParent answer={() => 'baz'} />)

      await user.click(getInput())
      await user.click(getOption('bar'))

      await waitFor(() => expect(getInput()).toHaveValue('baz'))

      // Nothing pending overrides the parent's answer later on
      await act(() => new Promise((resolve) => setTimeout(resolve, 50)))

      expect(getInput()).toHaveValue('baz')
      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-baz')
    })

    it('shows a selection a parent accepts in the same tick', async () => {
      const user = userEvent.setup()

      render(<ControlledParent answer={(selected) => selected} />)

      await user.click(getInput())
      await user.click(getOption('bar'))

      await waitFor(() => expect(getInput()).toHaveValue('bar'))
      await waitFor(() => expect(getInput()).toHaveAttribute('aria-expanded', 'false'))
    })

    it('shows the selection once more when the parent accepts it', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const {rerender} = renderAutocomplete({
        filterOption: SHOW_ALL,
        onChange,
        openOnFocus: true,
        value: 'foo',
      })

      await user.click(getInput())
      await user.click(getOption('bar'))

      await waitFor(() => expect(onChange).toHaveBeenCalledWith('bar'))

      rerender({filterOption: SHOW_ALL, onChange, openOnFocus: true, value: 'bar'})

      expect(getInput()).toHaveValue('bar')
      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-bar')
    })

    it('clears the value and calls `onChange` with an empty string', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const onQueryChange = vi.fn()

      renderAutocomplete({onChange, onQueryChange, value: 'foo'})

      await user.click(screen.getByRole('button', {name: 'Clear'}))

      expect(onChange).toHaveBeenCalledWith('')
      expect(onQueryChange).toHaveBeenLastCalledWith(null)
      expect(getInput()).toHaveValue('')
      expect(getInput()).toHaveFocus()
    })
  })

  describe('uncontrolled value', () => {
    it('starts empty and shows the selected option', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      renderAutocomplete({onChange})

      expect(getInput()).toHaveValue('')

      await user.type(getInput(), 'ba')

      expect(screen.queryByRole('option', {hidden: true, name: 'foo'})).toBeNull()

      await user.click(getOption('baz'))

      await waitFor(() => expect(getInput()).toHaveValue('baz'))
      expect(onChange).toHaveBeenCalledWith('baz')
      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-baz')
    })

    it('keeps the selection across parent re-renders', async () => {
      const user = userEvent.setup()
      const {rerender} = renderAutocomplete()

      await user.type(getInput(), 'ba')
      await user.click(getOption('baz'))

      await waitFor(() => expect(getInput()).toHaveValue('baz'))

      rerender()

      expect(getInput()).toHaveValue('baz')
    })
  })

  describe('active option', () => {
    it('resets the active option to the value when focus leaves', async () => {
      const user = userEvent.setup()
      const onBlur = vi.fn()
      const {outside} = renderAutocomplete({
        filterOption: SHOW_ALL,
        onBlur,
        openOnFocus: true,
        value: 'bar',
      })

      await user.click(getInput())

      expect(getInput()).toHaveAttribute('aria-expanded', 'true')

      await user.keyboard('{ArrowDown}')

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-baz')

      await blurTo(outside)

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-bar')
      expect(onBlur).toHaveBeenCalledTimes(1)
    })

    it('never commits a closed list that still points at the arrowed option', async () => {
      const user = userEvent.setup()
      const {commits, outside} = renderAutocomplete({
        filterOption: SHOW_ALL,
        openOnFocus: true,
        value: 'bar',
      })

      await user.click(getInput())
      await user.keyboard('{ArrowDown}')

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-baz')

      commits.length = 0

      await blurTo(outside)

      // No committed frame was closed while still pointing at the option the arrow key reached
      expect(commits).not.toContain('"bar" false ac-option-baz')
      expect(commits.at(-1)).toBe('"bar" false ac-option-bar')
    })

    it('leaves the active option alone when focus leaves without a value', async () => {
      const user = userEvent.setup()
      const {outside} = renderAutocomplete({filterOption: SHOW_ALL, openOnFocus: true})

      await user.click(getInput())
      await user.keyboard('{ArrowDown}')

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-foo')

      await blurTo(outside)

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-foo')
    })

    it('resets the active option to the value on Escape', async () => {
      const user = userEvent.setup()
      const onQueryChange = vi.fn()

      renderAutocomplete({
        filterOption: SHOW_ALL,
        onQueryChange,
        openOnFocus: true,
        value: 'bar',
      })

      await user.click(getInput())
      await user.keyboard('{ArrowDown}')

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-baz')

      await user.keyboard('{Escape}')

      expect(getInput()).toHaveAttribute('aria-expanded', 'false')
      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-bar')
      expect(onQueryChange).toHaveBeenLastCalledWith(null)
      expect(getInput()).toHaveFocus()
    })

    it('clears the active option when the query changes', async () => {
      const user = userEvent.setup()

      renderAutocomplete({filterOption: SHOW_ALL, openOnFocus: true, value: 'bar'})

      await user.click(getInput())
      await user.keyboard('{ArrowDown}')

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-baz')

      await user.type(getInput(), 'x')

      expect(getInput()).not.toHaveAttribute('aria-activedescendant')
    })
  })

  describe('keyboard navigation', () => {
    it('seeds arrow navigation from the selected value', async () => {
      const user = userEvent.setup()

      renderAutocomplete({filterOption: SHOW_ALL, openOnFocus: true, value: 'bar'})

      await user.click(getInput())
      await user.keyboard('{ArrowDown}')

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-baz')
      expect(getOption('baz')).toHaveAttribute('aria-selected', 'true')
      expect(getOption('bar')).toHaveAttribute('aria-selected', 'false')

      // Wraps around
      await user.keyboard('{ArrowDown}')

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-foo')

      await user.keyboard('{ArrowUp}')

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-baz')
    })

    it('starts from the last option on ArrowUp without an active option', async () => {
      const user = userEvent.setup()

      renderAutocomplete({filterOption: SHOW_ALL, openOnFocus: true})

      await user.click(getInput())
      await user.keyboard('{ArrowUp}')

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-baz')
    })

    it('seeds arrow navigation from the value again after focus left', async () => {
      const user = userEvent.setup()
      const {outside} = renderAutocomplete({
        filterOption: SHOW_ALL,
        openOnFocus: true,
        value: 'bar',
      })

      await user.click(getInput())
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{ArrowDown}')

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-foo')

      await blurTo(outside)
      await user.click(getInput())

      expect(getInput()).toHaveAttribute('aria-expanded', 'true')

      await user.keyboard('{ArrowDown}')

      // From "bar" (the value), not from "foo" (the last active option)
      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-baz')
    })

    it('seeds arrow navigation from a keyboard selection', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()
      const {outside, rerender} = renderAutocomplete({
        filterOption: SHOW_ALL,
        onChange,
        openOnFocus: true,
        value: 'foo',
      })

      await user.click(getInput())
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{ArrowDown}')

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-baz')

      // In a browser the active option holds DOM focus by now (see the `Custom` story), but jsdom
      // cannot focus into the still-hidden popover, so press Enter on the option itself
      fireEvent.keyDown(getOption('baz'), {key: 'Enter'})

      await waitFor(() => expect(onChange).toHaveBeenCalledWith('baz'))
      expect(getInput()).toHaveValue('baz')
      expect(getInput()).toHaveFocus()

      rerender({filterOption: SHOW_ALL, onChange, openOnFocus: true, value: 'baz'})

      await blurTo(outside)
      await user.click(getInput())
      await user.keyboard('{ArrowDown}')

      // Wraps around from "baz"
      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-foo')
    })
  })
})
