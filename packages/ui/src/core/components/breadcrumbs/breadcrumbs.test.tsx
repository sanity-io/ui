/** @vitest-environment jsdom */

import {fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {startTransition} from 'react'
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Box} from '../../primitives/box/box'
import {Breadcrumbs} from './breadcrumbs'

vi.mock('../../primitives/box/box', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives/box/box')>()

  return {
    ...actual,
    // oxlint-disable-next-line no-unsafe-type-assertion
    Box: vi.fn((props: Record<string, unknown>) => (actual.Box as any)(props)),
  }
})

// A pass-through spy on `startTransition`, so that the tests can tell which state updates run
// inside a transition (`react` is externalized, so its namespace cannot be spied on directly)
vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()

  return {...actual, startTransition: vi.fn(actual.startTransition)}
})

function renderBreadcrumbs(props: Partial<React.ComponentProps<typeof Breadcrumbs>> = {}) {
  return render(
    <Breadcrumbs {...props}>
      <span>Root</span>
      <span>Section</span>
    </Breadcrumbs>,
  )
}

describe('components/breadcrumbs spacing', () => {
  const mockedBox = vi.mocked(Box)

  beforeEach(() => {
    mockedBox.mockClear()
  })

  it('should support `gap`', () => {
    renderBreadcrumbs({gap: 2})
    expect(mockedBox.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({paddingX: [2]}),
    )
  })
})

describe('components/breadcrumbs collapsed items popover', () => {
  const transition = vi.mocked(startTransition)

  /** Collapses `Section`, `Subsection` and `Page` behind the expand button */
  function renderCollapsed() {
    return render(
      <Breadcrumbs maxLength={3}>
        <span>Root</span>
        <span>Section</span>
        <span>Subsection</span>
        <span>Page</span>
        <span>Item</span>
      </Breadcrumbs>,
    )
  }

  function getExpandButton() {
    return screen.getByRole('button', {name: '…'})
  }

  function expectExpanded() {
    expect(screen.getByText('Subsection')).toBeVisible()
    expect(getExpandButton()).toHaveAttribute('data-selected')
  }

  function expectCollapsed() {
    expect(screen.queryByText('Subsection')).not.toBeVisible()
    expect(getExpandButton()).not.toHaveAttribute('data-selected')
  }

  /**
   * Runs `fn` with `startTransition` dropping its scope instead of running it, so that a state
   * update inside the scope does not happen: what still changes was not updated in a transition.
   * Returns how many transitions `fn` started.
   */
  function countDroppedTransitions(fn: () => void): number {
    transition.mockImplementation(() => undefined)
    fn()

    const count = transition.mock.calls.length

    transition.mockReset()

    return count
  }

  beforeEach(() => {
    transition.mockClear()
  })

  afterEach(() => {
    transition.mockReset()
  })

  it('renders the collapsed items behind an expand button', () => {
    renderCollapsed()

    expect(screen.getByText('Root')).toBeVisible()
    expect(screen.getByText('Item')).toBeVisible()
    expect(getExpandButton()).toBeVisible()
    // Not rendered until the popover opens or is about to
    expect(screen.queryByText('Subsection')).not.toBeInTheDocument()
    expect(transition).not.toHaveBeenCalled()
  })

  it('expands in a transition when the expand button is clicked', () => {
    renderCollapsed()

    expect(countDroppedTransitions(() => fireEvent.click(getExpandButton()))).toBe(1)
    expect(screen.queryByText('Subsection')).not.toBeInTheDocument()
    expect(getExpandButton()).not.toHaveAttribute('data-selected')

    fireEvent.click(getExpandButton())

    expect(transition).toHaveBeenCalledTimes(1)
    expectExpanded()
  })

  it('collapses in a transition when the expand button is clicked again', () => {
    renderCollapsed()

    fireEvent.click(getExpandButton())
    expectExpanded()
    transition.mockClear()

    expect(countDroppedTransitions(() => fireEvent.click(getExpandButton()))).toBe(1)
    expectExpanded()

    fireEvent.click(getExpandButton())

    expect(transition).toHaveBeenCalledTimes(1)
    expectCollapsed()
  })

  it('collapses in a transition on a click outside', () => {
    renderCollapsed()

    fireEvent.click(getExpandButton())
    expectExpanded()
    transition.mockClear()

    // A press inside the popover is not outside
    fireEvent.mouseDown(screen.getByText('Subsection'))

    expect(transition).not.toHaveBeenCalled()
    expectExpanded()

    expect(countDroppedTransitions(() => fireEvent.mouseDown(document.body))).toBe(1)
    expectExpanded()

    fireEvent.mouseDown(document.body)

    expect(transition).toHaveBeenCalledTimes(1)
    expectCollapsed()
  })
})
