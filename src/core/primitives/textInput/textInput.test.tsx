/** @jest-environment jsdom */

import {render} from '../../../../test'
import {responsiveInputPaddingStyle} from '../../styles/internal'
import {TextInput} from './textInput'

jest.mock('../../styles/internal', () => {
  const actual = jest.requireActual('../../styles/internal')

  return {
    ...actual,
    responsiveInputPaddingStyle: jest.fn(actual.responsiveInputPaddingStyle),
  }
})

describe('primitives/textInput', () => {
  const mockedResponsiveInputPaddingStyle = jest.mocked(responsiveInputPaddingStyle)

  beforeEach(() => {
    mockedResponsiveInputPaddingStyle.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    render(<TextInput icon={() => null} space={2} />)

    expect(mockedResponsiveInputPaddingStyle).toHaveBeenCalledWith(
      expect.objectContaining({$space: [2]}),
    )

    mockedResponsiveInputPaddingStyle.mockClear()
    render(<TextInput gap={2} icon={() => null} />)

    expect(mockedResponsiveInputPaddingStyle).toHaveBeenCalledWith(
      expect.objectContaining({$space: [2]}),
    )
  })

  it('should prefer `gap` over `space` when both are provided', () => {
    render(<TextInput gap={3} icon={() => null} space={1} />)

    expect(mockedResponsiveInputPaddingStyle).toHaveBeenCalledWith(
      expect.objectContaining({$space: [3]}),
    )
    expect(mockedResponsiveInputPaddingStyle).not.toHaveBeenCalledWith(
      expect.objectContaining({$space: [1]}),
    )
  })
})
