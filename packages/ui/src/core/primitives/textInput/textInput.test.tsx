/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {responsiveInputPaddingStyle} from '../../styles/input/responsiveInputPaddingStyle'
import {TextInput} from './textInput'

vi.mock('../../styles/input/responsiveInputPaddingStyle', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../styles/input/responsiveInputPaddingStyle')>()

  return {
    ...actual,
    responsiveInputPaddingStyle: vi.fn(actual.responsiveInputPaddingStyle),
  }
})

describe('primitives/textInput', () => {
  const mockedResponsiveInputPaddingStyle = vi.mocked(responsiveInputPaddingStyle)

  beforeEach(() => {
    mockedResponsiveInputPaddingStyle.mockClear()
  })

  it('should support `space` and `gap` with the same behavior', () => {
    // oxlint-disable-next-line no-deprecated
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
    // oxlint-disable-next-line no-deprecated
    render(<TextInput gap={3} icon={() => null} space={1} />)

    expect(mockedResponsiveInputPaddingStyle).toHaveBeenCalledWith(
      expect.objectContaining({$space: [3]}),
    )
    expect(mockedResponsiveInputPaddingStyle).not.toHaveBeenCalledWith(
      expect.objectContaining({$space: [1]}),
    )
  })
})
