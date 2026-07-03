/** @jest-environment jsdom */

import {render} from '../../../../test'
import {Select} from './select'
import {selectStyle} from './styles'

jest.mock('./styles', () => {
  const actual = jest.requireActual('./styles')

  return {
    ...actual,
    selectStyle: {
      ...actual.selectStyle,
      input: jest.fn(actual.selectStyle.input),
    },
  }
})

describe('primitives/select spacing', () => {
  const mockedSelectInputStyle = jest.mocked(selectStyle.input)

  beforeEach(() => {
    mockedSelectInputStyle.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    render(
      <Select space={2}>
        <option>Option A</option>
      </Select>,
    )
    expect(mockedSelectInputStyle).toHaveBeenCalledWith(expect.objectContaining({$space: [2]}))

    mockedSelectInputStyle.mockClear()
    render(
      <Select gap={2}>
        <option>Option A</option>
      </Select>,
    )
    expect(mockedSelectInputStyle).toHaveBeenCalledWith(expect.objectContaining({$space: [2]}))
  })

  it('should prefer `gap` over `space` when both are provided', () => {
    render(
      <Select gap={3} space={1}>
        <option>Option A</option>
      </Select>,
    )
    expect(mockedSelectInputStyle).toHaveBeenCalledWith(expect.objectContaining({$space: [3]}))
    expect(mockedSelectInputStyle).not.toHaveBeenCalledWith(expect.objectContaining({$space: [1]}))
  })
})
