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

  it('should support `gap`', () => {
    render(<TextInput gap={2} icon={() => null} />)

    expect(mockedResponsiveInputPaddingStyle).toHaveBeenCalledWith(
      expect.objectContaining({$space: [2]}),
    )
  })
})
