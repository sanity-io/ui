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
        <Tree aria-label="Letters" gap={1} style={{padding: 40}}>
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

  test('skips an item that cannot take focus instead of making it the tab stop', async () => {
    await render(
      <ThemeProvider scheme="light" theme={theme}>
        <button data-testid="before" type="button">
          Before
        </button>
        <Tree aria-label="Letters" gap={1} style={{padding: 40}}>
          <TreeItem data-testid="a" hidden text="A" />
          <TreeItem data-testid="b" text="B" />
          <TreeItem data-testid="c" text="C" />
        </Tree>
        <button data-testid="after" type="button">
          After
        </button>
      </ThemeProvider>,
    )

    const a = () => document.querySelector<HTMLElement>('[data-testid="a"]')!

    // The hand-off from the tree element goes to the first item that takes focus
    document.querySelector<HTMLElement>('[data-testid="before"]')!.focus()
    await userEvent.tab()
    await expect.poll(focusedTestId).toBe('b')
    await expect.poll(() => tree().hasAttribute('tabindex')).toBe(false)
    expect(a()).toHaveAttribute('tabindex', '-1')

    // So do the keys, both from an item and from the tree element
    await userEvent.keyboard('{Home}')
    await expect.poll(focusedTestId).toBe('b')

    await userEvent.keyboard('{ArrowDown}')
    await expect.poll(focusedTestId).toBe('c')

    // Leaving and tabbing back still lands inside the tree
    await userEvent.tab()
    await expect.poll(focusedTestId).toBe('after')
    await userEvent.tab({shift: true})
    await expect.poll(focusedTestId).toBe('c')
  })

  test('does not hand the tab stop to a `selected` item that is hidden', async () => {
    // `checkVisibility()` decides this at registration time; jsdom does not implement it, so the
    // case lives here
    await render(
      <ThemeProvider scheme="light" theme={theme}>
        <button data-testid="before" type="button">
          Before
        </button>
        <Tree aria-label="Letters" gap={1}>
          <TreeItem data-testid="a" text="A" />
          <TreeItem data-testid="b" hidden selected text="B" />
          <TreeItem data-testid="c" selected style={{display: 'none'}} text="C" />
        </Tree>
      </ThemeProvider>,
    )

    await expect.poll(() => tree().getAttribute('tabindex')).toBe('0')
    expect(document.querySelector('[data-testid="b"]')).toHaveAttribute('tabindex', '-1')
    expect(document.querySelector('[data-testid="c"]')).toHaveAttribute('tabindex', '-1')

    document.querySelector<HTMLElement>('[data-testid="before"]')!.focus()
    await userEvent.tab()
    await expect.poll(focusedTestId).toBe('a')
  })

  test('enters the items at the first one that takes focus from the focused tree element', async () => {
    await render(
      <ThemeProvider scheme="light" theme={theme}>
        <Tree aria-label="Letters" gap={1} style={{padding: 40}}>
          <TreeItem data-testid="a" hidden text="A" />
          <TreeItem data-testid="b" text="B" />
        </Tree>
      </ThemeProvider>,
    )

    await userEvent.click(tree(), {position: {x: 10, y: 10}})
    await expect.poll(() => document.activeElement).toBe(tree())

    await userEvent.keyboard('{ArrowDown}')
    await expect.poll(focusedTestId).toBe('b')
    await expect.poll(() => tree().hasAttribute('tabindex')).toBe(false)
  })

  test('enters the items from the focused tree element with the navigation keys', async () => {
    await render(
      <ThemeProvider scheme="light" theme={theme}>
        <Tree aria-label="Letters" gap={1} style={{padding: 40}}>
          <TreeItem data-testid="a" text="A" />
          <TreeItem data-testid="b" text="B" />
        </Tree>
      </ThemeProvider>,
    )

    await userEvent.click(tree(), {position: {x: 10, y: 10}})
    await expect.poll(() => document.activeElement).toBe(tree())

    await userEvent.keyboard('{End}')
    await expect.poll(focusedTestId).toBe('b')
    await expect.poll(() => tree().hasAttribute('tabindex')).toBe(false)

    await userEvent.keyboard('{ArrowUp}')
    await expect.poll(focusedTestId).toBe('a')
  })
})
