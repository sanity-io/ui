/** @jest-environment jsdom */

import {render} from '../../../../test'
import {Flex} from '../../primitives'
import {MenuContext, MenuContextValue} from './menuContext'
import {MenuItem} from './menuItem'

jest.mock('../../primitives', () => {
  const actual = jest.requireActual('../../primitives')

  return {
    ...actual,
    Flex: jest.fn((props: Record<string, unknown>) => (actual.Flex as any).render(props, null)),
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
  const mockedFlex = jest.mocked(Flex)

  beforeEach(() => {
    mockedFlex.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    renderMenuItem({space: 2})
    expect(mockedFlex.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: 2}),
    )

    mockedFlex.mockClear()
    renderMenuItem({gap: 2})
    expect(mockedFlex.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: 2}),
    )
  })

  it('should prefer `gap` over `space` when both are provided', () => {
    renderMenuItem({gap: 3, space: 1})
    const propsList = mockedFlex.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({gap: 3}))
    expect(propsList).not.toContainEqual(expect.objectContaining({gap: 1}))
  })
})
