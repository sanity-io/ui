/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {Activity, Profiler} from 'react'
import {describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Button} from '../../primitives/button/button'
import {Menu} from './menu'
import {MenuButton, type MenuButtonProps} from './menuButton'
import {MenuGroup} from './menuGroup'
import {MenuItem} from './menuItem'

function menuButton(props?: Partial<MenuButtonProps>) {
  return (
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
    />
  )
}

function renderMenuButton(props?: Partial<MenuButtonProps>) {
  return render(menuButton(props))
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

    it('toggles from the last requested state when clicks are handled before a re-render', () => {
      const onOpen = vi.fn()
      const onClose = vi.fn()

      renderMenuButton({onClose, onOpen})

      act(() => {
        getButton().click()
        getButton().click()
      })

      expect(onOpen).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(getButton()).toHaveAttribute('aria-expanded', 'false')
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

    it('lets a focus handler on the button reopen the menu while focus is returned to it', () => {
      const onClose = vi.fn()
      let reopen = false

      renderMenuButton({
        button: (
          <Button onFocus={(event) => reopen && event.currentTarget.click()} text="Open menu" />
        ),
        onClose,
      })

      fireEvent.click(getButton())
      reopen = true
      fireEvent.keyDown(screen.getByRole('menuitem', {name: 'Option 1'}), {key: 'Escape'})

      expect(getButton()).toHaveAttribute('aria-expanded', 'true')
      expect(onClose).not.toHaveBeenCalled()

      fireEvent.click(getButton())

      expect(getButton()).toHaveAttribute('aria-expanded', 'false')
      expect(onClose).toHaveBeenCalledTimes(1)
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

  describe('the button element', () => {
    // A `nested-update` is a commit that React flushes synchronously from the one before it, as it
    // does for a state update from a ref callback
    const phasesOf = (onRender: ReturnType<typeof vi.fn>) =>
      onRender.mock.calls.map((call: unknown[]) => call[1])

    it.each([
      {name: 'cloned by the popover', popover: undefined},
      {name: 'with a disabled popover', popover: {disabled: true}},
      {
        name: 'with a `referenceElement`',
        popover: {referenceElement: document.createElement('div')},
      },
    ])(
      'attaches a forwarded ref once when it mounts, $name, with no follow-up commit',
      ({popover}) => {
        const callbackRef = vi.fn()
        const onRender = vi.fn()

        const {unmount} = render(
          <Profiler id="menu-button" onRender={onRender}>
            {menuButton({popover, ref: callbackRef})}
          </Profiler>,
          {strict: false},
        )

        const button = getButton()

        expect(callbackRef.mock.calls).toEqual([[button]])
        expect(phasesOf(onRender)[0]).toBe('mount')
        expect(phasesOf(onRender)).not.toContain('nested-update')

        unmount()

        expect(callbackRef.mock.calls).toEqual([[button], [null]])
      },
    )

    it('detaches and attaches a forwarded ref as an `<Activity>` hides and shows it, with no follow-up commit', () => {
      const callbackRef = vi.fn()
      const onRender = vi.fn()
      const inActivity = (mode: 'hidden' | 'visible') => (
        <Profiler id="menu-button" onRender={onRender}>
          <Activity mode={mode}>{menuButton({ref: callbackRef})}</Activity>
        </Profiler>
      )

      const {rerender} = render(inActivity('visible'), {strict: false})

      const button = getButton()

      onRender.mockClear()
      rerender(inActivity('hidden'))
      rerender(inActivity('visible'))

      expect(callbackRef.mock.calls).toEqual([[button], [null], [button]])
      expect(phasesOf(onRender)).not.toContain('nested-update')
    })

    it('follows a button replaced while the menu is open', () => {
      const ref = {current: null as HTMLButtonElement | null}
      const {rerender} = render(menuButton({ref}))

      const button = getButton()

      fireEvent.click(button)
      expectMenuVisible()

      rerender(menuButton({button: <Button key="replacement" text="Open menu" />, ref}))

      const replacement = getButton()

      expect(replacement).not.toBe(button)
      expect(ref.current).toBe(replacement)

      // A press on the replacement is not a click outside the menu, and closing focuses it
      fireEvent.mouseDown(replacement)
      expectMenuVisible()
      fireEvent.keyDown(window, {key: 'Escape'})

      expect(replacement).toHaveAttribute('aria-expanded', 'false')
      expect(replacement).toHaveFocus()
    })

    it('returns focus to the button when the menu closes with Escape', () => {
      renderMenuButton()

      fireEvent.click(getButton())
      expectMenuVisible()

      fireEvent.keyDown(window, {key: 'Escape'})

      expect(getButton()).toHaveAttribute('aria-expanded', 'false')
      expect(getButton()).toHaveFocus()
    })

    it('returns focus to the button when an item of a menu opened from the keyboard is clicked', () => {
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

    it('keeps the menu open while focus moves into a portaled submenu, and closes when it leaves', () => {
      renderMenuButton({
        menu: (
          <Menu>
            <MenuItem text="Option 1" />
            <MenuGroup id="menu-group" popover={{portal: true}} text="More">
              <MenuItem text="Sub option" />
            </MenuGroup>
          </Menu>
        ),
      })

      fireEvent.click(getButton())
      expectMenuVisible()

      const rootMenu = screen.getByRole('menu')
      const group = screen.getByRole('button', {name: 'More'})

      act(() => group.focus())
      fireEvent.keyDown(group, {key: 'ArrowRight'})

      const subOption = screen.getByRole('menuitem', {name: 'Sub option'})

      expect(rootMenu.contains(subOption)).toBe(false)

      fireEvent.focusOut(rootMenu, {relatedTarget: subOption})
      expect(getButton()).toHaveAttribute('aria-expanded', 'true')

      fireEvent.focusOut(rootMenu, {relatedTarget: document.body})
      expect(getButton()).toHaveAttribute('aria-expanded', 'false')
    })
  })
})
