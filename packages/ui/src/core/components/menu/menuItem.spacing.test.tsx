/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Flex} from '../../primitives/flex/flex'
import {MenuContext, MenuContextValue} from './menuContext'
import {MenuItem} from './menuItem'

vi.mock('../../primitives/flex/flex', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives/flex/flex')>()

  return {
    ...actual,
    // oxlint-disable-next-line no-unsafe-type-assertion
    Flex: vi.fn((props: Record<string, unknown>) => (actual.Flex as any).render(props, null)),
  }
})

const menuContextValue: MenuContextValue = {
  version: 2,
  activeElement: null,
  mount: () => () => undefined,
  onItemMouseEnter: () => undefined,
  onItemMouseLeave: () => undefined,
}

function renderMenuItem(props: Partial<React.ComponentProps<typeof MenuItem>> = {}) {
  return render(
    <MenuContext.Provider value={menuContextValue}>
      <MenuItem id="menu-item" text="Menu item" {...props} />
    </MenuContext.Provider>,
  )
}

describe('components/menuItem spacing', () => {
  const mockedFlex = vi.mocked(Flex)

  beforeEach(() => {
    mockedFlex.mockClear()
  })

  it('should support `gap`', () => {
    renderMenuItem({gap: 2})
    expect(mockedFlex.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: 2}),
    )
  })
})
