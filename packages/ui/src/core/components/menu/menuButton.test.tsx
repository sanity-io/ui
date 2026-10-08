/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {useLayoutEffect} from 'react'
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

  describe('the button element', () => {
    it('attaches the forwarded ref to the button from the commit that mounts it', () => {
      const ref = {current: null as HTMLButtonElement | null}
      // Read in a layout effect of a parent, which runs in the same commit, after the ref attached
      const seenInLayoutEffect: (HTMLElement | null)[] = []

      function Parent() {
        useLayoutEffect(() => {
          seenInLayoutEffect.push(ref.current)
        }, [])

        return (
          <MenuButton
            button={<Button text="Open menu" />}
            id="menu-button"
            menu={
              <Menu>
                <MenuItem text="Option 1" />
              </Menu>
            }
            ref={ref}
          />
        )
      }

      const {unmount} = render(<Parent />, {strict: false})

      expect(ref.current).toBe(getButton())
      expect(seenInLayoutEffect).toEqual([ref.current])

      unmount()

      expect(ref.current).toBeNull()
    })

    it('attaches a forwarded callback ref, and calls it with `null` on unmount', () => {
      const callbackRef = vi.fn()

      const {unmount} = renderMenuButton({ref: callbackRef})

      const button = getButton()

      expect(callbackRef).toHaveBeenCalledWith(button)
      expect(callbackRef.mock.lastCall).toEqual([button])

      unmount()

      expect(callbackRef.mock.lastCall).toEqual([null])
    })

    it('returns focus to the button that opened the menu when it closes with Escape', () => {
      renderMenuButton()

      fireEvent.click(getButton())
      expectMenuVisible()

      fireEvent.keyDown(window, {key: 'Escape'})

      expect(getButton()).toHaveAttribute('aria-expanded', 'false')
      expect(getButton()).toHaveFocus()
    })

    it('returns focus to the button that opened the menu from the keyboard when an item is clicked', () => {
      renderMenuButton()

      fireEvent.keyDown(getButton(), {key: 'ArrowDown'})
      expectMenuVisible()

      fireEvent.click(screen.getByRole('menuitem', {name: 'Option 2'}))

      expect(getButton()).toHaveAttribute('aria-expanded', 'false')
      expect(getButton()).toHaveFocus()
    })

    it('closes on a click outside, but not on one inside the menu or on the button', () => {
      renderMenuButton()

      fireEvent.click(getButton())
      expectMenuVisible()

      // `useClickOutsideEvent` listens for `mousedown` on the document
      fireEvent.mouseDown(screen.getByRole('menu'))
      expectMenuVisible()

      fireEvent.mouseDown(getButton())
      expectMenuVisible()

      fireEvent.mouseDown(document.body)
      expect(getButton()).toHaveAttribute('aria-expanded', 'false')
    })
  })
})
