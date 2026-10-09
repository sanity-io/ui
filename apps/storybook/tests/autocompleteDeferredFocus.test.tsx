import {ThemeProvider} from '@sanity/ui'
import {Autocomplete} from '@sanity/ui/autocomplete'
import {buildTheme} from '@sanity/ui/theme'
import {use} from 'react'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {userEvent} from 'vitest/browser'

const theme = buildTheme()

const OPTIONS = [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}]

const POLL = {timeout: 5000}

function activeOptionId(): string | undefined {
  return document.activeElement?.closest('[role="option"]')?.id
}

/**
 * Waits until the option is visible: the popover positions itself in a commit after the one that
 * opened the list, and React runs the effects of a commit before it renders the next one, so the
 * focus effect of the open has run by then, whichever way it went.
 */
async function expectOptionShown(screen: Awaited<ReturnType<typeof render>>, value: string) {
  const option = screen.getByRole('option', {name: value})

  await expect.poll(() => option.element().checkVisibility(), POLL).toBe(true)
}

/**
 * Renders an autocomplete whose options suspend until the returned `resolveContent` is called,
 * which holds the render that would show the list. `tabIndex` comes from the autocomplete (0 for
 * the active option while the list has keyboard focus), which is what makes an option focusable.
 */
async function renderWithHeldOptions(props: {openButton?: boolean; openOnFocus?: boolean}) {
  let resolveContent!: () => void
  const content = new Promise<void>((resolve) => {
    resolveContent = resolve
  })

  function SuspendingOption(suspendingProps: {tabIndex?: number; value: string}) {
    use(content)

    return <div tabIndex={suspendingProps.tabIndex}>{suspendingProps.value}</div>
  }

  const screen = await render(
    <ThemeProvider theme={theme}>
      <Autocomplete
        filterOption={() => true}
        id="ac"
        options={OPTIONS}
        renderOption={(option) => <SuspendingOption value={option.value} />}
        value="foo"
        {...props}
      />
    </ThemeProvider>,
  )

  return {input: screen.getByRole('combobox'), resolveContent, screen}
}

// The results list shows one render after it is asked for (`useDeferredValue` in autocomplete.tsx).
// The effect that moves DOM focus to the active option used to react to the active option and
// the options only, so an arrow key pressed before the list showed found nothing it could focus,
// and nothing retried when the list showed. jsdom cannot tell: its popover never positions and
// stays hidden for good. Here the opening render is held on a promise the options suspend on.
describe('autocomplete arrow key while the list is still opening', () => {
  test('moves focus to the active option once the list shows', async () => {
    const {input, resolveContent} = await renderWithHeldOptions({openOnFocus: true})

    // Focus asks for the list; the render that would show it suspends on the options
    await userEvent.click(input)
    await expect.poll(() => input.element().getAttribute('aria-expanded'), POLL).toBe('false')

    // ArrowDown makes "bar" the active option, with keyboard focus meant for the list, while
    // there is no list to move focus into yet
    await userEvent.keyboard('{ArrowDown}')
    await expect.poll(() => input.element().getAttribute('aria-expanded'), POLL).toBe('false')
    expect(activeOptionId()).toBeUndefined()

    resolveContent()

    await expect.poll(() => input.element().getAttribute('aria-expanded'), POLL).toBe('true')
    await expect.poll(activeOptionId, POLL).toBe('ac-option-bar')
    expect(input.element().getAttribute('aria-activedescendant')).toBe('ac-option-bar')
  })

  // Escape while the list is still opening focuses the input, which is focused already, so no
  // focus event ends the keyboard navigation the arrow key started; closing has to end it, or the
  // next ordinary open would move focus to the active option.
  test('leaves focus in the input when Escape closed the list before it showed', async () => {
    const {input, resolveContent, screen} = await renderWithHeldOptions({
      openButton: true,
      openOnFocus: true,
    })

    await userEvent.click(input)
    await userEvent.keyboard('{ArrowDown}')
    await expect.poll(() => input.element().getAttribute('aria-expanded'), POLL).toBe('false')
    expect(activeOptionId()).toBeUndefined()

    await userEvent.keyboard('{Escape}')
    expect(document.activeElement).toBe(input.element())

    resolveContent()

    await userEvent.click(screen.getByRole('button', {name: 'Open'}))
    await expectOptionShown(screen, 'foo')

    expect(input.element().getAttribute('aria-expanded')).toBe('true')
    expect(input.element().getAttribute('aria-activedescendant')).toBe('ac-option-foo')
    expect(activeOptionId()).toBeUndefined()
    expect(document.activeElement).toBe(input.element())
  })

  // The same effect must not move focus for an open that keyboard navigation had no part in. A
  // link option is focusable whatever its `tabIndex`, and the open button focuses the input in
  // an animation frame, which the deferred open can land after.
  test('leaves focus in the input when the list opens on a focusable selected option', async () => {
    const screen = await render(
      <ThemeProvider theme={theme}>
        <Autocomplete
          filterOption={() => true}
          id="ac"
          openButton
          options={OPTIONS}
          renderOption={(option) => <a href="#">{option.value}</a>}
          value="foo"
        />
      </ThemeProvider>,
    )
    const input = screen.getByRole('combobox')

    await userEvent.click(screen.getByRole('button', {name: 'Open'}))
    await expectOptionShown(screen, 'foo')

    expect(input.element().getAttribute('aria-expanded')).toBe('true')
    expect(activeOptionId()).toBeUndefined()
    expect(document.activeElement).toBe(input.element())

    // Keyboard navigation does move focus into the list
    await userEvent.keyboard('{ArrowDown}')
    await expect.poll(activeOptionId, POLL).toBe('ac-option-bar')
  })
})
