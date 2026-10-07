import {composeStories} from '@storybook/react-vite'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {page, userEvent} from 'vitest/browser'

import * as menuButtonStories from '../stories/components/MenuButton.stories'

const {KeyboardNavigation} = composeStories(menuButtonStories)

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

function button() {
  return document.getElementById('menu-button')!
}

function menu() {
  return document.querySelector<HTMLElement>('[role="menu"]')
}

/** What the user sees first: the DOM as of the next animation frame callback, before it is painted */
function readFrame() {
  return {
    expanded: button().getAttribute('aria-expanded'),
    menuVisible: Boolean(menu()?.checkVisibility()),
  }
}

/** Pre-renders the hidden menu: the pointer entering the button is intent to open it */
async function showIntent() {
  await userEvent.hover(page.getByRole('button', {name: 'Open'}))
  await expect.poll(() => document.querySelector('[data-ui="MenuButton__popover"]')).not.toBeNull()
  expect(readFrame()).toEqual({expanded: 'false', menuVisible: false})
}

// These scenarios rely on the browser's native tab behavior (the menu moves
// focus back to the button on tab, and the key press then moves it onwards),
// so they use real key presses instead of a story `play` function
describe('Components/MenuButton', () => {
  // `MenuButton` opens in a transition, so that an open arriving while the pre-render on intent
  // is still in progress continues it instead of rendering the menu synchronously. The open must
  // still reach the first frame painted after the interaction. A synchronous `click()` /
  // dispatched key press keeps pointer and focus styling out of the frame being measured.
  describe('first painted frame after intent', () => {
    test('shows the menu when the button is clicked', async () => {
      await render(<KeyboardNavigation />)
      await showIntent()

      button().click()
      await nextFrame()

      expect(readFrame()).toEqual({expanded: 'true', menuVisible: true})
    })

    test('shows the menu when a key press opens it, then focuses the requested item', async () => {
      await render(<KeyboardNavigation />)
      await showIntent()

      button().focus()
      button().dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key: 'ArrowDown'}))
      await nextFrame()

      expect(readFrame()).toEqual({expanded: 'true', menuVisible: true})

      // The focus request made by the key press is applied once the menu is rendered open
      await expect.poll(() => document.activeElement?.id).toBe('menu-item-1')
    })
  })

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
