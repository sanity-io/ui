/** @jest-environment jsdom */

import {render} from '../../../../test'
import {Box} from '../../primitives'
import {Breadcrumbs} from './breadcrumbs'

jest.mock('../../primitives', () => {
  const actual = jest.requireActual('../../primitives')

  return {
    ...actual,
    Box: jest.fn((props: Record<string, unknown>) => (actual.Box as any).render(props, null)),
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
  const mockedBox = jest.mocked(Box)

  beforeEach(() => {
    mockedBox.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
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
    renderBreadcrumbs({gap: 3, space: 1})
    const propsList = mockedBox.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({paddingX: [3]}))
    expect(propsList).not.toContainEqual(expect.objectContaining({paddingX: [1]}))
  })
})
