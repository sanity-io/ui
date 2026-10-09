import {ThemeProvider, Tree, TreeItem, useTree} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {composeStories} from '@storybook/react-vite'
import {useEffect} from 'react'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {userEvent} from 'vitest/browser'

import * as treeStories from '../stories/components/Tree.stories'

const {TabFromElement} = composeStories(treeStories)

const theme = buildTheme()

/** Hands the tree's context value to the test, the way a `useTree()` consumer sees it */
function ExposeTree(props: {onChange: (tree: ReturnType<typeof useTree>) => void}) {
  const {onChange} = props
  const tree = useTree()

  useEffect(() => {
    onChange(tree)
  }, [onChange, tree])

  return null
}

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
    // The registration-time check reads `getComputedStyle` of the item and its ancestors. jsdom
    // covers the same case with its approximation of computed styles (`tree.keyboard.test.tsx`);
    // here a real layout engine resolves the `hidden` attribute through the UA stylesheet and the
    // inline `display: none`, and a real Tab press shows the hidden item is indeed skipped
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

  test('hands the tab stop to a `selected` item once its collapsed ancestor expands', async () => {
    let treeContext: ReturnType<typeof useTree> | null = null

    await render(
      <ThemeProvider scheme="light" theme={theme}>
        <button data-testid="before" type="button">
          Before
        </button>
        <Tree aria-label="Fruit" gap={1}>
          <ExposeTree onChange={(tree) => (treeContext = tree)} />
          <TreeItem data-testid="apples" text="Apples">
            <TreeItem data-testid="fuji" selected text="Fuji" />
          </TreeItem>
          <TreeItem data-testid="pears" text="Pears" />
        </Tree>
      </ThemeProvider>,
    )

    const fuji = () => document.querySelector<HTMLElement>('[data-testid="fuji"]')!
    const applesKey = document
      .querySelector('[data-testid="apples"]')!
      .getAttribute('data-tree-key')!

    // Collapsed: the tree element is the tab stop, the hidden selected item is not
    await expect.poll(() => tree().getAttribute('tabindex')).toBe('0')
    expect(fuji()).toHaveAttribute('tabindex', '-1')

    // Expanding the ancestor from outside the tree (nothing re-registers) hands it over
    treeContext!.setExpanded(applesKey, true)
    await expect.poll(() => fuji().getAttribute('tabindex')).toBe('0')
    expect(tree()).not.toHaveAttribute('tabindex')

    document.querySelector<HTMLElement>('[data-testid="before"]')!.focus()
    await userEvent.tab()
    await expect.poll(focusedTestId).toBe('fuji')
  })

  test('stays the focused tree element while a `selected` item becomes visible', async () => {
    let treeContext: ReturnType<typeof useTree> | null = null

    await render(
      <ThemeProvider scheme="light" theme={theme}>
        <Tree aria-label="Fruit" gap={1} style={{padding: 40}}>
          <ExposeTree onChange={(tree) => (treeContext = tree)} />
          <TreeItem data-testid="apples" text="Apples">
            <TreeItem data-testid="fuji" selected text="Fuji" />
          </TreeItem>
          <TreeItem data-testid="pears" text="Pears" />
        </Tree>
        <button data-testid="after" type="button">
          After
        </button>
      </ThemeProvider>,
    )

    const apples = () => document.querySelector<HTMLElement>('[data-testid="apples"]')!
    const fuji = () => document.querySelector<HTMLElement>('[data-testid="fuji"]')!
    const applesKey = apples().getAttribute('data-tree-key')!

    // A click between the items leaves focus on the tree element
    await userEvent.click(tree(), {position: {x: 10, y: 10}})
    await expect.poll(() => document.activeElement).toBe(tree())

    // Expanding the parent makes the `selected` item eligible, but the focused tree element stays
    // the tab stop (taking its `tabindex` away would not move focus off it), so Tab leaves the
    // tree in one step instead of landing on the item
    treeContext!.setExpanded(applesKey, true)
    await expect.poll(() => apples().getAttribute('aria-expanded')).toBe('true')
    expect(document.activeElement).toBe(tree())
    expect(tree()).toHaveAttribute('tabindex', '0')
    expect(fuji()).toHaveAttribute('tabindex', '-1')

    await userEvent.tab()
    await expect.poll(focusedTestId).toBe('after')

    // Once the tree element has lost focus, the `selected` item is the tab stop
    await expect.poll(() => fuji().getAttribute('tabindex')).toBe('0')
    expect(tree()).not.toHaveAttribute('tabindex')

    await userEvent.tab({shift: true})
    await expect.poll(focusedTestId).toBe('fuji')
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
