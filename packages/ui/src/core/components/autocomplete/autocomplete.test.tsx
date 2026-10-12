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

const OPTIONS = [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}]

const SHOW_ALL = () => true

function getInput() {
  return screen.getByRole<HTMLInputElement>('combobox')
}

// Floating UI never positions the popover in jsdom, so it keeps its `hidden` attribute
function getOption(value: string) {
  return screen.getByRole('option', {hidden: true, name: value})
}

async function blurTo(element: HTMLElement) {
  act(() => element.focus())

  await waitFor(() => expect(getInput()).toHaveAttribute('aria-expanded', 'false'))
}

/**
 * Renders the autocomplete next to a button to move focus to, and records the input's value and
 * `aria-expanded` whenever a commit changes them
 */
function renderAutocomplete(props: Partial<ComponentProps<typeof Autocomplete>> = {}) {
  const states: string[] = []
  const recordState = () => {
    const state = `${JSON.stringify(getInput().value)} ${getInput().getAttribute('aria-expanded')}`

    if (states.at(-1) !== state) states.push(state)
  }
  const ui = (nextProps: typeof props) => (
    <>
      <Profiler id="autocomplete" onRender={recordState}>
        <Autocomplete filterOption={SHOW_ALL} id="ac" options={OPTIONS} {...nextProps} />
      </Profiler>
      <button type="button">Outside</button>
    </>
  )
  const {rerender} = render(ui(props))

  return {
    outside: screen.getByRole('button', {name: 'Outside'}),
    rerender: (nextProps: typeof props = {}) => rerender(ui(nextProps)),
    states,
  }
}

async function selectOption(user: ReturnType<typeof userEvent.setup>, value: string) {
  await user.click(getInput())
  await user.click(getOption(value))
  await waitFor(() => expect(getInput()).toHaveValue(value))
}

describe('components/autocomplete', () => {
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

  describe('value', () => {
    it('shows a new `value` in the first commit after it changed', () => {
      const {rerender, states} = renderAutocomplete({value: 'foo'})

      states.length = 0
      rerender({value: 'bar'})

      expect(states).toEqual(['"bar" false'])
    })

    it('drops a pending query when `value` changes, without calling `onQueryChange`', async () => {
      const user = userEvent.setup()
      const onQueryChange = vi.fn()
      const {rerender} = renderAutocomplete({onQueryChange, value: 'foo'})

      await user.clear(getInput())
      await user.type(getInput(), 'ba')
      onQueryChange.mockClear()
      rerender({onQueryChange, value: 'baz'})

      expect(getInput()).toHaveValue('baz')
      expect(getInput()).toHaveAttribute('aria-expanded', 'false')
      expect(onQueryChange).not.toHaveBeenCalled()
    })

    it('keeps a pending query when `value` echoes a selection', async () => {
      const user = userEvent.setup()
      const {rerender} = renderAutocomplete({openOnFocus: true, value: 'foo'})

      await selectOption(user, 'bar')
      await user.clear(getInput())
      await user.type(getInput(), 'ba')
      rerender({openOnFocus: true, value: 'bar'})

      expect(getInput()).toHaveValue('ba')
      expect(getInput()).toHaveAttribute('aria-expanded', 'true')
    })

    it('keeps a pending query when `value` echoes a clear', async () => {
      const user = userEvent.setup()
      const {rerender} = renderAutocomplete({value: 'foo'})

      await user.click(screen.getByRole('button', {name: 'Clear'}))
      await user.type(getInput(), 'ba')
      rerender({value: ''})

      expect(getInput()).toHaveValue('ba')
      expect(getInput()).toHaveAttribute('aria-expanded', 'true')
    })

    it('keeps showing a selection until `value` changes', async () => {
      const user = userEvent.setup()
      const {rerender} = renderAutocomplete({openOnFocus: true, value: 'foo'})

      await selectOption(user, 'bar')
      rerender({openOnFocus: true, value: 'foo'})

      expect(getInput()).toHaveValue('bar')
    })

    it('keeps the value shown when `value` changes to undefined', () => {
      const {rerender} = renderAutocomplete({value: 'foo'})

      rerender({value: undefined})

      expect(getInput()).toHaveValue('foo')
    })

    it('shows the value a parent answers a selection with, without showing the selection first', async () => {
      const user = userEvent.setup()
      const shownValues: string[] = []

      function Parent() {
        const [value, setValue] = useState('foo')

        return (
          <Profiler id="autocomplete" onRender={() => shownValues.push(getInput().value)}>
            <Autocomplete
              filterOption={SHOW_ALL}
              id="ac"
              onChange={() => setValue('baz')}
              openOnFocus
              options={OPTIONS}
              value={value}
            />
          </Profiler>
        )
      }

      render(<Parent />)

      await user.click(getInput())
      await user.click(getOption('bar'))
      await waitFor(() => expect(getInput()).toHaveValue('baz'))

      expect(shownValues).not.toContain('bar')
    })
  })

  describe('list', () => {
    it('shows the first keystroke before the list opens for it', async () => {
      const user = userEvent.setup()
      const {states} = renderAutocomplete()

      await user.click(getInput())
      states.length = 0
      await user.type(getInput(), 'b', {skipClick: true})

      expect(states).toEqual(['"b" false', '"b" true'])
    })

    it('closes in the same commit that ends the query', async () => {
      const user = userEvent.setup()
      const {states} = renderAutocomplete()

      await user.type(getInput(), 'ba')
      states.length = 0
      await user.keyboard('{Escape}')

      expect(states).toEqual(['"" false'])
    })

    it('points `aria-activedescendant` at an option only while the list shows', async () => {
      const user = userEvent.setup()
      const {outside} = renderAutocomplete({openOnFocus: true, value: 'bar'})

      expect(getInput()).not.toHaveAttribute('aria-activedescendant')

      await user.click(getInput())

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-bar')

      await blurTo(outside)

      expect(getInput()).not.toHaveAttribute('aria-activedescendant')
    })

    it.each(['blur', 'Escape'])('puts the active option back on the value on %s', async (close) => {
      const user = userEvent.setup()
      const {outside} = renderAutocomplete({openOnFocus: true, value: 'bar'})

      await user.click(getInput())
      await user.keyboard('{ArrowDown}')

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-baz')

      if (close === 'Escape') await user.keyboard('{Escape}')
      await blurTo(outside)
      await user.click(getInput())

      expect(getInput()).toHaveAttribute('aria-activedescendant', 'ac-option-bar')
    })
  })
})
