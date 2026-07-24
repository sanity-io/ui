/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test'
import {Box} from '../../primitives'
import {TreeContext} from './treeContext'
import {TreeItem} from './treeItem'
import {TreeContextValue, TreeState} from './types'

vi.mock('../../primitives', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives')>()

  return {
    ...actual,
    // oxlint-disable-next-line no-unsafe-type-assertion
    Box: vi.fn((props: Record<string, unknown>) => (actual.Box as any).render(props, null)),
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
  // oxlint-disable-next-line no-deprecated
  space: 1,
  // oxlint-disable-next-line no-unnecessary-type-assertion
  state: {} as TreeState,
}

function renderTreeItem(props: Partial<React.ComponentProps<typeof TreeItem>> = {}) {
  return render(
    <TreeContext.Provider value={treeContextValue}>
      <TreeItem text="Item" {...props} />
    </TreeContext.Provider>,
  )
}

describe('components/treeItem links', () => {
  it('renders an anchor with the href by default', () => {
    const {container} = renderTreeItem({href: '/foo'})
    const box = container.querySelector('[data-ui="TreeItem__box"]')

    expect(box?.tagName).toBe('A')
    expect(box).toHaveAttribute('href', '/foo')
    expect(box).toHaveAttribute('role', 'treeitem')
    expect(box).toHaveAttribute('data-as', 'a')
  })

  it('renders a custom `linkAs` component without leaking `as` into its props', () => {
    const receivedProps: Record<string, unknown>[] = []

    function CustomLink({children, ...props}: React.ComponentProps<'a'>) {
      receivedProps.push(props)

      return (
        <a data-custom-link="" {...props}>
          {children}
        </a>
      )
    }

    const {container} = renderTreeItem({href: '/foo', linkAs: CustomLink})
    const box = container.querySelector('[data-ui="TreeItem__box"]')

    expect(box?.tagName).toBe('A')
    expect(box).toHaveAttribute('data-custom-link')
    expect(box).toHaveAttribute('href', '/foo')
    expect(box).toHaveAttribute('role', 'treeitem')

    expect(receivedProps.length).toBeGreaterThan(0)
    for (const props of receivedProps) {
      // `next/link` and friends treat `as` as a URL override, so the styled
      // wrapper must not forward its element type to the custom component
      expect(props).not.toHaveProperty('as')
      expect(props).not.toHaveProperty('forwardedAs')
      expect(props).toHaveProperty('href', '/foo')
      // The TreeItem styles must be applied to the custom component
      expect(props.className).toBeTruthy()
    }
  })

  it('renders a plain element without href', () => {
    const {container} = renderTreeItem({})
    const box = container.querySelector('[data-ui="TreeItem__box"]')

    expect(box?.tagName).toBe('DIV')
    expect(box).not.toHaveAttribute('as')
    expect(box).not.toHaveAttribute('href')
  })
})

describe('components/treeItem spacing', () => {
  const mockedBox = vi.mocked(Box)

  beforeEach(() => {
    mockedBox.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    // oxlint-disable-next-line no-deprecated
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
    // oxlint-disable-next-line no-deprecated
    renderTreeItem({gap: 3, space: 1})
    const propsList = mockedBox.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({marginRight: 3}))
    expect(propsList).not.toContainEqual(expect.objectContaining({marginRight: 1}))
  })
})
