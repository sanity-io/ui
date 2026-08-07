/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Stack} from '../../primitives/stack/stack'
import {Menu} from './menu'

vi.mock('../../primitives/stack/stack', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives/stack/stack')>()

  return {
    ...actual,
    // oxlint-disable-next-line no-unsafe-type-assertion
    Stack: vi.fn((props: Record<string, unknown>) => (actual.Stack as any)(props)),
  }
})

vi.mock('../../utils/layer/useLayer', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../utils/layer/useLayer')>()

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

  it('should support `gap`', () => {
    render(
      <Menu gap={2}>
        <div>Item</div>
      </Menu>,
    )
    expect(mockedStack.mock.calls.map(([props]) => props)).toContainEqual(
      expect.objectContaining({gap: 2}),
    )
  })
})
