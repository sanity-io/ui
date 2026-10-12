/** @vitest-environment jsdom */

import {act, fireEvent, screen, waitFor} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {Profiler, startTransition, use} from 'react'
import {describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Button} from '../../primitives/button/button'
import {LayerProvider} from '../../utils/layer/layerProvider'
import {Menu} from './menu'
import {MenuButton} from './menuButton'
import {MenuGroup} from './menuGroup'
import {MenuItem} from './menuItem'

// jsdom lays nothing out, so Floating UI's `hide` middleware would hide every popover, and jsdom
// does not move focus into hidden elements
vi.mock('@floating-ui/react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@floating-ui/react-dom')>()

  return {...actual, hide: () => ({name: 'hide', fn: () => ({})})}
})

// A pass-through spy on `startTransition`, so that a test can drop the updates made inside it
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()

  return {...actual, startTransition: vi.fn(actual.startTransition)}
})

function renderMenu(
  props: {as?: 'a' | 'button'; children?: React.ReactNode; onCommit?: () => void} = {},
) {
  return render(
    <LayerProvider>
      <Profiler id="menu" onRender={() => props.onCommit?.()}>
        <Menu>
          <MenuItem text="Search" />
          <MenuGroup as={props.as} text="More">
            {props.children ?? <MenuItem text="Email link" />}
            <MenuItem text="Messages" />
          </MenuGroup>
          <MenuItem text="Expand" />
        </Menu>
      </Profiler>
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
  return screen.getByText(text).closest<HTMLElement>('[data-ui="MenuItem"]')!
}

function getChildMenu() {
  return getItem('Email link').closest<HTMLElement>('[data-ui="Menu"]')!
}

/** The item's state as its styles read it, and whether its child menu is shown */
function readGroup() {
  const group = getGroup()
  const popover = document.querySelector<HTMLElement>('[data-ui="MenuGroup__popover"]')
  let state = 'idle'

  if (group.getAttribute('aria-pressed') === 'true' || group.hasAttribute('data-pressed')) {
    state = 'pressed'
  } else if (group.hasAttribute('data-selected')) {
    state = 'selected'
  }

  // A child menu that has rendered stays in the DOM when closed, hidden by `Activity`
  return `${state}, ${popover?.style.display === '' ? 'open' : 'closed'}`
}

describe('MenuGroup', () => {
  it.each(['button', 'a'] as const)(
    'opens on hover, and is pressed while the pointer is in the child menu (as %s)',
    (as) => {
      renderMenu({as})
      expect(readGroup()).toBe('idle, closed')

      fireEvent.mouseEnter(getGroup())
      expect(readGroup()).toBe('selected, open')

      fireEvent.mouseEnter(getChildMenu())
      expect(readGroup()).toBe('pressed, open')

      fireEvent.mouseEnter(getGroup())
      expect(readGroup()).toBe('selected, open')
    },
  )

  it('closes the child menu in the commit that makes a sibling item active', () => {
    const commits: string[] = []

    renderMenu({onCommit: () => commits.push(readGroup())})
    fireEvent.mouseEnter(getGroup())
    fireEvent.mouseEnter(getChildMenu())
    commits.length = 0

    fireEvent.mouseEnter(getItem('Expand'))

    expect(new Set(commits)).toEqual(new Set(['idle, closed']))
  })

  it('reopens the child menu on hover after a sibling was active, but not from the keyboard', async () => {
    renderMenu()

    fireEvent.mouseEnter(getGroup())
    fireEvent.mouseEnter(getItem('Expand'))
    fireEvent.mouseEnter(getGroup())
    expect(readGroup()).toBe('selected, open')

    fireEvent.mouseEnter(getItem('Expand'))
    fireEvent.keyDown(getMenu(), {key: 'ArrowUp'})
    await waitFor(() => expect(getGroup()).toHaveFocus())
    expect(readGroup()).toBe('selected, closed')
  })

  it('opens pressed on `ArrowRight` and closes on `ArrowLeft`, moving focus in and out', async () => {
    renderMenu()
    // Focused from outside the menu, so `ArrowRight` has to make it the active item
    act(() => getGroup().focus())

    fireEvent.keyDown(getGroup(), {key: 'ArrowRight'})
    expect(readGroup()).toBe('pressed, open')
    await waitFor(() => expect(getItem('Email link')).toHaveFocus())

    fireEvent.keyDown(getItem('Email link'), {key: 'ArrowLeft'})
    expect(readGroup()).toBe('selected, closed')
    await waitFor(() => expect(getGroup()).toHaveFocus())

    // `Enter` clicks the item, which opens the child menu without pressing it
    fireEvent.click(getGroup())
    expect(readGroup()).toBe('selected, open')
    await waitFor(() => expect(getItem('Email link')).toHaveFocus())
  })

  it('opens on click without a preceding hover, and closes when a child item is clicked', () => {
    renderMenu()

    fireEvent.click(getGroup())
    expect(readGroup()).toBe('selected, open')

    fireEvent.click(getItem('Email link'))
    expect(readGroup()).toBe('selected, closed')
  })

  it('shows the child menu closed when the menu of a `MenuButton` reopens', () => {
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
    expect(readGroup()).toBe('selected, open')

    // The closed menu stays rendered, hidden, with its state
    fireEvent.keyDown(window, {key: 'Escape'})
    fireEvent.click(button)
    expect(readGroup()).toBe('idle, closed')
  })

  it('does not show the child menu for an open still pending when a sibling became active', async () => {
    const content = Promise.withResolvers<void>()

    function SuspendingItem() {
      use(content.promise)

      return <MenuItem text="Email link" />
    }

    renderMenu({children: <SuspendingItem />})

    // The open transition suspends on the child menu's content, so nothing of it commits
    await act(async () => fireEvent.mouseEnter(getGroup()))
    expect(readGroup()).toBe('selected, closed')

    await act(async () => fireEvent.mouseEnter(getItem('Expand')))
    await act(async () => {
      content.resolve()
      await content.promise
    })

    fireEvent.keyDown(getMenu(), {key: 'ArrowUp'})
    await waitFor(() => expect(getGroup()).toHaveFocus())
    expect(readGroup()).toBe('selected, closed')
  })

  describe('transitions', () => {
    /** Runs `fn` with `startTransition` dropping its scope: what still changes was not in one */
    function withoutTransitions(fn: () => void) {
      vi.mocked(startTransition).mockImplementation(() => undefined)

      try {
        fn()
      } finally {
        vi.mocked(startTransition).mockReset()
      }
    }

    it('opens the child menu in a transition, and selects the item right away', async () => {
      renderMenu()

      withoutTransitions(() => fireEvent.mouseEnter(getGroup()))
      expect(readGroup()).toBe('selected, closed')

      withoutTransitions(() => fireEvent.click(getGroup()))
      expect(readGroup()).toBe('selected, closed')

      await waitFor(() => expect(getGroup()).toHaveFocus())
      withoutTransitions(() => fireEvent.keyDown(getGroup(), {key: 'ArrowRight'}))
      expect(readGroup()).toBe('selected, closed')
    })

    it('closes the child menu in a transition', () => {
      renderMenu()
      fireEvent.mouseEnter(getGroup())

      withoutTransitions(() => fireEvent.keyDown(getItem('Email link'), {key: 'ArrowLeft'}))
      expect(readGroup()).toBe('selected, open')

      withoutTransitions(() => fireEvent.click(getItem('Email link')))
      expect(readGroup()).toBe('selected, open')
    })
  })
})
