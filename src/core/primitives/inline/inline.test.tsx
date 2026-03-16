/** @jest-environment jsdom */

import {render} from '../../../../test'
import {Inline} from './inline'
import {inlineSpaceStyle} from './styles'

jest.mock('./styles', () => {
  const actual = jest.requireActual('./styles')

  return {
    ...actual,
    inlineSpaceStyle: jest.fn(actual.inlineSpaceStyle),
  }
})

describe('primitives/inline', () => {
  const mockedInlineSpaceStyle = jest.mocked(inlineSpaceStyle)

  beforeEach(() => {
    mockedInlineSpaceStyle.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    render(
      <Inline space={2}>
        <span>One</span>
        <span>Two</span>
      </Inline>,
    )
    expect(mockedInlineSpaceStyle).toHaveBeenCalledWith(expect.objectContaining({$space: [2]}))

    mockedInlineSpaceStyle.mockClear()
    render(
      <Inline gap={2}>
        <span>One</span>
        <span>Two</span>
      </Inline>,
    )
    expect(mockedInlineSpaceStyle).toHaveBeenCalledWith(expect.objectContaining({$space: [2]}))
  })

  it('should prefer `gap` over `space` when both are provided', () => {
    render(
      <Inline gap={3} space={1}>
        <span>One</span>
        <span>Two</span>
      </Inline>,
    )
    expect(mockedInlineSpaceStyle).toHaveBeenCalledWith(expect.objectContaining({$space: [3]}))
  })
})
