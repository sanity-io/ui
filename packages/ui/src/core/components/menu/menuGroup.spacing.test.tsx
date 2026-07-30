/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Flex} from '../../primitives/flex/flex'
import {MenuContext, MenuContextValue} from './menuContext'
import {MenuGroup} from './menuGroup'
import {MenuItem} from './menuItem'

vi.mock('../../primitives/flex/flex', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives/flex/flex')>()

  return {
    ...actual,
    // oxlint-disable-next-line no-unsafe-type-assertion
    Flex: vi.fn((props: Record<string, unknown>) => (actual.Flex as any)(props)),
  }
})

vi.mock('../../primitives/popover/popover', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives/popover/popover')>()

  return {
    ...actual,
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

  it('should support `gap`', () => {
    renderMenuGroup({gap: 2})
    expect(mockedFlex.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: 2}),
    )
  })
})
