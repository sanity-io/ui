/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {useLayoutEffect, useState} from 'react'
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

  describe('onOpen and onClose', () => {
    it('calls onOpen from the event that opens the menu, before the open state commits', () => {
      const expandedWhenCalled: (string | null)[] = []
      const onOpen = vi.fn(() => {
        expandedWhenCalled.push(getButton().getAttribute('aria-expanded'))
      })

      renderMenuButton({onOpen})

      fireEvent.click(getButton())

      expect(onOpen).toHaveBeenCalledTimes(1)
      // Called while the click is dispatched, not from an effect after the menu rendered open
      expect(expandedWhenCalled).toEqual(['false'])
      expectMenuVisible()
    })

    it('calls onClose from the event that closes the menu, before the closed state commits', () => {
      const expandedWhenCalled: (string | null)[] = []
      const onClose = vi.fn(() => {
        expandedWhenCalled.push(getButton().getAttribute('aria-expanded'))
      })

      renderMenuButton({onClose})

      fireEvent.click(getButton())
      expectMenuVisible()
      expect(onClose).not.toHaveBeenCalled()

      fireEvent.click(getButton())

      expect(onClose).toHaveBeenCalledTimes(1)
      expect(expandedWhenCalled).toEqual(['true'])
      expectMenuRenderedHidden()
    })

    it('commits state set in onOpen together with the open state', () => {
      // Records, at every commit of the button, whether the menu is expanded and whether the
      // state a consumer sets in `onOpen` has been committed. Notifying from an effect after the
      // open commit would record a commit in which the menu is expanded but that state is not.
      const commits: {expanded: string | null; notified: string | null}[] = []

      function ProbeButton(props: React.ComponentPropsWithRef<'button'> & {selected?: boolean}) {
        const {selected: _selected, ...rest} = props

        useLayoutEffect(() => {
          commits.push({
            expanded: getButton().getAttribute('aria-expanded'),
            notified: screen.getByTestId('notified').textContent,
          })
        })

        return (
          <button type="button" {...rest}>
            Open menu
          </button>
        )
      }

      function Consumer() {
        const [notified, setNotified] = useState(false)

        return (
          <>
            <span data-testid="notified">{notified ? 'yes' : 'no'}</span>
            <MenuButton
              button={<ProbeButton />}
              id="menu-button"
              menu={
                <Menu>
                  <MenuItem text="Option 1" />
                </Menu>
              }
              onOpen={() => setNotified(true)}
            />
          </>
        )
      }

      render(<Consumer />)

      expect(commits.at(-1)).toEqual({expanded: 'false', notified: 'no'})
      commits.length = 0

      fireEvent.click(getButton())

      expectMenuVisible()
      expect(commits).toEqual([{expanded: 'true', notified: 'yes'}])
    })

    it('calls onClose once when Escape closes the menu and focus returns to the button', () => {
      const onClose = vi.fn()

      renderMenuButton({onClose})

      const button = getButton()

      fireEvent.click(button)
      expectMenuVisible()

      // Focus an item, as keyboard navigation does: closing then moves focus out of the menu,
      // which fires the menu's blur handler from inside the Escape handler
      const item = screen.getByRole('menuitem', {name: 'Option 1'})

      act(() => item.focus())
      expect(item).toHaveFocus()

      fireEvent.keyDown(item, {key: 'Escape'})

      expect(onClose).toHaveBeenCalledTimes(1)
      expect(button).toHaveFocus()
      expectMenuRenderedHidden()
    })

    it('calls onClose once when a menu item is clicked and focus returns to the button', () => {
      const onClose = vi.fn()

      renderMenuButton({onClose})

      const button = getButton()

      fireEvent.click(button)
      expectMenuVisible()

      const item = screen.getByRole('menuitem', {name: 'Option 1'})

      act(() => item.focus())
      fireEvent.click(item)

      expect(onClose).toHaveBeenCalledTimes(1)
      expect(button).toHaveFocus()
      expectMenuRenderedHidden()
    })

    it('calls onClose once when a click outside closes the menu', () => {
      const onClose = vi.fn()

      renderMenuButton({onClose})

      fireEvent.click(getButton())
      expectMenuVisible()

      fireEvent.mouseDown(document.body)

      expect(onClose).toHaveBeenCalledTimes(1)
      expectMenuRenderedHidden()
    })

    it('does not call onOpen again when a key press asks an open menu to open', () => {
      const onOpen = vi.fn()

      renderMenuButton({onOpen})

      const button = getButton()

      act(() => button.focus())
      fireEvent.click(button)
      expect(onOpen).toHaveBeenCalledTimes(1)

      // Focus stays on the button after a click, so Enter reaches `MenuButton` while it is open
      fireEvent.keyDown(button, {key: 'Enter'})

      expect(onOpen).toHaveBeenCalledTimes(1)
      expectMenuVisible()
    })
  })

  describe('handlers on the button element', () => {
    it('calls the handlers on the button element before its own', () => {
      const calls: string[] = []
      const onMouseDown = vi.fn(() => {
        calls.push('mousedown')
      })
      const onClick = vi.fn(() => {
        calls.push('click')
      })
      const onKeyDown = vi.fn(() => {
        calls.push('keydown')
      })
      const onOpen = vi.fn(() => {
        calls.push('open')
      })
      const onClose = vi.fn(() => {
        calls.push('close')
      })

      renderMenuButton({
        button: (
          <Button
            onClick={onClick}
            onKeyDown={onKeyDown}
            onMouseDown={onMouseDown}
            text="Open menu"
          />
        ),
        onClose,
        onOpen,
      })

      const button = getButton()

      fireEvent.mouseDown(button)
      fireEvent.click(button)
      expectMenuVisible()
      expect(calls).toEqual(['mousedown', 'click', 'open'])

      fireEvent.keyDown(button, {key: 'a'})
      expect(calls).toEqual(['mousedown', 'click', 'open', 'keydown'])

      fireEvent.mouseDown(button)
      fireEvent.click(button)
      expectMenuRenderedHidden()
      expect(calls).toEqual([
        'mousedown',
        'click',
        'open',
        'keydown',
        'mousedown',
        'click',
        'close',
      ])

      expect(onClick).toHaveBeenCalledWith(expect.objectContaining({type: 'click', target: button}))
      expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({type: 'keydown', key: 'a'}))
      expect(onMouseDown).toHaveBeenCalledWith(
        expect.objectContaining({type: 'mousedown', target: button}),
      )
    })

    it('does not open when the onClick on the button element prevents the default', () => {
      const onOpen = vi.fn()

      renderMenuButton({
        button: <Button onClick={(event) => event.preventDefault()} text="Open menu" />,
        onOpen,
      })

      fireEvent.click(getButton())

      expect(onOpen).not.toHaveBeenCalled()
      expect(getButton()).toHaveAttribute('aria-expanded', 'false')
      expectMenuNotRendered()
    })

    it('does not act on a key press whose default the onKeyDown on the button element prevented', () => {
      const onOpen = vi.fn()

      renderMenuButton({
        button: (
          <Button
            onKeyDown={(event) => {
              if (event.key === 'Enter') event.preventDefault()
            }}
            text="Open menu"
          />
        ),
        onOpen,
      })

      const button = getButton()

      act(() => button.focus())

      fireEvent.keyDown(button, {key: 'Enter'})
      expect(onOpen).not.toHaveBeenCalled()
      expect(button).toHaveAttribute('aria-expanded', 'false')

      fireEvent.keyDown(button, {key: 'ArrowDown'})
      expect(onOpen).toHaveBeenCalledTimes(1)
      expectMenuVisible()
    })

    it('calls the onMouseDown on the button element before preventing the default of a press on the open menu', () => {
      const defaultPreventedWhenCalled: boolean[] = []
      const onMouseDown = vi.fn((event: React.MouseEvent<HTMLButtonElement>) => {
        defaultPreventedWhenCalled.push(event.defaultPrevented)
      })

      renderMenuButton({button: <Button onMouseDown={onMouseDown} text="Open menu" />})

      const button = getButton()

      // Closed: the press keeps its default
      expect(fireEvent.mouseDown(button)).toBe(true)

      fireEvent.click(button)
      expectMenuVisible()

      // Open: `MenuButton` prevents the default so the button does not take focus from the menu
      expect(fireEvent.mouseDown(button)).toBe(false)

      expect(onMouseDown).toHaveBeenCalledTimes(2)
      expect(defaultPreventedWhenCalled).toEqual([false, false])
    })
  })
})
