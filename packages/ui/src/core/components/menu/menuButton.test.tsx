/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Button} from '../../primitives/button/button'
import {Menu} from './menu'
import {MenuButton, type MenuButtonProps} from './menuButton'
import {MenuItem} from './menuItem'

function renderMenuButton(props?: Partial<MenuButtonProps>) {
  return render(
    <MenuButton
      button={<Button text="Open menu" />}
      id="menu-button"
      menu={
        <Menu>
          <MenuItem text="Option 1" />
          <MenuItem text="Option 2" />
        </Menu>
      }
      {...props}
    />,
  )
}

function getButton() {
  return screen.getByRole('button', {name: 'Open menu'})
}

function expectMenuNotRendered() {
  expect(document.querySelector('[data-ui="MenuButton__popover"]')).toBeNull()
  expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
}

function expectMenuRenderedHidden() {
  expect(document.querySelector('[data-ui="MenuButton__popover"]')).not.toBeNull()
  expect(screen.getByText('Option 1')).not.toBeVisible()
  // `display: none` keeps the closed menu out of the accessibility tree
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
}

function expectMenuVisible() {
  expect(screen.getByRole('menu')).toBeVisible()
  expect(screen.getByRole('menuitem', {name: 'Option 1'})).toBeVisible()
  expect(getButton()).toHaveAttribute('aria-expanded', 'true')
}

describe('MenuButton', () => {
  describe('onOpen and onClose', () => {
    const closeFromItem: [string, (item: HTMLElement) => void][] = [
      ['Escape', (item) => fireEvent.keyDown(item, {key: 'Escape'})],
      ['an item click', (item) => fireEvent.click(item)],
    ]

    it('calls them from the event that changes the open state, before it commits', () => {
      const expanded = () => getButton().getAttribute('aria-expanded')
      const onOpen = vi.fn(expanded)
      const onClose = vi.fn(expanded)

      renderMenuButton({onClose, onOpen})

      fireEvent.click(getButton())
      fireEvent.click(getButton())

      expect(onOpen.mock.results.map((result) => result.value)).toEqual(['false'])
      expect(onClose.mock.results.map((result) => result.value)).toEqual(['true'])
    })

    // Returning focus to the button blurs the menu, and the blur handler closes the menu too
    it.each(closeFromItem)(
      'calls onClose once on %s, after returning focus to the button',
      (_name, close) => {
        const onClose = vi.fn(() => document.activeElement)

        renderMenuButton({onClose})

        fireEvent.click(getButton())
        const item = screen.getByRole('menuitem', {name: 'Option 1'})
        act(() => item.focus())
        close(item)

        expect(onClose.mock.results.map((result) => result.value)).toEqual([getButton()])
        expect(getButton()).toHaveFocus()
      },
    )

    it.each(closeFromItem)(
      'leaves focus alone on %s when __unstable_disableRestoreFocusOnClose is set',
      (_name, close) => {
        const onClose = vi.fn()

        renderMenuButton({__unstable_disableRestoreFocusOnClose: true, onClose})

        fireEvent.click(getButton())
        const item = screen.getByRole('menuitem', {name: 'Option 1'})
        act(() => item.focus())
        close(item)

        expect(onClose).toHaveBeenCalledTimes(1)
        expect(getButton()).not.toHaveFocus()
      },
    )

    // The blur closes the menu before the item click does
    it("returns focus to the button when the item's onClick moved it out of the menu", () => {
      const onClose = vi.fn()

      render(
        <>
          <MenuButton
            button={<Button text="Open menu" />}
            id="menu-button"
            menu={
              <Menu>
                <MenuItem
                  onClick={() => screen.getByRole('button', {name: 'Outside'}).focus()}
                  text="Option 1"
                />
              </Menu>
            }
            onClose={onClose}
          />
          <button type="button">Outside</button>
        </>,
      )

      fireEvent.click(getButton())
      const item = screen.getByRole('menuitem', {name: 'Option 1'})
      act(() => item.focus())
      fireEvent.click(item)

      expect(onClose).toHaveBeenCalledTimes(1)
      expect(getButton()).toHaveFocus()
    })
  })

  describe('handlers on the button element', () => {
    it('calls them before its own', () => {
      const calls: string[] = []
      const record = (call: string) => () => {
        calls.push(call)
      }

      renderMenuButton({
        button: (
          <Button
            onClick={record('click')}
            onKeyDown={record('keydown')}
            onMouseDown={record('mousedown')}
            text="Open menu"
          />
        ),
        onClose: record('close'),
        onOpen: record('open'),
      })

      fireEvent.keyDown(getButton(), {key: 'ArrowDown'})
      fireEvent.mouseDown(getButton())
      fireEvent.click(getButton())

      expect(calls).toEqual(['keydown', 'open', 'mousedown', 'click', 'close'])
    })

    it('does not act on events whose default they prevented', () => {
      const onOpen = vi.fn()

      renderMenuButton({
        button: (
          <Button
            onClick={(event) => event.preventDefault()}
            onKeyDown={(event) => event.preventDefault()}
            text="Open menu"
          />
        ),
        onOpen,
      })

      fireEvent.click(getButton())
      fireEvent.keyDown(getButton(), {key: 'Enter'})

      expect(onOpen).not.toHaveBeenCalled()
      expect(getButton()).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('pre-rendering while closed', () => {
    it('does not render the closed menu until the button shows intent to open it', () => {
      renderMenuButton()

      expectMenuNotRendered()
      expect(getButton()).toHaveAttribute('aria-expanded', 'false')
    })

    it('pre-renders the menu, hidden, once the button receives focus', () => {
      renderMenuButton()

      fireEvent.focusIn(getButton())

      expectMenuRenderedHidden()
    })

    it('pre-renders the menu, hidden, once a pointer enters the button', () => {
      renderMenuButton()

      fireEvent.pointerEnter(getButton())

      expectMenuRenderedHidden()
    })

    it('shows the pre-rendered menu on click, and keeps it rendered after it closes', () => {
      renderMenuButton()

      fireEvent.pointerEnter(getButton())
      expectMenuRenderedHidden()

      fireEvent.click(getButton())
      expectMenuVisible()

      fireEvent.click(getButton())
      expectMenuRenderedHidden()
    })

    it('pre-renders the menu, hidden, once a pointer presses the button', () => {
      renderMenuButton()

      fireEvent.pointerDown(getButton())

      expectMenuRenderedHidden()
    })

    it.each(['Enter', ' ', 'ArrowDown', 'ArrowUp'])(
      'pre-renders the menu on focus and shows it on %j, keyboard only',
      (key) => {
        const onOpen = vi.fn()

        renderMenuButton({onOpen})

        const button = getButton()

        act(() => button.focus())
        expectMenuRenderedHidden()
        expect(onOpen).not.toHaveBeenCalled()
        expect(button).toHaveFocus()

        fireEvent.keyDown(button, {key})
        expectMenuVisible()
        expect(onOpen).toHaveBeenCalledTimes(1)
      },
    )

    it('pre-renders the menu of a button that is focused before it renders', () => {
      renderMenuButton({button: <Button autoFocus text="Open menu" />})

      const button = getButton()

      expect(button).toHaveFocus()
      expectMenuRenderedHidden()

      fireEvent.keyDown(button, {key: 'Enter'})
      expectMenuVisible()
    })

    it('renders the menu when it opens without prior intent', () => {
      const onOpen = vi.fn()

      renderMenuButton({onOpen})

      expectMenuNotRendered()

      // A plain `click()` without the pointer events that precede a real click
      fireEvent.click(getButton())
      expectMenuVisible()
      expect(onOpen).toHaveBeenCalledTimes(1)
    })

    it('has no visible side effects when intent is not followed by an open', () => {
      const onOpen = vi.fn()
      const onClose = vi.fn()

      const {container} = renderMenuButton({onOpen, onClose})
      const button = getButton()

      act(() => button.focus())
      fireEvent.pointerEnter(button)
      fireEvent.pointerLeave(button)

      expectMenuRenderedHidden()
      expect(button).toHaveAttribute('aria-expanded', 'false')
      expect(button).toHaveFocus()
      expect(onOpen).not.toHaveBeenCalled()
      expect(onClose).not.toHaveBeenCalled()
      // The pre-rendered menu lives in the portal, nothing was added next to the button
      expect(container.querySelector('[data-ui="MenuButton__popover"]')).toBeNull()
    })
  })
})
