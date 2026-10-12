import {ThemeProvider} from '@sanity/ui'
import {Autocomplete} from '@sanity/ui/autocomplete'
import {buildTheme} from '@sanity/ui/theme'
import {use} from 'react'
import {describe, expect, test, vi} from 'vitest'
import {render} from 'vitest-browser-react'
import {userEvent} from 'vitest/browser'

const theme = buildTheme()

const OPTIONS = [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}]

function focusedOptionId() {
  return document.activeElement?.closest('[role="option"]')?.id
}

/**
 * Renders link options, which take focus whatever their `tabIndex`. They suspend until `showList`
 * is called, which holds the deferred render that shows the list.
 */
async function renderLinkOptions() {
  let showList!: () => void
  const listReady = new Promise<void>((resolve) => {
    showList = resolve
  })

  function LinkOption(props: {tabIndex?: number; value: string}) {
    use(listReady)

    return (
      <a href="#" tabIndex={props.tabIndex}>
        {props.value}
      </a>
    )
  }

  const screen = await render(
    <ThemeProvider theme={theme}>
      <Autocomplete
        filterOption={() => true}
        id="ac"
        openButton
        openOnFocus
        options={OPTIONS}
        renderOption={(option) => <LinkOption value={option.value} />}
        value="foo"
      />
    </ThemeProvider>,
  )

  return {input: screen.getByRole('combobox'), screen, showList}
}

// jsdom never shows the popover, so moving focus into the list is tested here
describe('Components/Autocomplete', () => {
  test('moves focus to an option made active before the list showed', async () => {
    const {input, showList} = await renderLinkOptions()

    await userEvent.click(input)
    await userEvent.keyboard('{ArrowDown}')
    await expect.element(input).toHaveAttribute('aria-expanded', 'false')

    showList()

    await expect.poll(focusedOptionId).toBe('ac-option-bar')
  })

  test('leaves focus in the input when the list shows after Escape', async () => {
    const {input, screen, showList} = await renderLinkOptions()

    await userEvent.click(input)
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{Escape}')
    showList()
    await userEvent.click(screen.getByRole('button', {name: 'Open'}))

    await expect.element(screen.getByRole('option', {name: 'foo'})).toBeVisible()
    expect(document.activeElement).toBe(input.element())
  })

  test.each([
    ['focus', 'combobox', undefined],
    ['the open button', 'button', 'Open'],
  ] as const)('leaves focus in the input when %s opens the list', async (_, role, name) => {
    const {input, screen, showList} = await renderLinkOptions()

    showList()
    await userEvent.click(screen.getByRole(role, {name}))

    await expect.element(screen.getByRole('option', {name: 'foo'})).toBeVisible()
    expect(document.activeElement).toBe(input.element())

    await userEvent.keyboard('{ArrowDown}')

    await expect.poll(focusedOptionId).toBe('ac-option-bar')
  })

  test('selects a clicked option while the active option is scrolled out of view', async () => {
    const onChange = vi.fn()
    const options = Array.from({length: 50}, (_, i) => ({value: `option-${i}`}))
    const screen = await render(
      <ThemeProvider theme={theme}>
        <Autocomplete
          filterOption={() => true}
          id="ac"
          onChange={onChange}
          openButton
          options={options}
          value="option-0"
        />
      </ThemeProvider>,
    )

    await userEvent.click(screen.getByRole('button', {name: 'Open'}))
    await userEvent.click(screen.getByRole('option', {name: 'option-49'}))

    await expect.poll(() => onChange.mock.calls).toEqual([['option-49']])
  })
})
