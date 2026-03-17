/** @jest-environment jsdom */

import {render} from '../../../../test'
import {Stack} from './stack'
import {responsiveStackSpaceStyle} from './styles'

jest.mock('./styles', () => {
  const actual = jest.requireActual('./styles')

  return {
    ...actual,
    responsiveStackSpaceStyle: jest.fn(actual.responsiveStackSpaceStyle),
  }
})

describe('primitives/stack', () => {
  const mockedResponsiveStackSpaceStyle = jest.mocked(responsiveStackSpaceStyle)
  beforeEach(() => {
    mockedResponsiveStackSpaceStyle.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    render(
      <Stack space={2}>
        <span>One</span>
        <span>Two</span>
      </Stack>,
    )

    expect(mockedResponsiveStackSpaceStyle).toHaveBeenCalledWith(
      expect.objectContaining({$space: [2]}),
    )
    mockedResponsiveStackSpaceStyle.mockClear()
    render(
      <Stack gap={2}>
        <span>One</span>
        <span>Two</span>
      </Stack>,
    )

    expect(mockedResponsiveStackSpaceStyle).toHaveBeenCalledWith(
      expect.objectContaining({$space: [2]}),
    )
  })

  it('should prefer `gap` over `space` when both are provided', () => {
    render(
      <Stack gap={3} space={1}>
        <span>One</span>
        <span>Two</span>
      </Stack>,
    )
    expect(mockedResponsiveStackSpaceStyle).toHaveBeenCalledWith(
      expect.objectContaining({$space: [3]}),
    )
  })
})
