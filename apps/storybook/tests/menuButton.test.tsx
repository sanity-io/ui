import {Button, Card, ThemeProvider} from '@sanity/ui'
import {Menu, MenuButton, MenuItem} from '@sanity/ui/menu'
import {buildTheme} from '@sanity/ui/theme'
import {composeStories} from '@storybook/react-vite'
import {describe, expect, test, vi} from 'vitest'
import {render} from 'vitest-browser-react'
import {userEvent} from 'vitest/browser'

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
