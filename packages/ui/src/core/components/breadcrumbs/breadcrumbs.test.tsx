/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Box} from '../../primitives/box/box'
import {Breadcrumbs} from './breadcrumbs'

vi.mock('../../primitives/box/box', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives/box/box')>()

  return {
    ...actual,
    // oxlint-disable-next-line no-unsafe-type-assertion
    Box: vi.fn((props: Record<string, unknown>) => (actual.Box as any).render(props, null)),
  }
})

function renderBreadcrumbs(props: Partial<React.ComponentProps<typeof Breadcrumbs>> = {}) {
  return render(
    <Breadcrumbs {...props}>
      <span>Root</span>
      <span>Section</span>
    </Breadcrumbs>,
  )
}

describe('components/breadcrumbs spacing', () => {
  const mockedBox = vi.mocked(Box)

  beforeEach(() => {
    mockedBox.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    // oxlint-disable-next-line no-deprecated
    renderBreadcrumbs({space: 2})
    expect(mockedBox.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({paddingX: [2]}),
    )

    mockedBox.mockClear()
    renderBreadcrumbs({gap: 2})
    expect(mockedBox.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({paddingX: [2]}),
    )
  })

  it('should prefer `gap` over `space` when both are provided', () => {
    // oxlint-disable-next-line no-deprecated
    renderBreadcrumbs({gap: 3, space: 1})
    const propsList = mockedBox.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({paddingX: [3]}))
    expect(propsList).not.toContainEqual(expect.objectContaining({paddingX: [1]}))
  })
})
