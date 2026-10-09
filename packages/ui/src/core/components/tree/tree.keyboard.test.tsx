/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import {describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Tree} from './tree'
import {TreeItem} from './treeItem'
import {TreeContextValue} from './types'
import {useTree} from './useTree'

/**
 * The test id of the item that contains the focused element. The focused element is the item
 * itself for plain items and the link for items with an `href`.
 */
function focusedItem(): string | null | undefined {
  return document.activeElement?.closest('[data-testid]')?.getAttribute('data-testid')
}

/** Hands the tree's context value to the test, the way a `useTree()` consumer sees it */
function ExposeTree(props: {onChange: (tree: TreeContextValue) => void}) {
  const {onChange} = props
  const tree = useTree()

  useEffect(() => {
    onChange(tree)
  }, [onChange, tree])

  return null
}

function FruitTree(props: {
  onFocus?: (event: React.FocusEvent<HTMLUListElement>) => void
  onMouseDown?: (event: React.MouseEvent<HTMLUListElement>) => void
}) {
  return (
    <>
      <button data-testid="before" type="button">
        Before
      </button>
      <Tree aria-label="Fruit" onFocus={props.onFocus} onMouseDown={props.onMouseDown}>
        <TreeItem data-testid="fruit" expanded text="Fruit">
          <TreeItem data-testid="oranges" text="Oranges" />
          <TreeItem data-testid="apples" text="Apples">
            <TreeItem data-testid="macintosh" href="/apples/macintosh" text="Macintosh" />
            <TreeItem data-testid="fuji" text="Fuji" />
          </TreeItem>
          <TreeItem data-testid="pears" text="Pears">
            <TreeItem data-testid="anjou" text="Anjou" />
          </TreeItem>
        </TreeItem>
        <TreeItem data-testid="vegetables" text="Vegetables">
          <TreeItem data-testid="carrots" text="Carrots" />
        </TreeItem>
      </Tree>
      <button data-testid="after" type="button">
        After
      </button>
    </>
  )
}

function DynamicTree() {
  const [ids, setIds] = useState(['b', 'c'])

  return (
    <>
      <button data-testid="prepend" onClick={() => setIds(['a', ...ids])} type="button">
        Prepend
      </button>
      <button data-testid="append" onClick={() => setIds([...ids, 'd'])} type="button">
        Append
      </button>
      <button
        data-testid="remove-first"
        onClick={() => setIds((prev) => prev.slice(1))}
        type="button"
      >
        Remove first
      </button>
      <Tree aria-label="Letters">
        {ids.map((id) => (
          <TreeItem data-testid={id} key={id} text={id.toUpperCase()} />
        ))}
      </Tree>
      <button data-testid="after" type="button">
        After
      </button>
    </>
  )
}

describe('components/tree tab stop', () => {
  it('is the tree element until an item has been focused, then the focused item', async () => {
    const user = userEvent.setup()

    render(<FruitTree />)

    const tree = screen.getByRole('tree')

    expect(tree).toHaveAttribute('tabindex', '0')
    expect(screen.getByTestId('fruit')).toHaveAttribute('tabindex', '-1')
    expect(screen.getByTestId('vegetables')).toHaveAttribute('tabindex', '-1')

    screen.getByTestId('before').focus()
    await user.tab()

    // Keyboard focus on the tree element is passed on to the first item
    expect(focusedItem()).toBe('fruit')
    expect(tree).not.toHaveAttribute('tabindex')
    expect(screen.getByTestId('fruit')).toHaveAttribute('tabindex', '0')
    expect(screen.getByTestId('vegetables')).toHaveAttribute('tabindex', '-1')

    // The tree is a single tab stop in both directions
    await user.tab()
    expect(screen.getByTestId('after')).toHaveFocus()

    await user.tab({shift: true})
    expect(focusedItem()).toBe('fruit')

    await user.tab({shift: true})
    expect(screen.getByTestId('before')).toHaveFocus()
  })

  it('reaches the first item when tabbing backwards into the tree', async () => {
    const user = userEvent.setup()

    render(<FruitTree />)

    screen.getByTestId('after').focus()
    await user.tab({shift: true})

    expect(focusedItem()).toBe('fruit')
  })

  it('stays on the item that was focused last when tabbing back in', async () => {
    const user = userEvent.setup()

    render(<FruitTree />)

    screen.getByTestId('before').focus()
    await user.tab()
    await user.keyboard('{ArrowDown}{ArrowDown}')
    expect(focusedItem()).toBe('apples')

    await user.tab()
    expect(screen.getByTestId('after')).toHaveFocus()

    await user.tab({shift: true})
    expect(focusedItem()).toBe('apples')
    expect(screen.getByTestId('apples')).toHaveAttribute('tabindex', '0')
    expect(screen.getByTestId('fruit')).toHaveAttribute('tabindex', '-1')
  })

  it('moves to the item that is clicked', async () => {
    const user = userEvent.setup()

    render(<FruitTree />)

    await user.click(screen.getByTestId('oranges'))

    expect(focusedItem()).toBe('oranges')
    expect(screen.getByTestId('oranges')).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('tree')).not.toHaveAttribute('tabindex')
  })

  it('leaves focus on the tree element when it is pressed between the items', async () => {
    const user = userEvent.setup()

    render(<FruitTree />)

    const tree = screen.getByRole('tree')

    await user.click(tree)

    expect(tree).toHaveFocus()
    expect(screen.getByTestId('fruit')).toHaveAttribute('tabindex', '-1')

    // Keyboard focus is still passed on afterwards
    screen.getByTestId('before').focus()
    await user.tab()

    expect(focusedItem()).toBe('fruit')
  })

  it('passes keyboard focus on after a second press on the focused tree element', async () => {
    const user = userEvent.setup()

    render(<FruitTree />)

    const tree = screen.getByRole('tree')

    await user.click(tree)
    expect(tree).toHaveFocus()

    // Focus does not move, so no focus event follows this press
    await user.click(tree)
    expect(tree).toHaveFocus()

    screen.getByTestId('before').focus()
    await user.tab()

    expect(focusedItem()).toBe('fruit')
  })

  it('passes keyboard focus on after a press on the focused item', async () => {
    const user = userEvent.setup()

    render(<DynamicTree />)

    await user.click(screen.getByTestId('b'))
    expect(focusedItem()).toBe('b')

    // Focus does not move, so no focus event follows this press
    await user.click(screen.getByTestId('b'))
    expect(focusedItem()).toBe('b')

    await user.click(screen.getByTestId('remove-first'))
    expect(screen.queryByTestId('b')).toBeNull()

    await user.tab()
    expect(focusedItem()).toBe('c')
  })

  it('passes keyboard focus on after a press between the items while an item held the tab stop', async () => {
    const user = userEvent.setup()

    render(<DynamicTree />)

    const tree = screen.getByRole('tree')

    await user.click(screen.getByTestId('b'))
    expect(focusedItem()).toBe('b')
    expect(tree).not.toHaveAttribute('tabindex')

    // The tree element is not focusable now, so this press moves focus to nowhere in the tree
    await user.click(tree)
    expect(tree).not.toHaveFocus()
    expect(screen.getByTestId('b')).not.toHaveFocus()

    await user.click(screen.getByTestId('remove-first'))
    expect(screen.queryByTestId('b')).toBeNull()

    await user.tab()
    expect(focusedItem()).toBe('c')
  })

  it('starts on a `selected` item', async () => {
    const user = userEvent.setup()

    render(
      <>
        <button data-testid="before" type="button">
          Before
        </button>
        <Tree aria-label="Fruit">
          <TreeItem data-testid="oranges" text="Oranges" />
          <TreeItem data-testid="apples" selected text="Apples" />
        </Tree>
      </>,
    )

    const tree = screen.getByRole('tree')

    // The selected item is the tab stop from the start, without a focus event
    expect(tree).not.toHaveAttribute('tabindex')
    expect(screen.getByTestId('apples')).toHaveAttribute('tabindex', '0')
    expect(screen.getByTestId('oranges')).toHaveAttribute('tabindex', '-1')

    screen.getByTestId('before').focus()
    await user.tab()
    expect(focusedItem()).toBe('apples')
  })

  it('does not hand the tab stop to a `selected` item the consumer hid', async () => {
    const user = userEvent.setup()

    render(
      <>
        <button data-testid="before" type="button">
          Before
        </button>
        <Tree aria-label="Fruit">
          <TreeItem data-testid="oranges" text="Oranges" />
          <TreeItem data-testid="apples" hidden selected text="Apples" />
          <TreeItem data-testid="pears" selected style={{display: 'none'}} text="Pears" />
          <TreeItem data-testid="plums" inert selected text="Plums" />
        </Tree>
      </>,
    )

    const tree = screen.getByRole('tree')

    // A tab stop that sequential focus navigation skips would take the tree out of the tab
    // order, so the tree element keeps it
    expect(tree).toHaveAttribute('tabindex', '0')
    expect(screen.getByTestId('apples')).toHaveAttribute('tabindex', '-1')
    expect(screen.getByTestId('pears')).toHaveAttribute('tabindex', '-1')
    expect(screen.getByTestId('plums')).toHaveAttribute('tabindex', '-1')

    screen.getByTestId('before').focus()
    await user.tab()
    expect(focusedItem()).toBe('oranges')
  })

  it('takes the tab stop back while the focused item is inside a collapsed ancestor', async () => {
    const user = userEvent.setup()
    let treeContext: TreeContextValue | null = null

    render(
      <>
        <button data-testid="before" type="button">
          Before
        </button>
        <Tree aria-label="Fruit">
          <ExposeTree onChange={(tree) => (treeContext = tree)} />
          <TreeItem data-testid="apples" text="Apples">
            <TreeItem data-testid="fuji" selected text="Fuji" />
          </TreeItem>
          <TreeItem data-testid="pears" text="Pears" />
        </Tree>
      </>,
    )

    const tree = screen.getByRole('tree')
    const apples = screen.getByTestId('apples')
    const fuji = screen.getByTestId('fuji')
    const applesKey = apples.getAttribute('data-tree-key')!

    // A `selected` item inside a collapsed parent cannot hold the tab stop (sequential focus
    // navigation skips hidden elements), so the tree element keeps it
    expect(apples).toHaveAttribute('aria-expanded', 'false')
    expect(tree).toHaveAttribute('tabindex', '0')
    expect(fuji).toHaveAttribute('tabindex', '-1')

    // The item becomes the tab stop the moment its parent expands
    act(() => treeContext!.setExpanded(applesKey, true))
    expect(tree).not.toHaveAttribute('tabindex')
    expect(fuji).toHaveAttribute('tabindex', '0')

    // Collapsing the parent from outside the tree (a "collapse all" control) hands it back
    act(() => treeContext!.setExpanded(applesKey, false))
    expect(tree).toHaveAttribute('tabindex', '0')
    expect(fuji).toHaveAttribute('tabindex', '-1')

    screen.getByTestId('before').focus()
    await user.tab()
    expect(focusedItem()).toBe('apples')
  })

  it('stays the focused tree element while a remembered item becomes visible', async () => {
    const user = userEvent.setup()
    let treeContext: TreeContextValue | null = null

    render(
      <>
        <Tree aria-label="Fruit">
          <ExposeTree onChange={(tree) => (treeContext = tree)} />
          <TreeItem data-testid="apples" text="Apples">
            <TreeItem data-testid="fuji" selected text="Fuji" />
          </TreeItem>
          <TreeItem data-testid="pears" text="Pears" />
        </Tree>
        <button data-testid="after" type="button">
          After
        </button>
      </>,
    )

    const tree = screen.getByRole('tree')
    const fuji = screen.getByTestId('fuji')
    const applesKey = screen.getByTestId('apples').getAttribute('data-tree-key')!

    // A press between the items leaves focus on the tree element, the tab stop while the
    // `selected` item is inside its collapsed parent
    await user.click(tree)
    expect(tree).toHaveFocus()

    // Expanding the parent from outside the tree makes the item eligible, but taking the
    // `tabindex` off the focused tree element would not move focus off it: it stays the tab stop
    act(() => treeContext!.setExpanded(applesKey, true))
    expect(tree).toHaveFocus()
    expect(tree).toHaveAttribute('tabindex', '0')
    expect(fuji).toHaveAttribute('tabindex', '-1')
    expect(treeContext!.focusedElement).toBeNull()

    // So Tab leaves the tree in one step, as from any tab stop
    await user.tab()
    expect(screen.getByTestId('after')).toHaveFocus()

    // Once the tree element has lost focus, the remembered item is the tab stop
    expect(tree).not.toHaveAttribute('tabindex')
    expect(fuji).toHaveAttribute('tabindex', '0')
    expect(treeContext!.focusedElement).toBe(fuji)

    await user.tab({shift: true})
    expect(focusedItem()).toBe('fuji')
  })

  it('enters the items from the focused tree element, not from a remembered item', async () => {
    const user = userEvent.setup()
    let treeContext: TreeContextValue | null = null

    render(
      <Tree aria-label="Fruit">
        <ExposeTree onChange={(tree) => (treeContext = tree)} />
        <TreeItem data-testid="apples" text="Apples">
          <TreeItem data-testid="fuji" selected text="Fuji" />
        </TreeItem>
        <TreeItem data-testid="pears" text="Pears" />
      </Tree>,
    )

    const tree = screen.getByRole('tree')
    const applesKey = screen.getByTestId('apples').getAttribute('data-tree-key')!

    await user.click(tree)
    expect(tree).toHaveFocus()

    act(() => treeContext!.setExpanded(applesKey, true))
    expect(tree).toHaveFocus()

    // The keys act on the element that has focus: ArrowDown enters at the first item instead of
    // moving on from the `selected` item, which does not have focus
    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('apples')
    expect(screen.getByTestId('apples')).toHaveAttribute('tabindex', '0')
    expect(screen.getByTestId('fuji')).toHaveAttribute('tabindex', '-1')
    expect(tree).not.toHaveAttribute('tabindex')
  })

  it('keeps the tab stop on an item that re-registers under a new key', async () => {
    const user = userEvent.setup()

    function RekeyedTree() {
      const [id, setId] = useState('apples')

      return (
        <>
          <button data-testid="rekey" onClick={() => setId('pears')} type="button">
            Rename
          </button>
          <Tree aria-label="Fruit">
            <TreeItem data-testid="oranges" text="Oranges" />
            <TreeItem data-testid="renamed" id={id} text="Renamed" />
            <TreeItem data-testid="bananas" text="Bananas" />
          </Tree>
        </>
      )
    }

    render(<RekeyedTree />)

    const tree = screen.getByRole('tree')
    const renamed = screen.getByTestId('renamed')

    await user.click(renamed)
    expect(renamed).toHaveAttribute('data-tree-key', 'apples')
    expect(renamed).toHaveAttribute('tabindex', '0')

    // The same element registers under its new key; the tab stop follows it
    await user.click(screen.getByTestId('rekey'))
    expect(renamed).toHaveAttribute('data-tree-key', 'pears')
    expect(renamed).toHaveAttribute('tabindex', '0')
    expect(tree).not.toHaveAttribute('tabindex')

    renamed.focus()
    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('bananas')
  })

  it('keeps `id`s with slashes apart from the hierarchy', async () => {
    const user = userEvent.setup()

    render(
      <Tree aria-label="Docs">
        <TreeItem data-testid="docs" expanded id="docs/getting-started" text="Getting started">
          <TreeItem data-testid="install" id="docs/getting-started/install" text="Install" />
        </TreeItem>
        <TreeItem data-testid="api" id="api/reference" text="API reference" />
      </Tree>,
    )

    const tree = screen.getByRole('tree')

    // The slashes are escaped in the key, so the item is not taken for a child of `docs`
    expect(screen.getByTestId('docs')).toHaveAttribute('data-tree-key', 'docs%2Fgetting-started')

    await user.click(screen.getByTestId('docs'))
    expect(screen.getByTestId('docs')).toHaveAttribute('tabindex', '0')
    expect(tree).not.toHaveAttribute('tabindex')

    // Expanded again (the click collapsed it), the child is reachable and ArrowLeft finds the parent
    await user.keyboard('{ArrowRight}{ArrowDown}')
    expect(focusedItem()).toBe('install')

    await user.keyboard('{ArrowLeft}')
    expect(focusedItem()).toBe('docs')

    await user.keyboard('{End}')
    expect(focusedItem()).toBe('api')
  })

  it('calls a consumer `onMouseDown`', async () => {
    const user = userEvent.setup()
    const onMouseDown = vi.fn<(event: React.MouseEvent<HTMLUListElement>) => void>()

    render(<FruitTree onMouseDown={onMouseDown} />)

    await user.click(screen.getByTestId('oranges'))

    expect(onMouseDown).toHaveBeenCalledTimes(1)
    expect(onMouseDown.mock.calls[0][0].target).toBe(screen.getByTestId('oranges'))
  })

  it('exposes the tab stop as `focusedElement` of `useTree()`', async () => {
    const user = userEvent.setup()
    let treeContext: TreeContextValue | null = null

    render(
      <>
        <button data-testid="before" type="button">
          Before
        </button>
        <Tree aria-label="Fruit">
          <ExposeTree onChange={(tree) => (treeContext = tree)} />
          <TreeItem data-testid="oranges" text="Oranges" />
          <TreeItem data-testid="apples" text="Apples" />
        </Tree>
      </>,
    )

    // `null` until an item has been focused: the tree element is the tab stop
    expect(treeContext!.focusedElement).toBeNull()

    screen.getByTestId('before').focus()
    await user.tab()
    expect(treeContext!.focusedElement).toBe(screen.getByTestId('oranges'))

    // An element that is not a registered item does not become the tab stop
    act(() => treeContext!.setFocusedElement(screen.getByTestId('before')))
    expect(treeContext!.focusedElement).toBeNull()
    expect(screen.getByRole('tree')).toHaveAttribute('tabindex', '0')
  })

  it('lets a `tabIndex` prop keep the tree element out of the tab order', async () => {
    const user = userEvent.setup()

    render(
      <>
        <button data-testid="before" type="button">
          Before
        </button>
        <Tree tabIndex={-1}>
          <TreeItem data-testid="a" text="A" />
          <TreeItem data-testid="b" text="B" />
        </Tree>
        <button data-testid="after" type="button">
          After
        </button>
      </>,
    )

    const tree = screen.getByRole('tree')

    expect(tree).toHaveAttribute('tabindex', '-1')

    screen.getByTestId('before').focus()
    await user.tab()
    expect(screen.getByTestId('after')).toHaveFocus()

    // Once an item is the tab stop the tree element stays out of the tab order either way
    await user.click(screen.getByTestId('b'))
    expect(screen.getByTestId('b')).toHaveAttribute('tabindex', '0')
    expect(tree).not.toHaveAttribute('tabindex')
  })

  it('calls `onFocus` for the items, not for the tree element passing focus on', async () => {
    const user = userEvent.setup()
    const onFocus = vi.fn<(event: React.FocusEvent<HTMLUListElement>) => void>()

    render(<FruitTree onFocus={onFocus} />)

    screen.getByTestId('before').focus()
    await user.tab()

    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onFocus.mock.calls[0][0].target).toBe(screen.getByTestId('fruit'))

    await user.keyboard('{ArrowDown}')

    expect(onFocus).toHaveBeenCalledTimes(2)
    expect(onFocus.mock.calls[1][0].target).toBe(screen.getByTestId('oranges'))
  })

  it('calls `onFocus` when focus stays on the tree element', async () => {
    const user = userEvent.setup()
    const onFocus = vi.fn<(event: React.FocusEvent<HTMLUListElement>) => void>()

    render(<FruitTree onFocus={onFocus} />)

    const tree = screen.getByRole('tree')

    // A press between the items: the focus the consumer sees the `blur` of later
    await user.click(tree)
    expect(tree).toHaveFocus()

    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onFocus.mock.calls[0][0].target).toBe(tree)
  })

  it('keeps keyboard focus and calls `onFocus` when there is no item to pass it on to', async () => {
    const user = userEvent.setup()
    const onFocus = vi.fn<(event: React.FocusEvent<HTMLUListElement>) => void>()

    render(
      <>
        <button data-testid="before" type="button">
          Before
        </button>
        <Tree onFocus={onFocus} />
      </>,
    )

    const tree = screen.getByRole('tree')

    screen.getByTestId('before').focus()
    await user.tab()

    expect(tree).toHaveFocus()
    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onFocus.mock.calls[0][0].target).toBe(tree)

    await user.keyboard('{ArrowDown}{End}')
    expect(tree).toHaveFocus()
  })
})

describe('components/tree keyboard navigation', () => {
  it('moves between the visible items with ArrowDown and ArrowUp', async () => {
    const user = userEvent.setup()

    render(<FruitTree />)

    screen.getByTestId('before').focus()
    await user.tab()
    expect(focusedItem()).toBe('fruit')

    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('oranges')

    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('apples')

    // The items of the collapsed "Apples" and "Pears" are skipped
    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('pears')

    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('vegetables')

    // The last visible item stays focused
    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('vegetables')

    await user.keyboard('{ArrowUp}')
    expect(focusedItem()).toBe('pears')

    await user.keyboard('{ArrowUp}{ArrowUp}{ArrowUp}')
    expect(focusedItem()).toBe('fruit')

    // The first item stays focused
    await user.keyboard('{ArrowUp}')
    expect(focusedItem()).toBe('fruit')
  })

  it('expands with ArrowRight, collapses or moves to the parent with ArrowLeft', async () => {
    const user = userEvent.setup()

    render(<FruitTree />)

    const apples = screen.getByTestId('apples')

    screen.getByTestId('before').focus()
    await user.tab()
    await user.keyboard('{ArrowDown}{ArrowDown}')
    expect(focusedItem()).toBe('apples')
    expect(apples).toHaveAttribute('aria-expanded', 'false')

    await user.keyboard('{ArrowRight}')
    expect(apples).toHaveAttribute('aria-expanded', 'true')
    expect(focusedItem()).toBe('apples')

    // The children are reachable once the item is expanded
    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('macintosh')
    expect(document.activeElement).toHaveAttribute('href', '/apples/macintosh')

    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('fuji')

    // ArrowLeft on a collapsed item (or a leaf) moves to the parent
    await user.keyboard('{ArrowLeft}')
    expect(focusedItem()).toBe('apples')
    expect(apples).toHaveAttribute('aria-expanded', 'true')

    // ArrowLeft on an expanded item collapses it
    await user.keyboard('{ArrowLeft}')
    expect(apples).toHaveAttribute('aria-expanded', 'false')
    expect(focusedItem()).toBe('apples')

    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('pears')

    // ArrowLeft on a top-level item does nothing
    await user.keyboard('{ArrowLeft}{ArrowUp}{ArrowUp}{ArrowUp}{ArrowLeft}')
    expect(focusedItem()).toBe('fruit')
    expect(screen.getByTestId('fruit')).toHaveAttribute('aria-expanded', 'false')

    await user.keyboard('{ArrowLeft}')
    expect(focusedItem()).toBe('fruit')
  })

  it('moves to the first and last visible item with Home and End', async () => {
    const user = userEvent.setup()

    render(<FruitTree />)

    screen.getByTestId('before').focus()
    await user.tab()
    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('oranges')

    // "Carrots" is hidden inside the collapsed "Vegetables"
    await user.keyboard('{End}')
    expect(focusedItem()).toBe('vegetables')

    await user.keyboard('{ArrowRight}{End}')
    expect(focusedItem()).toBe('carrots')

    await user.keyboard('{Home}')
    expect(focusedItem()).toBe('fruit')
  })

  it('expands a link item and moves back onto its link with ArrowLeft', async () => {
    const user = userEvent.setup()

    render(
      <>
        <button data-testid="before" type="button">
          Before
        </button>
        <Tree>
          <TreeItem data-testid="docs" href="/docs" text="Docs">
            <TreeItem data-testid="intro" text="Intro" />
          </TreeItem>
          <TreeItem data-testid="blog" text="Blog" />
        </Tree>
      </>,
    )

    const docsLink = screen.getByTestId('docs').querySelector('a')!

    screen.getByTestId('before').focus()
    await user.tab()
    expect(docsLink).toHaveFocus()
    expect(docsLink).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByTestId('intro').closest('[data-ui="TreeGroup"]')).toHaveAttribute('hidden')

    await user.keyboard('{ArrowRight}')
    expect(docsLink).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByTestId('intro').closest('[data-ui="TreeGroup"]')).not.toHaveAttribute(
      'hidden',
    )

    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('intro')

    // The parent's registered element is its `<li role="none">`; focus goes to the link inside
    await user.keyboard('{ArrowLeft}')
    expect(docsLink).toHaveFocus()
    expect(docsLink).toHaveAttribute('tabindex', '0')

    await user.keyboard('{ArrowLeft}')
    expect(docsLink).toHaveAttribute('aria-expanded', 'false')
    expect(docsLink).toHaveFocus()
  })

  it('moves past an ancestor whose `linkAs` cannot take focus', async () => {
    const user = userEvent.setup()

    // A custom link component that drops `tabIndex` and `href`: nothing in it can take focus
    function Unfocusable(props: React.ComponentProps<'a'>) {
      return <span>{props.children}</span>
    }

    render(
      <Tree aria-label="Docs">
        <TreeItem data-testid="docs" expanded href="/docs" linkAs={Unfocusable} text="Docs">
          <TreeItem data-testid="intro" text="Intro" />
          <TreeItem data-testid="guide" text="Guide" />
        </TreeItem>
      </Tree>,
    )

    await user.click(screen.getByTestId('guide'))
    expect(focusedItem()).toBe('guide')

    // "Docs" is the first candidate but refuses focus; focus staying on a descendant must not
    // count as "Docs" being focused, or Home would stop there
    await user.keyboard('{Home}')
    expect(focusedItem()).toBe('intro')

    await user.keyboard('{ArrowUp}')
    expect(focusedItem()).toBe('intro')
  })

  it('stops at an item whose focus handler redirected focus', async () => {
    const user = userEvent.setup()

    render(
      <>
        <Tree aria-label="Fruit">
          <TreeItem data-testid="oranges" text="Oranges" />
          <TreeItem
            data-testid="apples"
            onFocus={() => screen.getByTestId('rename').focus()}
            text="Apples"
          />
          <TreeItem data-testid="pears" text="Pears" />
        </Tree>
        <input data-testid="rename" />
      </>,
    )

    await user.click(screen.getByTestId('oranges'))
    expect(focusedItem()).toBe('oranges')

    // Focus moved, but to where the consumer sent it: not a failed attempt to try again on the
    // next item
    await user.keyboard('{ArrowDown}')
    expect(screen.getByTestId('rename')).toHaveFocus()
    expect(screen.getByTestId('pears')).not.toHaveFocus()
  })

  it('keeps navigating from a link item that received focus directly', async () => {
    const user = userEvent.setup()

    render(<FruitTree />)

    screen.getByTestId('before').focus()
    await user.tab()
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowRight}{ArrowDown}')
    expect(focusedItem()).toBe('macintosh')

    // Leave the tree and come back onto the link itself
    await user.tab()
    expect(screen.getByTestId('after')).toHaveFocus()
    await user.tab({shift: true})
    expect(document.activeElement).toHaveAttribute('href', '/apples/macintosh')

    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('fuji')

    await user.keyboard('{ArrowUp}{ArrowLeft}')
    expect(focusedItem()).toBe('apples')
  })

  // A press between the items leaves focus on the tree element (see the tab stop tests); the
  // navigation keys enter the items from there, at the end that matches the key
  it.each([
    ['ArrowDown', 'fruit'],
    ['Home', 'fruit'],
    ['ArrowUp', 'vegetables'],
    ['End', 'vegetables'],
  ])('enters the items from the focused tree element with %s', async (key, id) => {
    const user = userEvent.setup()

    render(<FruitTree />)

    const tree = screen.getByRole('tree')

    await user.click(tree)
    expect(tree).toHaveFocus()

    await user.keyboard(`{${key}}`)

    expect(focusedItem()).toBe(id)
    expect(screen.getByTestId(id)).toHaveAttribute('tabindex', '0')
    expect(tree).not.toHaveAttribute('tabindex')
  })

  it('leaves keys typed into editable content inside an item alone', async () => {
    const user = userEvent.setup()

    render(
      <Tree aria-label="Fruit">
        <TreeItem data-testid="oranges" text={<input data-testid="rename" defaultValue="Or" />} />
        <TreeItem data-testid="apples" text="Apples" />
      </Tree>,
    )

    const input = screen.getByTestId('rename')

    await user.click(input)
    expect(input).toHaveFocus()

    for (const key of ['Home', 'End', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']) {
      // `fireEvent` returns `false` when a handler prevented the default action
      expect(fireEvent.keyDown(input, {key})).toBe(true)
      expect(input).toHaveFocus()
    }
  })

  it('leaves focus on the tree element for ArrowLeft and ArrowRight', async () => {
    const user = userEvent.setup()

    render(<FruitTree />)

    const tree = screen.getByRole('tree')

    await user.click(tree)
    expect(tree).toHaveFocus()

    await user.keyboard('{ArrowRight}{ArrowLeft}')

    expect(tree).toHaveFocus()
    expect(screen.getByTestId('fruit')).toHaveAttribute('tabindex', '-1')
  })
})

describe('components/tree dynamic items', () => {
  it('navigates items in their current document order', async () => {
    const user = userEvent.setup()

    render(<DynamicTree />)

    await user.click(screen.getByTestId('append'))
    await user.click(screen.getByTestId('prepend'))

    await user.click(screen.getByTestId('b'))
    expect(focusedItem()).toBe('b')

    await user.keyboard('{ArrowUp}')
    expect(focusedItem()).toBe('a')

    await user.keyboard('{End}')
    expect(focusedItem()).toBe('d')

    await user.keyboard('{ArrowUp}')
    expect(focusedItem()).toBe('c')
  })

  it('tabs onto an item that was added before the first one', async () => {
    const user = userEvent.setup()

    render(<DynamicTree />)

    await user.click(screen.getByTestId('prepend'))
    await user.click(screen.getByTestId('append'))

    expect(screen.getByRole('tree')).toHaveAttribute('tabindex', '0')

    screen.getByTestId('remove-first').focus()
    await user.tab()
    expect(focusedItem()).toBe('a')

    await user.keyboard('{End}')
    expect(focusedItem()).toBe('d')
  })

  it('takes the tab stop back when the focused item is removed', async () => {
    const user = userEvent.setup()

    render(<DynamicTree />)

    const tree = screen.getByRole('tree')

    await user.click(screen.getByTestId('b'))
    expect(screen.getByTestId('b')).toHaveAttribute('tabindex', '0')
    expect(tree).not.toHaveAttribute('tabindex')

    await user.click(screen.getByTestId('remove-first'))
    expect(screen.queryByTestId('b')).toBeNull()

    // The tree is reachable again and passes focus on to the item that is now first
    expect(tree).toHaveAttribute('tabindex', '0')
    expect(screen.getByTestId('c')).toHaveAttribute('tabindex', '-1')

    await user.tab()
    expect(focusedItem()).toBe('c')
    expect(screen.getByTestId('c')).toHaveAttribute('tabindex', '0')
    expect(tree).not.toHaveAttribute('tabindex')
  })
})

describe('components/tree in another document', () => {
  it('navigates a tree rendered into an iframe', () => {
    const iframe = document.createElement('iframe')

    document.body.appendChild(iframe)

    const frameDocument = iframe.contentDocument!

    // The frame's elements are instances of its own constructors, not of this realm's, so an
    // `instanceof HTMLElement` or `instanceof Document` check does not recognise them
    expect(frameDocument.body instanceof HTMLElement).toBe(false)
    expect(frameDocument instanceof Document).toBe(false)

    render(
      createPortal(
        <Tree aria-label="Fruit">
          <TreeItem data-testid="oranges" text="Oranges" />
          <TreeItem data-testid="macintosh" href="/apples/macintosh" text="Macintosh" />
          <TreeItem data-testid="fuji" text={<input data-testid="rename" defaultValue="Fuji" />} />
          <TreeItem data-testid="pears" text="Pears" />
        </Tree>,
        frameDocument.body,
      ),
    )

    const byTestId = (id: string) =>
      frameDocument.querySelector<HTMLElement>(`[data-testid="${id}"]`)!
    const focusedFrameItem = () =>
      frameDocument.activeElement?.closest('[data-testid]')?.getAttribute('data-testid')

    act(() => byTestId('oranges').focus())
    expect(focusedFrameItem()).toBe('oranges')
    expect(byTestId('oranges')).toHaveAttribute('tabindex', '0')

    // The link item takes focus (its link is recognised as an element), and the search stops
    // there (the frame document's active element is recognised as such) instead of running on to
    // the last candidate
    fireEvent.keyDown(byTestId('oranges'), {key: 'ArrowDown'})
    expect(focusedFrameItem()).toBe('macintosh')
    expect(frameDocument.activeElement).toHaveAttribute('href', '/apples/macintosh')

    fireEvent.keyDown(frameDocument.activeElement!, {key: 'ArrowDown'})
    expect(focusedFrameItem()).toBe('fuji')

    // Keys typed into editable content are left alone here too
    act(() => byTestId('rename').focus())
    expect(fireEvent.keyDown(byTestId('rename'), {key: 'ArrowDown'})).toBe(true)
    expect(frameDocument.activeElement).toBe(byTestId('rename'))

    // A click on an item records it as the tab stop
    fireEvent.click(byTestId('pears'))
    expect(byTestId('pears')).toHaveAttribute('tabindex', '0')
    expect(byTestId('fuji')).toHaveAttribute('tabindex', '-1')

    iframe.remove()
  })
})
