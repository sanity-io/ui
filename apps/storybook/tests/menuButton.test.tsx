import {composeStories} from '@storybook/react-vite'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {userEvent} from 'vitest/browser'

import * as menuButtonStories from '../stories/components/MenuButton.stories'

const {KeyboardNavigation} = composeStories(menuButtonStories)

// These scenarios rely on the browser's native tab behavior (the menu moves
// focus back to the button on tab, and the key press then moves it onwards),
// so they use real key presses instead of a story `play` function
describe('Components/MenuButton', () => {
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
