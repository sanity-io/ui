/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '../../../../test/utils'
import {Stack} from '../../primitives/stack/stack'
import {Tree} from './tree'
import {TreeItem} from './treeItem'

vi.mock('../../primitives/stack/stack', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives/stack/stack')>()

  return {
    ...actual,
    // oxlint-disable-next-line no-unsafe-type-assertion
    Stack: vi.fn((props: Record<string, unknown>) => (actual.Stack as any)(props)),
  }
})

describe('components/tree accessibility', () => {
  it('Axe: should have no violations', async () => {
    const {container} = render(
      <Tree aria-label="Fruit">
        <TreeItem expanded text="Fruit">
          <TreeItem text="Oranges" />
          <TreeItem expanded href="/apples" text="Apples">
            <TreeItem href="/apples/fuji" text="Fuji" />
          </TreeItem>
        </TreeItem>
        <TreeItem text="Vegetables">
          <TreeItem text="Carrots" />
        </TreeItem>
      </Tree>,
    )

    expect(await axe(container.outerHTML)).toHaveNoViolations()
  })
})

describe('components/tree spacing', () => {
  const mockedStack = vi.mocked(Stack)

  beforeEach(() => {
    mockedStack.mockClear()
  })

  it('should support `gap`', () => {
    render(
      <Tree gap={2}>
        <TreeItem text="Item 1" />
      </Tree>,
    )
    expect(mockedStack.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: 2}),
    )
  })
})
