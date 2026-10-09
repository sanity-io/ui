/** @vitest-environment jsdom */

import {act, fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {startTransition, use, useLayoutEffect, useState} from 'react'
import {afterEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {useClickOutsideEvent} from '../../hooks/useClickOutsideEvent'
import {useGlobalKeyDown} from '../../hooks/useGlobalKeyDown'
import {Button} from '../../primitives/button/button'
import {LayerProvider} from '../../utils/layer/layerProvider'
import {useLayer} from '../../utils/layer/useLayer'
import {Menu} from './menu'
import {MenuButton, type MenuButtonProps} from './menuButton'
import {MenuGroup} from './menuGroup'
import {MenuItem} from './menuItem'

// `startTransition` wrapped in a mock that passes through to React, so the transition tests can
// observe and intercept it (an ESM export cannot be spied on in place). `useTransition`'s own
// `startTransition`, which `MenuButton` uses for its pending flag, goes through the same mock.
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()
  const startTransitionMock = vi.fn(actual.startTransition)

  const useTransition: typeof actual.useTransition = () => {
    const [isPending, start] = actual.useTransition()
    const startThroughMock = actual.useCallback(
      (scope: Parameters<typeof start>[0]) => {
        startTransitionMock(() => start(scope))
      },
      [start],
    )

    return [isPending, startThroughMock]
  }

  return {...actual, startTransition: startTransitionMock, useTransition}
})

const startTransitionMock = vi.mocked(startTransition)

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

    it.each([
      ['Escape', (item: HTMLElement) => fireEvent.keyDown(item, {key: 'Escape'})],
      ['a menu item click', (item: HTMLElement) => fireEvent.click(item)],
    ])(
      'returns focus to the button before calling onClose, so focus moved there stands on %s',
      (_name, close) => {
        const focusedWhenCalled: (Element | null)[] = []
        const onClose = vi.fn(() => {
          focusedWhenCalled.push(document.activeElement)
          screen.getByRole('button', {name: 'Outside'}).focus()
        })

        render(
          <>
            <MenuButton
              button={<Button text="Open menu" />}
              id="menu-button"
              menu={
                <Menu>
                  <MenuItem text="Option 1" />
                </Menu>
              }
              onClose={onClose}
            />
            <button type="button">Outside</button>
          </>,
        )

        const button = getButton()

        fireEvent.click(button)
        expectMenuVisible()

        const item = screen.getByRole('menuitem', {name: 'Option 1'})

        act(() => item.focus())
        close(item)

        expect(onClose).toHaveBeenCalledTimes(1)
        // The built-in restoration had run when `onClose` was called, and did not override it
        expect(focusedWhenCalled).toEqual([button])
        expect(screen.getByRole('button', {name: 'Outside'})).toHaveFocus()
        expectMenuRenderedHidden()
      },
    )

    // A menu item calls its own `onClick` before it reports the click to the menu, and a capture
    // handler on the menu element runs before either, so focus moved out of the menu by one of
    // them fires the menu's blur handler before the item click can close the menu
    it.each([
      ['the clicked item’s onClick', 'onClick'],
      ['an onClickCapture on the menu element', 'onClickCapture'],
    ] as const)(
      'returns focus to the button before calling onClose when %s moves focus out of the menu',
      (_name, handler) => {
        const focusedWhenCalled: (Element | null)[] = []
        const onClose = vi.fn(() => {
          focusedWhenCalled.push(document.activeElement)
        })
        const focusOutside = vi.fn(() => {
          screen.getByRole('button', {name: 'Outside'}).focus()
        })

        render(
          <>
            <MenuButton
              button={<Button text="Open menu" />}
              id="menu-button"
              menu={
                <Menu onClickCapture={handler === 'onClickCapture' ? focusOutside : undefined}>
                  <MenuItem
                    onClick={handler === 'onClick' ? focusOutside : undefined}
                    text="Option 1"
                  />
                </Menu>
              }
              onClose={onClose}
            />
            <button type="button">Outside</button>
          </>,
        )

        const button = getButton()

        fireEvent.click(button)
        expectMenuVisible()

        const item = screen.getByRole('menuitem', {name: 'Option 1'})

        act(() => item.focus())
        fireEvent.click(item)

        expect(focusOutside).toHaveBeenCalledTimes(1)
        expect(onClose).toHaveBeenCalledTimes(1)
        expect(focusedWhenCalled).toEqual([button])
        expect(button).toHaveFocus()
        expectMenuRenderedHidden()
      },
    )

    describe('a click inside the menu that moves focus out of it without closing it', () => {
      // Not an item click, so nothing closes the menu during the click; the blur it caused closes
      // the menu once the click has finished dispatching
      function renderWithControlInside(onInsideClick: (event: React.MouseEvent) => void) {
        const onClose = vi.fn()
        const onMenuClick = vi.fn()

        render(
          <>
            <MenuButton
              button={<Button text="Open menu" />}
              id="menu-button"
              menu={
                <Menu onClick={onMenuClick}>
                  <MenuItem text="Option 1" />
                  <button onClick={onInsideClick} type="button">
                    Inside
                  </button>
                </Menu>
              }
              onClose={onClose}
            />
            <button type="button">Outside</button>
          </>,
        )

        fireEvent.click(getButton())
        expectMenuVisible()

        const inside = screen.getByRole('button', {name: 'Inside'})

        act(() => inside.focus())

        return {inside, onClose, onMenuClick}
      }

      function focusOutside() {
        screen.getByRole('button', {name: 'Outside'}).focus()
      }

      function expectClosedWithFocusOutside(onClose: ReturnType<typeof vi.fn>) {
        expect(onClose).toHaveBeenCalledTimes(1)
        expect(screen.getByRole('button', {name: 'Outside'})).toHaveFocus()
        expect(getButton()).toHaveAttribute('aria-expanded', 'false')
      }

      it('closes when the click reaches the menu element', () => {
        const {inside, onClose, onMenuClick} = renderWithControlInside(focusOutside)

        fireEvent.click(inside)

        expectClosedWithFocusOutside(onClose)
        // The handler on the menu element still runs
        expect(onMenuClick).toHaveBeenCalledTimes(1)
      })

      it('closes once the click has finished dispatching when a handler stopped its propagation', async () => {
        const {inside, onClose, onMenuClick} = renderWithControlInside((event) => {
          event.stopPropagation()
          focusOutside()
        })

        fireEvent.click(inside)

        expect(onClose).not.toHaveBeenCalled()
        expect(onMenuClick).not.toHaveBeenCalled()
        // The click never reached the menu element, so a macrotask ends it
        await act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)))

        expectClosedWithFocusOutside(onClose)
      })
    })

    it('calls the onBlurCapture on the menu element before closing on focus leaving the menu', () => {
      const calls: string[] = []
      const onMenuBlurCapture = vi.fn((event: React.FocusEvent<HTMLDivElement>) => {
        const {relatedTarget} = event

        calls.push(
          `blur to ${relatedTarget instanceof HTMLElement ? relatedTarget.textContent : 'nothing'}`,
        )
      })
      const onClose = vi.fn(() => {
        calls.push('close')
      })

      render(
        <>
          <MenuButton
            button={<Button text="Open menu" />}
            id="menu-button"
            menu={
              <Menu onBlurCapture={onMenuBlurCapture}>
                <MenuItem text="Option 1" />
              </Menu>
            }
            onClose={onClose}
          />
          <button type="button">Outside</button>
        </>,
      )

      fireEvent.click(getButton())
      act(() => screen.getByRole('menuitem', {name: 'Option 1'}).focus())
      act(() => screen.getByRole('button', {name: 'Outside'}).focus())

      expect(calls).toEqual(['blur to Outside', 'close'])
      expectMenuRenderedHidden()
    })

    it('leaves focus alone when __unstable_disableRestoreFocusOnClose is set', () => {
      const focusedWhenCalled: (Element | null)[] = []
      const onClose = vi.fn(() => {
        focusedWhenCalled.push(document.activeElement)
      })

      renderMenuButton({__unstable_disableRestoreFocusOnClose: true, onClose})

      const button = getButton()
      const item = () => screen.getByRole('menuitem', {name: 'Option 1'})

      // Escape
      fireEvent.click(button)
      act(() => item().focus())
      fireEvent.keyDown(item(), {key: 'Escape'})
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(button).not.toHaveFocus()
      expectMenuRenderedHidden()

      // Menu item click
      fireEvent.click(button)
      act(() => item().focus())
      fireEvent.click(item())
      expect(onClose).toHaveBeenCalledTimes(2)
      expect(button).not.toHaveFocus()
      expectMenuRenderedHidden()

      // `onClose` saw whatever had focus at the time, never the button
      expect(focusedWhenCalled).not.toContain(button)
    })

    describe('nested menus', () => {
      function renderWithGroup(onClose: () => void) {
        render(
          <MenuButton
            button={<Button text="Open menu" />}
            id="menu-button"
            menu={
              <Menu>
                <MenuItem text="Option 1" />
                <MenuGroup text="More">
                  <MenuItem text="Nested option" />
                </MenuGroup>
              </Menu>
            }
            onClose={onClose}
          />,
        )

        fireEvent.click(getButton())
        expectMenuVisible()

        const group = screen.getByRole('button', {name: 'More'})

        // Opens the child menu; its click goes through the menu element's tracking too
        act(() => group.focus())
        fireEvent.click(group)

        return screen.getByRole('menuitem', {name: 'Nested option'})
      }

      it('stays open when a group item opens its child menu', () => {
        const onClose = vi.fn()

        renderWithGroup(onClose)

        expect(getButton()).toHaveAttribute('aria-expanded', 'true')
        expect(onClose).not.toHaveBeenCalled()
      })

      it('closes the whole menu and returns focus to the button when a child menu item is clicked', () => {
        const focusedWhenCalled: (Element | null)[] = []
        const onClose = vi.fn(() => {
          focusedWhenCalled.push(document.activeElement)
        })

        const nestedItem = renderWithGroup(onClose)

        act(() => nestedItem.focus())
        fireEvent.click(nestedItem)

        expect(onClose).toHaveBeenCalledTimes(1)
        expect(focusedWhenCalled).toEqual([getButton()])
        expect(getButton()).toHaveFocus()
        expectMenuRenderedHidden()
      })
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

  describe('transitions', () => {
    afterEach(() => {
      // Back to passing through to React
      startTransitionMock.mockReset()
    })

    /**
     * Wraps the real `startTransition` so that a test can tell whether code runs inside the
     * function passed to it (the scope React runs as a transition)
     */
    function trackTransitions() {
      const actual = startTransitionMock.getMockImplementation()
      let depth = 0

      if (!actual) throw new Error('startTransition is not passing through to React')

      startTransitionMock.mockImplementation((scope) => {
        depth++

        try {
          actual(scope)
        } finally {
          depth--
        }
      })

      return {inTransition: () => depth > 0}
    }

    it('opens in a transition on every path, with onOpen inside it, and closes synchronously on every path', () => {
      const {inTransition} = trackTransitions()
      const calls: string[] = []
      const onOpen = vi.fn(() => {
        calls.push(inTransition() ? 'open in a transition' : 'open outside a transition')
      })
      const onClose = vi.fn(() => {
        calls.push(inTransition() ? 'close in a transition' : 'close synchronously')
      })

      render(
        <>
          <MenuButton
            button={<Button text="Open menu" />}
            id="menu-button"
            menu={
              <Menu>
                <MenuItem text="Option 1" />
              </Menu>
            }
            onClose={onClose}
            onOpen={onOpen}
          />
          <button type="button">Outside</button>
        </>,
      )

      const button = getButton()
      const outside = screen.getByRole('button', {name: 'Outside'})
      const item = () => screen.getByRole('menuitem', {name: 'Option 1'})

      // Button click, both ways
      fireEvent.click(button)
      expectMenuVisible()
      fireEvent.click(button)
      expectMenuRenderedHidden()

      // Key press, click outside
      fireEvent.keyDown(button, {key: 'ArrowDown'})
      expectMenuVisible()
      fireEvent.mouseDown(document.body)
      expectMenuRenderedHidden()

      // Key press, Escape
      fireEvent.keyDown(button, {key: 'Enter'})
      expectMenuVisible()
      act(() => item().focus())
      fireEvent.keyDown(item(), {key: 'Escape'})
      expectMenuRenderedHidden()

      // Key press, menu item click
      fireEvent.keyDown(button, {key: ' '})
      expectMenuVisible()
      fireEvent.click(item())
      expectMenuRenderedHidden()

      // Key press, focus leaving the menu
      fireEvent.keyDown(button, {key: 'ArrowUp'})
      expectMenuVisible()
      act(() => item().focus())
      act(() => outside.focus())
      expectMenuRenderedHidden()

      expect(calls).toEqual(
        Array.from({length: 5}, () => ['open in a transition', 'close synchronously']).flat(),
      )
    })

    it('closes without a transition, so the close commits with the updates of the event that closed it', () => {
      const scopes: (() => void)[] = []

      startTransitionMock.mockImplementation((scope) => {
        scopes.push(scope)
      })

      renderMenuButton()

      const button = getButton()

      fireEvent.click(button)
      act(() => {
        for (const scope of scopes) scope()
      })
      expectMenuVisible()

      // A held-back transition would leave the menu open here; the close does not go through one
      fireEvent.click(button)

      expect(scopes).toHaveLength(1)
      expectMenuRenderedHidden()
    })

    it('runs the open update, with onOpen, in the function it passes to startTransition', () => {
      const scopes: (() => void)[] = []

      startTransitionMock.mockImplementation((scope) => {
        scopes.push(scope)
      })

      const onOpen = vi.fn()

      renderMenuButton({onOpen})

      const button = getButton()

      fireEvent.click(button)

      // The handler ran, but what it does to the state waits for the transition React would run.
      // One scope: the mock intercepts `Popover`'s intent transition too, but a plain `click`
      // fires none of the events that count as intent (`focusin`, `pointerenter`, `pointerdown`).
      expect(scopes).toHaveLength(1)
      expect(button).toHaveAttribute('aria-expanded', 'false')
      expectMenuNotRendered()
      expect(onOpen).not.toHaveBeenCalled()

      act(() => {
        for (const scope of scopes) scope()
      })

      expectMenuVisible()
      expect(onOpen).toHaveBeenCalledTimes(1)
    })

    it('settles on the last requested state when the button is clicked again while an open is still pending', async () => {
      let resolveContent!: () => void
      const content = new Promise<void>((resolve) => {
        resolveContent = resolve
      })

      // Suspends until `resolveContent()`; with no Suspense boundary above it, the open transition
      // that renders it stays pending (React waits rather than committing a fallback)
      function SuspendingItem() {
        use(content)

        return <MenuItem text="Option 1" />
      }

      const onOpen = vi.fn()
      const onClose = vi.fn()

      render(
        <MenuButton
          button={<Button text="Open menu" />}
          id="menu-button"
          menu={
            <Menu>
              <SuspendingItem />
            </Menu>
          }
          onClose={onClose}
          onOpen={onOpen}
        />,
      )

      const button = getButton()

      // The open is a transition; its render suspends, so nothing of it commits (awaited `act`,
      // as React asks for whenever a render suspends inside one)
      await act(async () => {
        fireEvent.click(button)
      })
      expect(onOpen).toHaveBeenCalledTimes(1)
      expect(button).toHaveAttribute('aria-expanded', 'false')
      expectMenuNotRendered()

      // A second click while that open is pending closes: the handler toggles the requested
      // value, not the committed one, and the close joins the pending transition
      await act(async () => {
        fireEvent.click(button)
      })
      expect(onClose).toHaveBeenCalledTimes(1)
      expect(onOpen).toHaveBeenCalledTimes(1)

      await act(async () => {
        resolveContent()
        await content
      })

      expect(button).toHaveAttribute('aria-expanded', 'false')
      expectMenuNotRendered()
      expect(onOpen).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledTimes(1)

      // Opening for real now that the content can render. Asserted on the DOM rather than the
      // accessibility tree: after an awaited `act` Floating UI has positioned the menu, and with
      // jsdom's zero-size rects its `hide` middleware marks the card hidden (see below).
      await act(async () => {
        fireEvent.click(button)
      })
      expect(onOpen).toHaveBeenCalledTimes(2)
      expect(button).toHaveAttribute('aria-expanded', 'true')
      expect(
        document.querySelector<HTMLElement>('[data-ui="MenuButton__popover"]')?.style.display,
      ).toBe('')
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    /**
     * An overlay around the menu button that closes on Escape and on a click outside while it is
     * the top layer, the way `Dialog` does
     */
    function Overlay(props: {children: React.ReactNode; onDismiss: () => void}) {
      const {children, onDismiss} = props
      const {isTopLayer} = useLayer()

      useGlobalKeyDown((event) => {
        if (isTopLayer && event.key === 'Escape') onDismiss()
      })
      useClickOutsideEvent(isTopLayer && onDismiss, () => [])

      return children
    }

    it.each([
      ['Escape', () => fireEvent.keyDown(document.body, {key: 'Escape'})],
      ['a click outside', () => fireEvent.mouseDown(document.body)],
    ])(
      'cancels an open that is still pending on %s, leaving the overlay around it alone',
      async (_name, cancel) => {
        let resolveContent!: () => void
        const content = new Promise<void>((resolve) => {
          resolveContent = resolve
        })

        function SuspendingItem() {
          use(content)

          return <MenuItem text="Option 1" />
        }

        const onClose = vi.fn()
        const onDismissOverlay = vi.fn()

        render(
          <LayerProvider>
            <Overlay onDismiss={onDismissOverlay}>
              <MenuButton
                button={<Button text="Open menu" />}
                id="menu-button"
                menu={
                  <Menu>
                    <SuspendingItem />
                  </Menu>
                }
                onClose={onClose}
              />
            </Overlay>
          </LayerProvider>,
        )

        const button = getButton()

        await act(async () => {
          fireEvent.click(button)
        })
        expectMenuNotRendered()

        // The menu's own Escape and click-outside listeners are not running, since the menu has not
        // committed; the menu button cancels the pending open itself, from a layer of its own, so
        // the overlay is not the top layer and does not act on the same event
        await act(async () => {
          cancel()
        })
        expect(onClose).toHaveBeenCalledTimes(1)
        expect(onDismissOverlay).not.toHaveBeenCalled()

        await act(async () => {
          resolveContent()
          await content
        })

        expect(button).toHaveAttribute('aria-expanded', 'false')
        expectMenuNotRendered()
        expect(onClose).toHaveBeenCalledTimes(1)

        // Nothing pending or open any more: the overlay is the top layer again
        await act(async () => {
          cancel()
        })
        expect(onDismissOverlay).toHaveBeenCalledTimes(1)
        expect(onClose).toHaveBeenCalledTimes(1)
      },
    )

    // The focus request made by a key press (`shouldFocus`) is applied by `useMenuController` in
    // animation frames after the open commit, by which time Floating UI has positioned the menu.
    // With the zero-size rects jsdom reports, its `hide` middleware marks the reference hidden,
    // which puts `display: none` on the popover card, and jsdom refuses to focus anything inside
    // it. That path is covered in a real browser by the `KeyboardNavigation` story and
    // `apps/storybook/tests/menuButton.test.tsx`.
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
