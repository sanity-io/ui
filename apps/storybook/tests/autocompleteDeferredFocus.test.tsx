import {Card, Text, ThemeProvider} from '@sanity/ui'
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

// The results list shows one render after it is asked for (`useDeferredValue` in autocomplete.tsx).
// The effect that moves DOM focus to the active option used to react to the active option and
// the options only, so an arrow key pressed before the list showed found nothing it could focus,
// and nothing retried when the list showed. jsdom cannot tell: its popover never positions and
// stays hidden for good. Here the opening render is held on a promise the options suspend on.
describe('autocomplete arrow key while the list is still opening', () => {
  test('moves focus to the active option once the list shows', async () => {
    let resolveContent!: () => void
    const content = new Promise<void>((resolve) => {
      resolveContent = resolve
    })

    // Suspends until `resolveContent()`. `tabIndex` comes from the autocomplete (0 for the active
    // option while the list has keyboard focus), which is what makes the option focusable.
    function SuspendingOption(props: {tabIndex?: number; value: string}) {
      use(content)

      return <div tabIndex={props.tabIndex}>{props.value}</div>
    }

    const screen = await render(
      <ThemeProvider theme={theme}>
        <Autocomplete
          filterOption={() => true}
          id="ac"
          openOnFocus
          options={OPTIONS}
          renderOption={(option) => <SuspendingOption value={option.value} />}
          value="foo"
        />
      </ThemeProvider>,
    )
    const input = screen.getByRole('combobox')

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
})

// The open button focuses the input, and the list follows in the deferred render after it. An
// option only takes focus once the arrow keys have moved keyboard focus to the list: options
// that are focusable in their own right (the `Card as="a"` of the `Custom` story) would
// otherwise take it from the input as the list shows, and the next keystroke would only return
// focus instead of typing.
describe('autocomplete opened on a selected value', () => {
  test('leaves focus in the input, ready for the next keystroke', async () => {
    const screen = await render(
      <ThemeProvider theme={theme}>
        <Autocomplete
          filterOption={() => true}
          id="ac"
          openButton
          options={OPTIONS}
          renderOption={(option) => (
            <Card as="a" href="#" padding={2}>
              <Text>{option.value}</Text>
            </Card>
          )}
          value="foo"
        />
      </ThemeProvider>,
    )
    const input = screen.getByRole('combobox')

    await userEvent.click(screen.getByRole('button', {name: 'Open'}))

    await expect.poll(() => input.element().getAttribute('aria-expanded'), POLL).toBe('true')

    // The effect that would move focus runs in the commit that shows the list
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

    expect(activeOptionId()).toBeUndefined()
    expect(document.activeElement).toBe(input.element())
  })
})
