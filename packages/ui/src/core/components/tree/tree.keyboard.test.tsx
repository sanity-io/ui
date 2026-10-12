/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {useState} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {buildTheme} from '../../../theme/build/buildTheme'
import {ThemeProvider} from '../../theme/themeProvider'
import {Tree} from './tree'
import {TreeItem} from './treeItem'

function focusedItem() {
  return document.activeElement?.closest('[data-testid]')?.getAttribute('data-testid')
}

function FruitTree(props: Omit<React.ComponentProps<typeof Tree>, 'children'>) {
  return (
    <>
      <button data-testid="before" type="button">
        Before
      </button>
      <Tree {...props}>
        <TreeItem data-testid="fruit" expanded text="Fruit">
          <TreeItem data-testid="oranges" text="Oranges" />
          <TreeItem data-testid="apples" href="#apples" text="Apples" />
          <TreeItem data-testid="pears" text="Pears">
            <TreeItem data-testid="anjou" text="Anjou" />
          </TreeItem>
        </TreeItem>
        <TreeItem data-testid="vegetables" text="Vegetables" />
      </Tree>
      <button data-testid="after" type="button">
        After
      </button>
    </>
  )
}

describe('components/tree tab stop', () => {
  it('is the tree element until an item is focused, then that item', async () => {
    const user = userEvent.setup()
    const onFocus = vi.fn()

    render(<FruitTree onFocus={onFocus} />)

    const tree = screen.getByRole('tree')

    expect(tree).toHaveAttribute('tabindex', '0')
    expect(screen.getByTestId('fruit')).toHaveAttribute('tabindex', '-1')

    screen.getByTestId('before').focus()
    await user.tab()

    expect(focusedItem()).toBe('fruit')
    expect(tree).not.toHaveAttribute('tabindex')
    expect(screen.getByTestId('fruit')).toHaveAttribute('tabindex', '0')
    expect(onFocus).toHaveBeenCalledOnce()
    expect(onFocus.mock.calls[0][0].target).toBe(screen.getByTestId('fruit'))

    await user.tab()
    expect(focusedItem()).toBe('after')

    await user.tab({shift: true})
    expect(focusedItem()).toBe('fruit')
  })

  it('is the server-rendered tree element', () => {
    const container = document.createElement('div')

    container.innerHTML = renderToStaticMarkup(
      <ThemeProvider theme={buildTheme()}>
        <Tree>
          <TreeItem text="Item" />
        </Tree>
      </ThemeProvider>,
    )

    expect(container.querySelector('[role="tree"]')).toHaveAttribute('tabindex', '0')
  })

  it('is a `selected` item', () => {
    render(
      <Tree>
        <TreeItem data-testid="a" text="A" />
        <TreeItem data-testid="b" selected text="B" />
      </Tree>,
    )

    expect(screen.getByRole('tree')).not.toHaveAttribute('tabindex')
    expect(screen.getByTestId('b')).toHaveAttribute('tabindex', '0')
  })

  it('returns to the tree element when the focused item unmounts', async () => {
    const user = userEvent.setup()

    function Letters() {
      const [letters, setLetters] = useState(['a', 'b'])

      return (
        <>
          <button data-testid="remove" onClick={() => setLetters(['b'])} type="button">
            Remove A
          </button>
          <Tree>
            {letters.map((letter) => (
              <TreeItem data-testid={letter} key={letter} text={letter} />
            ))}
          </Tree>
        </>
      )
    }

    render(<Letters />)

    await user.click(screen.getByTestId('a'))
    await user.click(screen.getByTestId('remove'))
    expect(screen.getByRole('tree')).toHaveAttribute('tabindex', '0')

    await user.tab()
    expect(focusedItem()).toBe('b')
  })

  it('keeps focus on the tree element when there is no item to pass it on to', async () => {
    const user = userEvent.setup()
    const onFocus = vi.fn()

    render(<Tree onFocus={onFocus} />)

    await user.tab()
    expect(screen.getByRole('tree')).toHaveFocus()
    expect(onFocus).toHaveBeenCalledOnce()
  })

  it('is not focused by a press between the items', () => {
    const onMouseDown = vi.fn()

    render(<FruitTree onMouseDown={onMouseDown} />)

    // `false` means the default action, focusing the tree element, was prevented
    expect(fireEvent.mouseDown(screen.getByRole('tree'))).toBe(false)
    expect(fireEvent.mouseDown(screen.getByTestId('oranges'))).toBe(true)
    expect(onMouseDown).toHaveBeenCalledTimes(2)
  })
})

describe('components/tree keyboard navigation', () => {
  it('moves through the visible items', async () => {
    const user = userEvent.setup()

    render(<FruitTree />)

    screen.getByTestId('before').focus()
    await user.tab()
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}')
    expect(focusedItem()).toBe('vegetables')

    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('vegetables')

    await user.keyboard('{ArrowUp}{ArrowRight}{ArrowDown}')
    expect(focusedItem()).toBe('anjou')

    await user.keyboard('{ArrowLeft}')
    expect(focusedItem()).toBe('pears')

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByTestId('pears')).toHaveAttribute('aria-expanded', 'false')
  })

  it('moves on from an item with an `href` that is tabbed back onto', async () => {
    const user = userEvent.setup()

    render(<FruitTree />)

    screen.getByTestId('before').focus()
    await user.tab()
    await user.keyboard('{ArrowDown}{ArrowDown}')
    await user.tab()
    await user.tab({shift: true})
    expect(document.activeElement).toHaveAttribute('href', '#apples')

    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('pears')
  })

  it('moves to items that mount without the tree re-rendering', async () => {
    const user = userEvent.setup()

    function Letters() {
      const [more, setMore] = useState(false)

      return (
        <>
          <TreeItem data-testid="a" onClick={() => setMore(true)} text="A" />
          {more && <TreeItem data-testid="b" text="B" />}
        </>
      )
    }

    render(
      <Tree>
        <Letters />
      </Tree>,
    )

    await user.click(screen.getByTestId('a'))
    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('b')
  })

  it('skips items that cannot take focus', async () => {
    const user = userEvent.setup()

    render(
      <Tree>
        <TreeItem data-testid="a" hidden text="A" />
        <TreeItem data-testid="b" text="B" />
        <TreeItem data-testid="c" hidden text="C" />
        <TreeItem data-testid="d" text="D" />
      </Tree>,
    )

    await user.tab()
    expect(focusedItem()).toBe('b')

    await user.keyboard('{ArrowDown}')
    expect(focusedItem()).toBe('d')
  })

  it('leaves keys pressed in content inside an item to that content', () => {
    const onClick = vi.fn()

    render(
      <Tree>
        <TreeItem data-testid="a" onClick={onClick} text={<input data-testid="input" />} />
        <TreeItem text="B" />
      </Tree>,
    )

    const input = screen.getByTestId('input')

    act(() => input.focus())
    expect(screen.getByTestId('a')).toHaveAttribute('tabindex', '0')

    // `true` means the default action, moving the caret, was not prevented
    expect(fireEvent.keyDown(input, {key: 'ArrowDown'})).toBe(true)
    expect(fireEvent.keyDown(input, {key: 'Enter'})).toBe(true)
    expect(input).toHaveFocus()
    expect(onClick).not.toHaveBeenCalled()
  })
})
