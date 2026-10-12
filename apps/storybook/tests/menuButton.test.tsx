import {Button, Card, ThemeProvider} from '@sanity/ui'
import {Menu, MenuButton, MenuItem} from '@sanity/ui/menu'
import {buildTheme} from '@sanity/ui/theme'
import {composeStories} from '@storybook/react-vite'
import {Profiler, useState} from 'react'
import {describe, expect, test, vi} from 'vitest'
import {render} from 'vitest-browser-react'
import {page, userEvent} from 'vitest/browser'

import * as menuButtonStories from '../stories/components/MenuButton.stories'

const {KeyboardNavigation} = composeStories(menuButtonStories)

const theme = buildTheme()

function button() {
  return document.getElementById('menu-button')!
}

function menu() {
  return document.querySelector<HTMLElement>('[role="menu"]')
}

/** Whether the button reports the menu open and the menu is visible */
function readFrame() {
  return {
    expanded: button().getAttribute('aria-expanded'),
    menuVisible: Boolean(menu()?.checkVisibility()),
  }
}

const OPEN = {expanded: 'true', menuVisible: true}
const CLOSED = {expanded: 'false', menuVisible: false}

describe('Components/MenuButton', () => {
  // Closing from a menu item click, with the trusted events a user produces. React dispatches
  // the capture and bubble phases of a trusted click from separate native listeners, with a
  // microtask checkpoint between them, an ordering `fireEvent` cannot reproduce, so the
  // coordination between the item click and the blur it may cause is asserted here.
  describe('closing from a menu item click', () => {
    function ItemClickHarness(props: {onClose: () => void; onItemClick: () => void}) {
      return (
        <ThemeProvider scheme="light" theme={theme}>
          <Card padding={4}>
            <MenuButton
              button={<Button text="Open" />}
              id="menu-button"
              menu={
                <Menu>
                  <MenuItem onClick={props.onItemClick} text="Item" />
                </Menu>
              }
              onClose={props.onClose}
            />
            <button id="outside" type="button">
              Outside
            </button>
          </Card>
        </ThemeProvider>
      )
    }

    test('returns focus to the button before onClose when the item’s own click handler moved focus out of the menu', async () => {
      const focusedWhenCalled: (Element | null)[] = []
      const onClose = vi.fn(() => {
        focusedWhenCalled.push(document.activeElement)
      })

      await render(
        <ItemClickHarness
          onClose={onClose}
          onItemClick={() => document.getElementById('outside')!.focus()}
        />,
      )

      await userEvent.click(page.getByRole('button', {name: 'Open'}))
      await expect.element(page.getByRole('menuitem', {name: 'Item'})).toBeVisible()

      await userEvent.click(page.getByRole('menuitem', {name: 'Item'}))

      await expect.poll(() => onClose.mock.calls.length).toBe(1)
      expect(focusedWhenCalled).toEqual([button()])
      expect(document.activeElement).toBe(button())
      await expect.poll(readFrame).toEqual(CLOSED)
    })

    // The common item: `onClick={() => setSomething(true)}`, opening a dialog or a panel. The
    // close is a synchronous update so that it commits with that state, instead of the new UI
    // being painted under the still-open menu until a transition lands.
    test('commits the close together with state the item’s click handler set', async () => {
      const commits: {dialog: boolean; menuVisible: boolean}[] = []

      function recordDialogCommit() {
        commits.push({
          dialog: document.getElementById('dialog') !== null,
          menuVisible: Boolean(menu()?.checkVisibility()),
        })
      }

      function DialogFromItem() {
        const [dialogOpen, setDialogOpen] = useState(false)

        return (
          <ThemeProvider scheme="light" theme={theme}>
            <Card padding={4}>
              <Profiler id="dialog-from-item" onRender={recordDialogCommit}>
                <MenuButton
                  button={<Button text="Open" />}
                  id="menu-button"
                  menu={
                    <Menu>
                      <MenuItem onClick={() => setDialogOpen(true)} text="Item" />
                    </Menu>
                  }
                />
                {dialogOpen && <div id="dialog">Dialog</div>}
              </Profiler>
            </Card>
          </ThemeProvider>
        )
      }

      await render(<DialogFromItem />)

      await userEvent.click(page.getByRole('button', {name: 'Open'}))
      await expect.element(page.getByRole('menuitem', {name: 'Item'})).toBeVisible()

      await userEvent.click(page.getByRole('menuitem', {name: 'Item'}))

      await expect.poll(() => document.getElementById('dialog')).not.toBeNull()
      await expect.poll(readFrame).toEqual(CLOSED)
      // No commit (and so no painted frame) had the dialog with the menu still showing
      expect(commits.filter((commit) => commit.dialog && commit.menuVisible)).toEqual([])
      expect(commits.some((commit) => commit.dialog && !commit.menuVisible)).toBe(true)
    })
  })

  // The browser activates a button on Enter and Space by synthesizing a click, a default action
  // `MenuButton` prevents when it handles those keys, which `fireEvent` cannot reproduce
  describe('handlers on the button element', () => {
    test('onClick on the button does not run for a keyboard open, and runs for a programmatic click', async () => {
      const onButtonClick = vi.fn()

      await render(
        <ThemeProvider scheme="light" theme={theme}>
          <Card padding={4}>
            <MenuButton
              button={<Button onClick={onButtonClick} text="Open" />}
              id="menu-button"
              menu={
                <Menu>
                  <MenuItem text="Item" />
                </Menu>
              }
            />
          </Card>
        </ThemeProvider>,
      )

      /** Opens the menu with a key press on the focused button, then closes it with Escape */
      async function openWithKeyThenClose(key: string) {
        button().focus()
        await userEvent.keyboard(key)

        await expect.poll(readFrame).toEqual(OPEN)
        expect(onButtonClick).not.toHaveBeenCalled()

        await userEvent.keyboard('{Escape}')
        await expect.poll(readFrame).toEqual(CLOSED)
      }

      await openWithKeyThenClose('{Enter}')
      await openWithKeyThenClose(' ')

      button().click()

      await expect.poll(readFrame).toEqual(OPEN)
      expect(onButtonClick).toHaveBeenCalledTimes(1)
    })
  })

  // These scenarios rely on the browser's native tab behavior (the menu moves
  // focus back to the button on tab, and the key press then moves it onwards),
  // so they use real key presses instead of a story `play` function
  test('should close on tab', async () => {
    await render(<KeyboardNavigation />)

    document.getElementById('menu-button')!.focus()
    await userEvent.keyboard('{ArrowDown}')
    await expect.poll(() => document.activeElement?.id).toBe('menu-item-1')

    await userEvent.tab()
    await expect
      .poll(() => document.getElementById('menu-button')?.getAttribute('aria-expanded'))
      .toBe('false')
    await expect.poll(() => document.activeElement?.id).toBe('next-button')
  })

  test('should close on shift + tab', async () => {
    await render(<KeyboardNavigation />)

    document.getElementById('menu-button')!.focus()
    await userEvent.keyboard('{ArrowDown}')
    await expect.poll(() => document.activeElement?.id).toBe('menu-item-1')

    await userEvent.tab({shift: true})
    await expect
      .poll(() => document.getElementById('menu-button')?.getAttribute('aria-expanded'))
      .toBe('false')
    await expect.poll(() => document.activeElement?.id).toBe('prev-button')
  })
})
