/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test'
import {Stack} from '../../primitives'
import {Tree} from './tree'
import {TreeItem} from './treeItem'

vi.mock('../../primitives', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives')>()

  return {
    ...actual,
    Stack: vi.fn((props: Record<string, unknown>) => (actual.Stack as any).render(props, null)),
  }
})

describe('components/tree spacing', () => {
  const mockedStack = vi.mocked(Stack)

  beforeEach(() => {
    mockedStack.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    render(
      <Tree space={2}>
        <TreeItem text="Item 1" />
      </Tree>,
    )
    expect(mockedStack.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: 2}),
    )

    mockedStack.mockClear()
    render(
      <Tree gap={2}>
        <TreeItem text="Item 1" />
      </Tree>,
    )
    expect(mockedStack.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: 2}),
    )
  })

  it('should prefer `gap` over `space` when both are provided', () => {
    render(
      <Tree gap={3} space={1}>
        <TreeItem text="Item 1" />
      </Tree>,
    )
    const propsList = mockedStack.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({gap: 3}))
    expect(propsList).not.toContainEqual(expect.objectContaining({gap: 1}))
  })
})
