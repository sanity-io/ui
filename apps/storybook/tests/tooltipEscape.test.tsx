import {composeStories} from '@storybook/react-vite'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {userEvent} from 'vitest/browser'

import * as tooltipStories from '../stories/primitives/Tooltip.stories'

const {Default} = composeStories(tooltipStories)

const POLL = {timeout: 5000}

// A closed tooltip stays mounted inside a hidden `Activity` boundary, which
// hides the `Layer` wrapping the card rather than unmounting it.
function layerDisplay(): string | undefined {
  return document.querySelector<HTMLElement>('[data-ui="Tooltip__card"]')?.parentElement?.style
    .display
}

// The window `keydown` listener that closes the tooltip only runs while the
// tooltip is open, so a listener that is detached and never reattached leaves
// Escape dead. jsdom cannot tell the two apart, because `fireEvent` dispatches
// straight at the window.
describe('tooltip escape key', () => {
  test('Escape closes the tooltip while the pointer stays on the trigger', async () => {
    const screen = await render(<Default delay={0} />)
    const button = screen.getByRole('button', {name: 'Hover me'})

    await userEvent.hover(button)
    await expect.poll(layerDisplay, POLL).toBe('')

    await userEvent.keyboard('{Escape}')
    await expect.poll(layerDisplay, POLL).toBe('none')

    // Escape dismisses the tooltip for as long as the pointer stays put, so
    // reopening it takes a fresh `mouseenter`.
    await userEvent.unhover(button)
    await userEvent.hover(button)
    await expect.poll(layerDisplay, POLL).toBe('')

    await userEvent.keyboard('{Escape}')
    await expect.poll(layerDisplay, POLL).toBe('none')
  })

  test('Escape still closes the tooltip after `delay` changes while it is open', async () => {
    const screen = await render(<Default delay={0} />)
    const button = screen.getByRole('button', {name: 'Hover me'})

    await userEvent.hover(button)
    await expect.poll(layerDisplay, POLL).toBe('')

    // `delay` resolves into the open and close delays that `handleIsOpenChange`
    // closes over, so changing it changes that callback's identity with the
    // tooltip still open.
    await screen.rerender(<Default delay={1} />)
    await expect.poll(layerDisplay, POLL).toBe('')

    await userEvent.keyboard('{Escape}')
    await expect.poll(layerDisplay, POLL).toBe('none')
  })
})
