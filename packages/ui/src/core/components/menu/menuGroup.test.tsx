/** @vitest-environment jsdom */

import {fireEvent, screen, waitFor} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Button} from '../../primitives/button/button'
import {LayerProvider} from '../../utils/layer/layerProvider'
import {Menu} from './menu'
import {MenuButton} from './menuButton'
import {MenuGroup} from './menuGroup'
import {MenuItem} from './menuItem'

// jsdom lays nothing out: every rect is 0×0 and the viewport has no size, so Floating UI's `hide`
// middleware reports the reference element as clipped and the popover card gets the `hidden`
// attribute once positioned. jsdom 30 refuses to focus anything under `display: none`, which
// would keep the keyboard tests below from moving focus into the child menu. Positioning is not
// under test here, so the middleware is neutralised.
vi.mock('@floating-ui/react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@floating-ui/react-dom')>()

  return {
    ...actual,
    hide: () => ({name: 'hide', fn: () => ({})}),
  }
})

function renderMenu(groupProps: {as?: 'div'} = {}) {
  return render(
    <LayerProvider>
      <Menu>
        <MenuItem text="Search" />
        <MenuGroup text="More" {...groupProps}>
          <MenuItem text="Email link" />
          <MenuItem text="Messages" />
        </MenuGroup>
        <MenuItem text="Expand" />
      </Menu>
    </LayerProvider>,
  )
}

function getMenu() {
  return screen.getAllByRole('menu')[0]
}

function getGroup() {
  return document.querySelector<HTMLElement>('[data-ui="MenuGroup"]')!
}

function getItem(text: string) {
  return screen.getByText(text).closest('[data-ui="MenuItem"]')!
}

function getChildMenu() {
  return screen.getByText('Email link').closest('[data-ui="Menu"]')!
}

function expectChildMenuOpen() {
  expect(screen.getByText('Email link')).toBeVisible()
}

function expectChildMenuClosed() {
  // A child menu that has opened before stays in the DOM, hidden, so that its state survives
  // reopening; one that never opened is not rendered at all
  const item = screen.queryByText('Email link')

  if (item) expect(item).not.toBeVisible()
}

/** Pressed: the child menu is open and the pointer or focus is within it */
function expectPressed(group: HTMLElement) {
  expect(group).toHaveAttribute('aria-pressed', 'true')
  expect(group).not.toHaveAttribute('data-selected')
}

/** Selected: the item is the menu's active item and its child menu does not hold the pointer */
function expectSelected(group: HTMLElement) {
  expect(group).toHaveAttribute('aria-pressed', 'false')
  expect(group).toHaveAttribute('data-selected', '')
}

function expectIdle(group: HTMLElement) {
  expect(group).toHaveAttribute('aria-pressed', 'false')
  expect(group).not.toHaveAttribute('data-selected')
}

describe('MenuGroup', () => {
  it('renders the child menu closed until the item is hovered', () => {
    renderMenu()

    const group = getGroup()

    expectIdle(group)
    expectChildMenuClosed()
  })

  it('opens the child menu on hover and marks the item as selected', () => {
    renderMenu()

    const group = getGroup()

    fireEvent.mouseEnter(group)

    expectChildMenuOpen()
    expectSelected(group)
  })

  it('is pressed while the pointer is within the child menu, selected once it returns', () => {
    renderMenu()

    const group = getGroup()

    fireEvent.mouseEnter(group)
    fireEvent.mouseEnter(getChildMenu())
    expectChildMenuOpen()
    expectPressed(group)

    fireEvent.mouseEnter(group)
    expectChildMenuOpen()
    expectSelected(group)
  })

  it('exposes the pressed state as `data-pressed` when not rendered as a button', () => {
    renderMenu({as: 'div'})

    const group = getGroup()

    expect(group).not.toHaveAttribute('aria-pressed')
    expect(group).toHaveAttribute('data-pressed', 'false')

    fireEvent.mouseEnter(group)
    fireEvent.mouseEnter(getChildMenu())

    expect(group).toHaveAttribute('data-pressed', 'true')
    expect(group).not.toHaveAttribute('data-selected')
  })

  it('closes the child menu when a sibling item becomes active', () => {
    renderMenu()

    const group = getGroup()
    const sibling = getItem('Expand')

    fireEvent.mouseEnter(group)
    fireEvent.mouseEnter(getChildMenu())
    expectPressed(group)

    fireEvent.mouseEnter(sibling)

    expectChildMenuClosed()
    expectIdle(group)
    expect(sibling).toHaveAttribute('data-selected', '')
  })

  it('does not reopen a closed child menu when the item becomes active again from the keyboard', async () => {
    renderMenu()

    const group = getGroup()
    const sibling = getItem('Expand')

    fireEvent.mouseEnter(group)
    expectChildMenuOpen()

    fireEvent.mouseEnter(sibling)
    expectChildMenuClosed()

    // `ArrowUp` from the sibling makes the group item the active (and focused) item again
    fireEvent.keyDown(getMenu(), {key: 'ArrowUp'})
    await waitFor(() => expect(group).toHaveFocus())

    expectSelected(group)
    expectChildMenuClosed()
  })

  it('opens the child menu pressed on `ArrowRight`, and moves focus to its first item', async () => {
    renderMenu()

    const group = getGroup()
    const menu = getMenu()

    // Navigate to the group item with the keyboard: `Search`, then `More`
    fireEvent.keyDown(menu, {key: 'ArrowDown'})
    fireEvent.keyDown(menu, {key: 'ArrowDown'})
    await waitFor(() => expect(group).toHaveFocus())
    expectSelected(group)
    expectChildMenuClosed()

    fireEvent.keyDown(group, {key: 'ArrowRight'})

    expectChildMenuOpen()
    expectPressed(group)
    await waitFor(() => expect(getItem('Email link')).toHaveFocus())
  })

  it('closes the child menu on `ArrowLeft` and moves focus back to the item', async () => {
    renderMenu()

    const group = getGroup()
    const menu = getMenu()

    fireEvent.keyDown(menu, {key: 'ArrowDown'})
    fireEvent.keyDown(menu, {key: 'ArrowDown'})
    await waitFor(() => expect(group).toHaveFocus())

    fireEvent.keyDown(group, {key: 'ArrowRight'})
    await waitFor(() => expect(getItem('Email link')).toHaveFocus())

    fireEvent.keyDown(getItem('Email link'), {key: 'ArrowLeft'})

    expectChildMenuClosed()
    expectSelected(group)
    await waitFor(() => expect(group).toHaveFocus())
  })

  it('is not pressed when the child menu reopens by click after it was opened with `ArrowRight`', async () => {
    renderMenu()

    const group = getGroup()
    const menu = getMenu()

    fireEvent.keyDown(menu, {key: 'ArrowDown'})
    fireEvent.keyDown(menu, {key: 'ArrowDown'})
    await waitFor(() => expect(group).toHaveFocus())

    fireEvent.keyDown(group, {key: 'ArrowRight'})
    expectPressed(group)

    fireEvent.keyDown(getItem('Email link'), {key: 'ArrowLeft'})
    await waitFor(() => expect(group).toHaveFocus())
    expectChildMenuClosed()

    // `Enter` on the focused item clicks it
    fireEvent.click(group)

    expectChildMenuOpen()
    expectSelected(group)
    await waitFor(() => expect(getItem('Email link')).toHaveFocus())
  })

  it('closes the child menu when one of its items is clicked', () => {
    renderMenu()

    const group = getGroup()

    fireEvent.mouseEnter(group)
    fireEvent.mouseEnter(getChildMenu())
    expectPressed(group)

    fireEvent.click(getItem('Email link'))

    expectChildMenuClosed()
    expectSelected(group)
  })

  it('reopens inside a `MenuButton` with its child menu closed', () => {
    render(
      <MenuButton
        button={<Button text="Open" />}
        id="menu-button"
        menu={
          <Menu>
            <MenuItem text="Search" />
            <MenuGroup text="More">
              <MenuItem text="Email link" />
            </MenuGroup>
          </Menu>
        }
      />,
    )

    const button = screen.getByRole('button', {name: 'Open'})

    fireEvent.click(button)
    fireEvent.mouseEnter(getGroup())
    fireEvent.mouseEnter(getChildMenu())
    expectChildMenuOpen()
    expectPressed(getGroup())

    // Escape closes the whole menu; the closed menu stays rendered, hidden, with its state. Its
    // controller forgets the active item, which closes the child menu as well.
    fireEvent.keyDown(window, {key: 'Escape'})
    expect(screen.getByText('Search')).not.toBeVisible()
    expectChildMenuClosed()

    fireEvent.click(button)
    expect(screen.getByText('Search')).toBeVisible()
    expectChildMenuClosed()
    expectIdle(getGroup())
  })
})
