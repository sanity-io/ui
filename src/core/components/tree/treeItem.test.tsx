/** @jest-environment jsdom */

import {render} from '../../../../test'
import {Box} from '../../primitives'
import {TreeContext} from './treeContext'
import {TreeItem} from './treeItem'
import {TreeContextValue, TreeState} from './types'

jest.mock('../../primitives', () => {
  const actual = jest.requireActual('../../primitives')

  return {
    ...actual,
    Box: jest.fn((props: Record<string, unknown>) => (actual.Box as any).render(props, null)),
  }
})

const treeContextValue: TreeContextValue = {
  version: 0.0,
  focusedElement: null,
  gap: 1,
  level: 0,
  path: [],
  registerItem: () => () => undefined,
  setExpanded: () => undefined,
  setFocusedElement: () => undefined,
  space: 1,
  state: {} as TreeState,
}

function renderTreeItem(props: Partial<React.ComponentProps<typeof TreeItem>> = {}) {
  return render(
    <TreeContext.Provider value={treeContextValue}>
      <TreeItem text="Item" {...props} />
    </TreeContext.Provider>,
  )
}

describe('components/treeItem spacing', () => {
  const mockedBox = jest.mocked(Box)

  beforeEach(() => {
    mockedBox.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    renderTreeItem({space: 2})
    expect(mockedBox.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({marginRight: 2}),
    )

    mockedBox.mockClear()
    renderTreeItem({gap: 2})
    expect(mockedBox.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({marginRight: 2}),
    )
  })

  it('should prefer `gap` over `space` when both are provided', () => {
    renderTreeItem({gap: 3, space: 1})
    const propsList = mockedBox.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({marginRight: 3}))
    expect(propsList).not.toContainEqual(expect.objectContaining({marginRight: 1}))
  })
})
