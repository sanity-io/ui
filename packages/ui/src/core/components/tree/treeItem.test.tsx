/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Box} from '../../primitives/box/box'
import {TreeContext} from './treeContext'
import {TreeItem} from './treeItem'
import {TreeContextValue, TreeState} from './types'

vi.mock('../../primitives/box/box', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives/box/box')>()

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

  it('forwards `linkProps` to the link, without overriding controlled props', () => {
    const receivedProps: Record<string, unknown>[] = []

    function CustomLink({children, ...props}: React.ComponentProps<'a'> & {prefetch?: boolean}) {
      receivedProps.push(props)

      const {prefetch, ...anchorProps} = props

      return (
        <a data-prefetch={prefetch} {...anchorProps}>
          {children}
        </a>
      )
    }

    renderTreeItem({
      href: '/foo',
      linkAs: CustomLink,
      linkProps: {prefetch: true, hrefLang: 'en', href: '/overridden', role: 'button'},
    })

    expect(receivedProps.length).toBeGreaterThan(0)
    for (const props of receivedProps) {
      expect(props).toHaveProperty('prefetch', true)
      expect(props).toHaveProperty('hrefLang', 'en')
      // Props controlled by TreeItem take precedence over `linkProps`
      expect(props).toHaveProperty('href', '/foo')
      expect(props).toHaveProperty('role', 'treeitem')
    }
  })
})

describe('components/treeItem spacing', () => {
  const mockedBox = vi.mocked(Box)

  beforeEach(() => {
    mockedBox.mockClear()
  })

  it('should support `gap`', () => {
    renderTreeItem({gap: 2})
    expect(mockedBox.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({marginRight: 2}),
    )
  })
})
