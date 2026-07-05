/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test'
import {Flex} from '../../primitives'
import {MenuContext, MenuContextValue} from './menuContext'
import {MenuGroup} from './menuGroup'
import {MenuItem} from './menuItem'

vi.mock('../../primitives', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives')>()

  return {
    ...actual,
    Flex: vi.fn((props: Record<string, unknown>) => (actual.Flex as any).render(props, null)),
    Popover: vi.fn(({children}: {children?: React.ReactNode}) => children),
  }
})

const menuContextValue: MenuContextValue = {
  version: 2,
  activeElement: null,
  mount: () => () => undefined,
  onItemMouseEnter: () => undefined,
  onItemMouseLeave: () => undefined,
}

function renderMenuGroup(props: Partial<React.ComponentProps<typeof MenuGroup>> = {}) {
  return render(
    <MenuContext.Provider value={menuContextValue}>
      <MenuGroup id="menu-group" text="Menu group" {...props}>
        <MenuItem id="submenu-item" text="Submenu item" />
      </MenuGroup>
    </MenuContext.Provider>,
  )
}

describe('components/menuGroup spacing', () => {
  const mockedFlex = vi.mocked(Flex)

  beforeEach(() => {
    mockedFlex.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    renderMenuGroup({space: 2})
    expect(mockedFlex.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: 2}),
    )

    mockedFlex.mockClear()
    renderMenuGroup({gap: 2})
    expect(mockedFlex.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: 2}),
    )
  })

  it('should prefer `gap` over `space` when both are provided', () => {
    renderMenuGroup({gap: 3, space: 1})
    const propsList = mockedFlex.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({gap: 3}))
    expect(propsList).not.toContainEqual(expect.objectContaining({gap: 1}))
  })
})
