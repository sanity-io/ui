import {Card, LayerProvider, ThemeProvider} from '@sanity/ui'
import {Menu, MenuGroup, MenuItem} from '@sanity/ui/menu'
import {buildTheme} from '@sanity/ui/theme'
import {composeStories} from '@storybook/react-vite'
import {use} from 'react'
import {describe, expect, test} from 'vitest'
import {render} from 'vitest-browser-react'
import {page, userEvent} from 'vitest/browser'

import * as menuButtonStories from '../stories/components/MenuButton.stories'

const {WithMenuGroup} = composeStories(menuButtonStories)

const theme = buildTheme()

function group() {
  return document.querySelector<HTMLElement>('[data-ui="MenuGroup"]')!
}

function childMenuPopover() {
  return document.querySelector<HTMLElement>('[data-ui="MenuGroup__popover"]')
}

function menuItem(text: string) {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-ui="MenuItem"]')).find(
    (el) => el.textContent?.trim() === text,
  )!
}

async function expectChildMenuOpen() {
  await expect.poll(() => childMenuPopover()?.style.display).toBe('')
  await expect.element(page.getByRole('menuitem', {name: 'Email link'})).toBeVisible()
}

/** Closed: hidden if it has rendered (the pre-render on intent, or an earlier open), else absent */
async function expectChildMenuClosed() {
  await expect.poll(() => childMenuPopover()?.style.display ?? 'none').toBe('none')
}

/** Pressed: the child menu is open and the pointer or focus is within it */
async function expectPressed() {
  await expect.poll(() => group().getAttribute('aria-pressed')).toBe('true')
  expect(group()).not.toHaveAttribute('data-selected')
}

/** Selected: the item is the menu's active item and its child menu does not hold the pointer */
async function expectSelected() {
  await expect.poll(() => group().getAttribute('data-selected')).toBe('')
  expect(group()).toHaveAttribute('aria-pressed', 'false')
}

async function expectIdle() {
  await expect.poll(() => group().getAttribute('data-selected')).toBeNull()
  expect(group()).toHaveAttribute('aria-pressed', 'false')
}

// Real pointer and keyboard input: `mouseenter` only fires when the pointer actually enters an
// element, and focus follows the browser's own rules, neither of which jsdom reproduces
describe('Components/MenuGroup', () => {
  test('opens on hover, is pressed while the pointer is in the child menu, and closes when a sibling activates', async () => {
    await page.viewport(1024, 768)
    await render(<WithMenuGroup />)

    await userEvent.click(page.getByRole('button', {name: 'Open'}))
    await expect.element(page.getByRole('menuitem', {name: 'Search'})).toBeVisible()

    await userEvent.hover(group())
    await expectChildMenuOpen()
    await expectSelected()

    await userEvent.hover(page.getByRole('menuitem', {name: 'Email link'}))
    await expectPressed()
    await expect.poll(() => menuItem('Email link').getAttribute('data-selected')).toBe('')

    await userEvent.hover(group())
    await expectChildMenuOpen()
    await expectSelected()

    await userEvent.hover(page.getByRole('menuitem', {name: 'Clock'}))
    await expectChildMenuClosed()
    await expectIdle()
    await expect.poll(() => menuItem('Clock').getAttribute('data-selected')).toBe('')
  })

  test('opens pressed on ArrowRight, closes on ArrowLeft, and stays closed when re-activated from the keyboard', async () => {
    await page.viewport(1024, 768)
    await render(<WithMenuGroup />)

    // Opening with the keyboard focuses `Search`; two more steps reach the `More` group
    page.getByRole('button', {name: 'Open'}).element().focus()
    await userEvent.keyboard('{ArrowDown}')
    await expect.poll(() => document.activeElement).toBe(menuItem('Search'))
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{ArrowDown}')
    await expect.poll(() => document.activeElement).toBe(group())
    await expectSelected()
    await expectChildMenuClosed()

    await userEvent.keyboard('{ArrowRight}')
    await expectChildMenuOpen()
    await expectPressed()
    await expect.poll(() => document.activeElement).toBe(menuItem('Email link'))

    await userEvent.keyboard('{ArrowLeft}')
    await expectChildMenuClosed()
    await expectSelected()
    await expect.poll(() => document.activeElement).toBe(group())

    // Moving on to a sibling and back makes the group active again without reopening its menu
    await userEvent.keyboard('{ArrowDown}')
    await expect.poll(() => document.activeElement).toBe(menuItem('Comment'))
    await expectIdle()

    await userEvent.keyboard('{ArrowUp}')
    await expect.poll(() => document.activeElement).toBe(group())
    await expectSelected()
    await expectChildMenuClosed()
  })

  // The open is a transition. While its render is still pending (here: suspended on the child
  // menu's content, with no Suspense boundary to show a fallback), a sibling item becomes active.
  // That must end the open as well; otherwise, once the transition completes, re-activating the
  // item from the keyboard shows a child menu the user never reopened.
  test('does not show the child menu for an open that was still pending when the item stopped being active', async () => {
    let resolveContent!: () => void
    const content = new Promise<void>((resolve) => {
      resolveContent = resolve
    })

    function SuspendingItem() {
      use(content)

      return <MenuItem text="Email link" />
    }

    await page.viewport(1024, 768)
    await render(
      <ThemeProvider scheme="light" theme={theme}>
        <Card padding={4}>
          <LayerProvider>
            <Menu>
              <MenuItem text="Search" />
              <MenuGroup text="More">
                <SuspendingItem />
              </MenuGroup>
              <MenuItem text="Expand" />
            </Menu>
          </LayerProvider>
        </Card>
      </ThemeProvider>,
    )

    await userEvent.hover(group())
    await expectSelected()
    // Nothing of the child menu commits while its content is pending
    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(childMenuPopover()).toBeNull()

    // The sibling above the group, so that the pointer rests outside the area a child menu would
    // open into (a child menu opening under the pointer would fire its own mouse events)
    await userEvent.hover(menuItem('Search'))
    await expectIdle()
    await expect.poll(() => menuItem('Search').getAttribute('data-selected')).toBe('')

    // Once the content resolves, the pre-render that the pointer's intent started commits the card
    // hidden: the popover is in the DOM, not displayed
    resolveContent()
    await expect.poll(() => childMenuPopover()).not.toBeNull()
    expect(childMenuPopover()!.style.display).toBe('none')

    // The sibling has focus; `ArrowDown` makes the group item active and focused again
    await userEvent.keyboard('{ArrowDown}')
    await expect.poll(() => document.activeElement).toBe(group())
    // The activation is a synchronous render, committed before the focus it caused moved
    expect(childMenuPopover()!.style.display).toBe('none')
    await expectSelected()
  })
})
