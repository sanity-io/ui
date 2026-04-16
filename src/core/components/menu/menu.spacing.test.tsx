/** @jest-environment jsdom */

import {render} from '../../../../test'
import {Stack} from '../../primitives'
import {Menu} from './menu'

jest.mock('../../primitives', () => {
  const actual = jest.requireActual('../../primitives')

  return {
    ...actual,
    Stack: jest.fn((props: Record<string, unknown>) => (actual.Stack as any).render(props, null)),
  }
})

jest.mock('../../utils', () => {
  const actual = jest.requireActual('../../utils')

  return {
    ...actual,
    useLayer: () => ({isTopLayer: true}),
  }
})

describe('components/menu spacing', () => {
  const mockedStack = jest.mocked(Stack)

  beforeEach(() => {
    mockedStack.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    render(
      <Menu space={2}>
        <div>Item</div>
      </Menu>,
    )
    expect(mockedStack.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: 2}),
    )

    mockedStack.mockClear()
    render(
      <Menu gap={2}>
        <div>Item</div>
      </Menu>,
    )
    expect(mockedStack.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: 2}),
    )
  })

  it('should prefer `gap` over `space` when both are provided', () => {
    render(
      <Menu gap={3} space={1}>
        <div>Item</div>
      </Menu>,
    )
    const propsList = mockedStack.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({gap: 3}))
    expect(propsList).not.toContainEqual(expect.objectContaining({gap: 1}))
  })
})
