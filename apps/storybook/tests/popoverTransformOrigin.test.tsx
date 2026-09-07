import {composeStories} from '@storybook/react-vite'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {userEvent} from 'vitest/browser'

import * as menuButtonStories from '../stories/components/MenuButton.stories'
import * as tooltipStories from '../stories/primitives/Tooltip.stories'

const {AnimatedPopover} = composeStories(menuButtonStories)
const {Animated: AnimatedTooltip} = composeStories(tooltipStories)

const POLL = {timeout: 5000}

function inlineStyle(selector: string): CSSStyleDeclaration | undefined {
  return document.querySelector<HTMLElement>(selector)?.style
}

// Animated popovers and tooltips stay mounted while closed (hidden by
// `Activity`), so motion re-mounts the same element every time they open and
// resets its motion values to their initial state. The `transform-origin`
// computed by the `origin` middleware must survive that, or every open after
// the first scales from the center instead of the reference element.
describe('animated popover transform-origin', () => {
  test('MenuButton popover keeps its transform-origin when re-opened', async () => {
    const screen = await render(<AnimatedPopover />)
    const button = screen.getByRole('button', {name: 'Open'})
    const popover = '[data-ui="MenuButton__popover"]'

    await userEvent.click(button)
    await expect.poll(() => inlineStyle(popover)?.opacity, POLL).toBe('1')
    const origin = inlineStyle(popover)!.transformOrigin
    expect(origin).toMatch(/^\S+ 0%/)

    await userEvent.keyboard('{Escape}')
    await expect.poll(() => inlineStyle(popover)?.display, POLL).toBe('none')

    await userEvent.click(button)
    await expect.poll(() => inlineStyle(popover)?.display, POLL).toBe('')
    expect(inlineStyle(popover)!.transformOrigin).toBe(origin)
    await expect.poll(() => inlineStyle(popover)?.opacity, POLL).toBe('1')
    expect(inlineStyle(popover)!.transformOrigin).toBe(origin)
  })

  test('Tooltip keeps its transform-origin when re-shown', async () => {
    const screen = await render(<AnimatedTooltip />)
    const button = screen.getByRole('button', {name: 'Hover me'})
    const tooltip = '[data-ui="Tooltip__card"]'
    // `Activity` hides the outer `Layer`, motion animates the card inside it
    const layerStyle = () => document.querySelector<HTMLElement>(tooltip)?.parentElement?.style

    await userEvent.hover(button)
    await expect.poll(() => inlineStyle(tooltip)?.opacity, POLL).toBe('1')
    const origin = inlineStyle(tooltip)!.transformOrigin
    expect(origin).toMatch(/^\S+ 0%/)

    await userEvent.unhover(button)
    await expect.poll(() => layerStyle()?.display, POLL).toBe('none')

    await userEvent.hover(button)
    await expect.poll(() => layerStyle()?.display, POLL).toBe('')
    expect(inlineStyle(tooltip)!.transformOrigin).toBe(origin)
    await expect.poll(() => inlineStyle(tooltip)?.opacity, POLL).toBe('1')
    expect(inlineStyle(tooltip)!.transformOrigin).toBe(origin)
  })
})
