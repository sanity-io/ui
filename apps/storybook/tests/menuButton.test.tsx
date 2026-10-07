import {composeStories} from '@storybook/react-vite'
import {Profiler} from 'react'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {page, userEvent} from 'vitest/browser'

import * as menuButtonStories from '../stories/components/MenuButton.stories'

const {KeyboardNavigation} = composeStories(menuButtonStories)

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

/**
 * The popover card's inline `display` at every commit of the story: `''` shown, `none` hidden
 * (the pre-render on intent), or not rendered at all
 */
let commitDisplays: string[] = []

function recordCommit() {
  commitDisplays.push(card()?.style.display ?? 'not rendered')
}

function button() {
  return document.getElementById('menu-button')!
}

function card() {
  return document.querySelector<HTMLElement>('[data-ui="MenuButton__popover"]')
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

const OPEN = {expanded: 'true', menuVisible: true}
const CLOSED = {expanded: 'false', menuVisible: false}

/**
 * Renders the story with the pointer parked on an element rendered above it first. A pointer left
 * over the menu button by an earlier test would otherwise count as intent the moment the button
 * mounts under it (the browser dispatches a `pointerenter` for an element appearing under a
 * resting pointer), and pre-render the menu before the test begins.
 */
async function renderStory() {
  await render(
    <button id="park" type="button">
      park
    </button>,
  )
  await userEvent.hover(page.getByRole('button', {name: 'park'}))
  await render(
    <Profiler id="menu-button" onRender={recordCommit}>
      <KeyboardNavigation />
    </Profiler>,
  )
  expect(card()).toBeNull()
  commitDisplays = []
}

/** The pointer enters the button, which is intent to open the menu, and the hidden pre-render commits */
async function hoverUntilPreRendered() {
  await userEvent.hover(page.getByRole('button', {name: 'Open'}))
  await expect.poll(() => card()).not.toBeNull()
  expect(readFrame()).toEqual(CLOSED)
}

/** Intent to open the menu, dispatched without the pointer so the test stays in the same task */
function dispatchIntent() {
  button().dispatchEvent(new PointerEvent('pointerenter'))
}

/** A synchronous click, so that no pointer or focus styling is part of the frame being measured */
function clickToOpen() {
  button().click()
}

/** ArrowDown on the focused button: opens the menu and asks it to focus its first item */
function pressArrowDownToOpen() {
  button().focus()
  button().dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key: 'ArrowDown'}))
}

describe('Components/MenuButton', () => {
  // `MenuButton` updates its open state in a transition, so that an open arriving while `Popover`
  // is still pre-rendering the hidden menu (a transition it starts on intent) continues that
  // render instead of rendering the menu synchronously in the event. These tests open the menu
  // in the three situations that gives. Where they read the DOM in the next animation frame
  // callback, which runs before that frame is painted, they assert what the user sees first.
  describe('opening in a transition', () => {
    // The pre-render has committed: the hidden menu is in the DOM when the open arrives, and the
    // open only has to reveal it, which reaches the first painted frame (measured 160 of 160
    // opens in headless chromium)
    describe('after the pre-render on intent has committed', () => {
      test('a click shows the menu in the first painted frame', async () => {
        await renderStory()
        await hoverUntilPreRendered()

        clickToOpen()
        await nextFrame()

        expect(readFrame()).toEqual(OPEN)
      })

      test('ArrowDown shows the menu in the first painted frame, then focuses the first item', async () => {
        await renderStory()
        await hoverUntilPreRendered()

        pressArrowDownToOpen()
        await nextFrame()

        expect(readFrame()).toEqual(OPEN)
        // The focus request made by the key press is applied once the menu is rendered open
        await expect.poll(() => document.activeElement?.id).toBe('menu-item-1')
      })
    })

    /** The card's `display` at the first commit that rendered it */
    function firstRenderedDisplay() {
      return commitDisplays.find((display) => display !== 'not rendered')
    }

    // Intent and open arrive in the same task, so the pre-render transition that the intent
    // started has not committed when the open does: there is no popover in the DOM yet. Both are
    // transitions of the same event, so the menu renders in one commit, shown, rather than being
    // committed hidden first and revealed after. Nothing is pre-rendered when the open arrives,
    // so the content renders inside the transition that opens the menu; the browser is free to
    // paint before that render is done, and the first painted frame is not guaranteed to show the
    // menu (it did in 118 of 120 opens of this menu in headless chromium), so these poll
    describe('while the pre-render on intent is still pending', () => {
      test('a click opens the menu in one commit, never committed hidden', async () => {
        await renderStory()

        dispatchIntent()
        expect(card()).toBeNull()
        clickToOpen()

        await expect.poll(readFrame).toEqual(OPEN)
        expect(firstRenderedDisplay()).toBe('')
        expect(commitDisplays).not.toContain('none')
      })

      test('ArrowDown opens the menu, never committed hidden, then focuses the first item', async () => {
        await renderStory()

        dispatchIntent()
        expect(card()).toBeNull()
        pressArrowDownToOpen()

        await expect.poll(readFrame).toEqual(OPEN)
        expect(firstRenderedDisplay()).toBe('')
        expect(commitDisplays).not.toContain('none')
        await expect.poll(() => document.activeElement?.id).toBe('menu-item-1')
      })
    })

    // No intent at all: the menu renders when it opens, inside the transition. As above, the
    // first painted frame is not guaranteed to show it (118 of 120 opens did), so this polls
    describe('without intent', () => {
      test('a click opens the menu in one commit, never committed hidden', async () => {
        await renderStory()

        clickToOpen()

        await expect.poll(readFrame).toEqual(OPEN)
        expect(firstRenderedDisplay()).toBe('')
        expect(commitDisplays).not.toContain('none')
      })
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
