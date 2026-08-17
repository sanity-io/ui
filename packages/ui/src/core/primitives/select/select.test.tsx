/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Select} from './select'
import {selectStyle} from './styles'

vi.mock('./styles', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./styles')>()

  return {
    ...actual,
    selectStyle: {
      ...actual.selectStyle,
      input: vi.fn(actual.selectStyle.input),
    },
  }
})

describe('primitives/select spacing', () => {
  const mockedSelectInputStyle = vi.mocked(selectStyle.input)

  beforeEach(() => {
    mockedSelectInputStyle.mockClear()
  })

  it('should support `gap`', () => {
    render(
      <Select gap={2}>
        <option>Option A</option>
      </Select>,
    )
    expect(mockedSelectInputStyle).toHaveBeenCalledWith(expect.objectContaining({$space: [2]}))
  })
})
