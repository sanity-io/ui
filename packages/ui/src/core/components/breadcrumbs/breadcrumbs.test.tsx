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
    Box: vi.fn((props: Record<string, unknown>) => (actual.Box as any)(props)),
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

  it('should support `gap`', () => {
    renderBreadcrumbs({gap: 2})
    expect(mockedBox.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({paddingX: [2]}),
    )
  })
})
