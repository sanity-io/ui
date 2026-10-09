/** @vitest-environment jsdom */

import {act, fireEvent, screen, waitFor} from '@testing-library/react'
import {startTransition, use} from 'react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

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

// `startTransition` as a spy that calls through, so the `transitions` tests can swap in an
// implementation that holds the callbacks back (an ESM named import cannot be spied on in place)
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()

  return {
    ...actual,
    startTransition: vi.fn(actual.startTransition),
  }
})

function renderMenu(groupProps: {as?: 'a' | 'div'} = {}) {
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
    // Present only while pressed: `Selectable` styles `[data-pressed]` by presence, so a
    // serialised `"false"` would paint the item pressed
    expect(group).not.toHaveAttribute('data-pressed')

    fireEvent.mouseEnter(group)
    fireEvent.mouseEnter(getChildMenu())

    expect(group).toHaveAttribute('data-pressed', '')
    expect(group).not.toHaveAttribute('data-selected')

    fireEvent.mouseEnter(group)

    expect(group).not.toHaveAttribute('data-pressed')
    expect(group).toHaveAttribute('data-selected', '')
  })

  it('does not match the pressed selector while idle when rendered as a link', () => {
    renderMenu({as: 'a'})

    expect(getGroup().matches('[data-as="a"][data-pressed]')).toBe(false)
  })

  it('closes the child menu when a sibling item becomes active, and reopens it when hovered again', () => {
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

    // The most common pointer flow, group → sibling → group: the open has to record the
    // activation that began with this hover, not the one the sibling ended
    fireEvent.mouseEnter(group)

    expectChildMenuOpen()
    expectSelected(group)
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

  // A click opens the child menu selected, not pressed, as it always has (only the pointer in the
  // child menu and `ArrowRight` press the item). This guards the `withinMenu` left behind by the
  // `ArrowRight` open; whether a click should press the item too is a separate decision.
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

  // A click or `ArrowRight` that is not preceded by an activation (a programmatic `click()`, an
  // activation dispatched by assistive technology, focus given from outside the menu) makes the
  // item the menu's active item and opens the child menu right away. It must not record an open
  // for an item that is not active, which would show the child menu on the next activation.
  describe('opened while not the active item', () => {
    it('activates the item and opens the child menu on click', async () => {
      renderMenu()

      const group = getGroup()

      fireEvent.click(group)

      expectChildMenuOpen()
      expectSelected(group)
      await waitFor(() => expect(getItem('Email link')).toHaveFocus())
    })

    it('activates the item and opens the child menu pressed on `ArrowRight`', async () => {
      renderMenu()

      const group = getGroup()

      act(() => group.focus())
      fireEvent.keyDown(group, {key: 'ArrowRight'})

      expectChildMenuOpen()
      expectPressed(group)
      await waitFor(() => expect(getItem('Email link')).toHaveFocus())
    })

    it('does not show the child menu later, when the keyboard passes over the item', async () => {
      renderMenu()

      const group = getGroup()
      const menu = getMenu()

      fireEvent.click(group)
      expectChildMenuOpen()

      // `Expand`, `Search`, then back onto the group
      fireEvent.keyDown(menu, {key: 'ArrowDown'})
      expectChildMenuClosed()
      fireEvent.keyDown(menu, {key: 'ArrowDown'})
      fireEvent.keyDown(menu, {key: 'ArrowDown'})
      await waitFor(() => expect(group).toHaveFocus())

      expectSelected(group)
      expectChildMenuClosed()
    })
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

  it('does not show the child menu for an open that was still pending when the item stopped being active', async () => {
    let resolveContent!: () => void
    const content = new Promise<void>((resolve) => {
      resolveContent = resolve
    })

    // Suspends until `resolveContent()`; with no Suspense boundary above it, the open transition
    // that renders it stays pending (React waits rather than committing a fallback)
    function SuspendingItem() {
      use(content)

      return <MenuItem text="Email link" />
    }

    render(
      <LayerProvider>
        <Menu>
          <MenuItem text="Search" />
          <MenuGroup text="More">
            <SuspendingItem />
          </MenuGroup>
          <MenuItem text="Expand" />
        </Menu>
      </LayerProvider>,
    )

    const group = getGroup()
    const menu = getMenu()

    // The open is a transition; its render suspends, so nothing of the child menu commits
    // (awaited `act`, as React asks for whenever a render suspends inside one)
    await act(async () => {
      fireEvent.mouseEnter(group)
    })
    expectSelected(group)
    expect(screen.queryByText('Email link')).toBeNull()

    // A sibling becomes active while that open is still pending
    await act(async () => {
      fireEvent.mouseEnter(getItem('Expand'))
    })
    expectIdle(group)
    expect(screen.queryByText('Email link')).toBeNull()

    await act(async () => {
      resolveContent()
      await content
    })
    expectChildMenuClosed()

    // Re-activating the item from the keyboard must not show a child menu the user never reopened
    await act(async () => {
      fireEvent.keyDown(menu, {key: 'ArrowUp'})
    })
    await waitFor(() => expect(group).toHaveFocus())

    expectSelected(group)
    expectChildMenuClosed()
  })

  // Opening and closing the child menu happen in `startTransition`. The spy keeps the callbacks
  // instead of running them, so whatever changes before `flushTransitions()` was set outside the
  // transition, and whatever changes when it runs was set inside it. The spy is graph-wide (the
  // `react` module is mocked for every module in this file's graph), so the callbacks of other
  // components land in the same array: `Popover` pre-renders its closed content in a transition
  // when the reference element gains focus, which the controller's focus does. The assertions
  // therefore read the state before and after the flush, never how many callbacks were held.
  describe('transitions', () => {
    let transitions: Array<() => void>

    beforeEach(() => {
      transitions = []
      vi.mocked(startTransition).mockImplementation((callback) => {
        transitions.push(callback)
      })
    })

    afterEach(() => {
      // Back to calling through
      vi.mocked(startTransition).mockReset()
    })

    function flushTransitions() {
      const pending = transitions.splice(0)

      act(() => {
        for (const callback of pending) callback()
      })
    }

    /**
     * A frame passes before the transition commits. `shouldFocus` is reset by an animation frame
     * after the commit that set it, so a focus request set outside the transition would be gone
     * by the time the child menu is revealed, and its first item would not receive focus.
     */
    function nextFrame() {
      return new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve())
      })
    }

    /** Makes the group item the active, focused item through the controller: `Search`, then `More` */
    async function navigateToGroup() {
      const menu = getMenu()

      fireEvent.keyDown(menu, {key: 'ArrowDown'})
      fireEvent.keyDown(menu, {key: 'ArrowDown'})
      await waitFor(() => expect(getGroup()).toHaveFocus())
    }

    it('opens on hover in a transition, while the item is selected right away', () => {
      renderMenu()

      const group = getGroup()

      fireEvent.mouseEnter(group)

      // The controller's activation is urgent; the child menu waits for the transition
      expectSelected(group)
      expectChildMenuClosed()

      flushTransitions()

      expectChildMenuOpen()
      expectSelected(group)
    })

    it('opens on click in a transition, together with the focus request for its first item', async () => {
      renderMenu()

      const group = getGroup()

      await navigateToGroup()
      transitions.length = 0

      fireEvent.click(group)

      expectChildMenuClosed()
      expectSelected(group)

      await nextFrame()
      flushTransitions()

      expectChildMenuOpen()
      expectSelected(group)
      await waitFor(() => expect(getItem('Email link')).toHaveFocus())
    })

    it('opens on `ArrowRight` in a transition, together with the focus request, and is pressed once open', async () => {
      renderMenu()

      const group = getGroup()

      await navigateToGroup()
      transitions.length = 0

      fireEvent.keyDown(group, {key: 'ArrowRight'})

      expectChildMenuClosed()
      expectSelected(group)

      await nextFrame()
      flushTransitions()

      expectChildMenuOpen()
      expectPressed(group)
      await waitFor(() => expect(getItem('Email link')).toHaveFocus())
    })

    it('closes on `ArrowLeft` in a transition', async () => {
      renderMenu()

      const group = getGroup()

      await navigateToGroup()
      fireEvent.keyDown(group, {key: 'ArrowRight'})
      flushTransitions()
      expectChildMenuOpen()

      fireEvent.keyDown(getItem('Email link'), {key: 'ArrowLeft'})

      expectChildMenuOpen()

      flushTransitions()

      expectChildMenuClosed()
      expectSelected(group)
    })

    it('closes on a child item click in a transition', () => {
      renderMenu()

      const group = getGroup()

      fireEvent.mouseEnter(group)
      flushTransitions()
      expectChildMenuOpen()

      fireEvent.click(getItem('Email link'))

      expectChildMenuOpen()

      flushTransitions()

      expectChildMenuClosed()
      expectSelected(group)
    })

    it('closes right away, outside a transition, when a sibling item becomes active', () => {
      renderMenu()

      const group = getGroup()

      fireEvent.mouseEnter(group)
      flushTransitions()
      expectChildMenuOpen()

      fireEvent.mouseEnter(getItem('Expand'))

      // The end of the activation is recorded during render, at the priority of the activation
      // that caused it: the child menu is closed before anything is flushed, and flushing changes
      // nothing
      expectChildMenuClosed()
      expectIdle(group)

      flushTransitions()

      expectChildMenuClosed()
      expectIdle(group)
    })
  })
})
