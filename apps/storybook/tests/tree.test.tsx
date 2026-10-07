import {ThemeProvider, Tree, TreeItem} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {composeStories} from '@storybook/react-vite'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {userEvent} from 'vitest/browser'

import * as treeStories from '../stories/components/Tree.stories'

const {TabFromElement} = composeStories(treeStories)

const theme = buildTheme()

function focusedTestId() {
  return document.activeElement?.closest('[data-testid]')?.getAttribute('data-testid') ?? null
}

function tree() {
  return document.querySelector<HTMLElement>('[role="tree"]')!
}

// The tree hands its tab stop over to the first item from a focus event on the tree element, and
// Shift+Tab has to skip the tree element once an item holds the tab stop. Both depend on the
// browser's native sequential focus navigation, so these scenarios use real key presses instead of
// a story `play` function.
describe('Components/Tree', () => {
  test('is a single tab stop that enters on the first item', async () => {
    await render(<TabFromElement />)

    expect(tree()).toHaveAttribute('tabindex', '0')

    document.querySelector<HTMLElement>('[data-testid="before"]')!.focus()
    await userEvent.tab()
    await expect.poll(focusedTestId).toBe('fruit')
    await expect.poll(() => tree().hasAttribute('tabindex')).toBe(false)

    await userEvent.tab()
    await expect.poll(focusedTestId).toBe('after')

    await userEvent.tab({shift: true})
    await expect.poll(focusedTestId).toBe('fruit')

    await userEvent.tab({shift: true})
    await expect.poll(focusedTestId).toBe('before')
  })

  test('tabbing backwards into the tree reaches the first item', async () => {
    await render(<TabFromElement />)

    document.querySelector<HTMLElement>('[data-testid="after"]')!.focus()
    await userEvent.tab({shift: true})
    await expect.poll(focusedTestId).toBe('fruit')
  })

  test('tabs back onto the item that was focused last', async () => {
    await render(<TabFromElement />)

    document.querySelector<HTMLElement>('[data-testid="before"]')!.focus()
    await userEvent.tab()
    await userEvent.keyboard('{ArrowDown}{ArrowDown}')
    await expect.poll(focusedTestId).toBe('pineapples')

    await userEvent.tab()
    await expect.poll(focusedTestId).toBe('after')

    await userEvent.tab({shift: true})
    await expect.poll(focusedTestId).toBe('pineapples')

    await userEvent.tab({shift: true})
    await expect.poll(focusedTestId).toBe('before')
  })

  test('leaves focus on the tree element when it is clicked between the items', async () => {
    await render(
      <ThemeProvider scheme="light" theme={theme}>
        <button data-testid="before" type="button">
          Before
        </button>
        <Tree gap={1} style={{padding: 40}}>
          <TreeItem data-testid="a" text="A" />
          <TreeItem data-testid="b" text="B" />
        </Tree>
      </ThemeProvider>,
    )

    // The padding of the tree element, outside of any item
    await userEvent.click(tree(), {position: {x: 10, y: 10}})

    await expect.poll(() => document.activeElement).toBe(tree())
    expect(document.querySelector('[data-testid="a"]')).toHaveAttribute('tabindex', '-1')

    // A second press moves focus nowhere, so no focus event follows it
    await userEvent.click(tree(), {position: {x: 10, y: 10}})
    await expect.poll(() => document.activeElement).toBe(tree())

    // Keyboard focus is still passed on afterwards
    document.querySelector<HTMLElement>('[data-testid="before"]')!.focus()
    await userEvent.tab()
    await expect.poll(focusedTestId).toBe('a')
  })
})
