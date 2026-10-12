import {ThemeProvider, Tree, TreeItem} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {userEvent} from 'vitest/browser'

const theme = buildTheme()

function focusedTestId() {
  return document.activeElement?.closest('[data-testid]')?.getAttribute('data-testid') ?? null
}

function renderTree() {
  return render(
    <ThemeProvider theme={theme}>
      <button data-testid="before" type="button">
        Before
      </button>
      <Tree style={{padding: 40}}>
        <TreeItem data-testid="a" hidden text="A" />
        <TreeItem data-testid="b" text="B">
          <TreeItem data-testid="b1" text="B1" />
        </TreeItem>
        <TreeItem data-testid="c" href="#c" text="C" />
      </Tree>
      <button data-testid="after" type="button">
        After
      </button>
    </ThemeProvider>,
  )
}

// Native sequential focus navigation and the default action of a press, which jsdom only emulates
describe('Components/Tree', () => {
  test('is a single tab stop', async () => {
    await renderTree()

    document.querySelector<HTMLElement>('[data-testid="before"]')!.focus()
    await userEvent.tab()
    await expect.poll(focusedTestId).toBe('b')

    await userEvent.keyboard('{ArrowDown}')
    await expect.poll(focusedTestId).toBe('c')

    await userEvent.tab()
    await expect.poll(focusedTestId).toBe('after')

    await userEvent.tab({shift: true})
    await expect.poll(focusedTestId).toBe('c')

    await userEvent.keyboard('{ArrowUp}')
    await expect.poll(focusedTestId).toBe('b')
  })

  test('does not move focus when pressed between the items', async () => {
    await renderTree()

    const before = document.querySelector<HTMLElement>('[data-testid="before"]')!

    before.focus()
    await userEvent.click(document.querySelector('[role="tree"]')!, {position: {x: 10, y: 10}})
    expect(document.activeElement).toBe(before)
  })
})
