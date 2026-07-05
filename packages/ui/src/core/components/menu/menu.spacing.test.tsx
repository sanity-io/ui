/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test'
import {Stack} from '../../primitives'
import {Menu} from './menu'

vi.mock('../../primitives', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives')>()

  return {
    ...actual,
    // oxlint-disable-next-line no-unsafe-type-assertion
    Stack: vi.fn((props: Record<string, unknown>) => (actual.Stack as any).render(props, null)),
  }
})

vi.mock('../../utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../utils')>()

  return {
    ...actual,
    useLayer: () => ({isTopLayer: true}),
  }
})

describe('components/menu spacing', () => {
  const mockedStack = vi.mocked(Stack)

  beforeEach(() => {
    mockedStack.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    render(
      // oxlint-disable-next-line no-deprecated
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
      // oxlint-disable-next-line no-deprecated
      <Menu gap={3} space={1}>
        <div>Item</div>
      </Menu>,
    )
    const propsList = mockedStack.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({gap: 3}))
    expect(propsList).not.toContainEqual(expect.objectContaining({gap: 1}))
  })
})
