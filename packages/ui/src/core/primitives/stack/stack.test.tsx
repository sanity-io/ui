/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Stack} from './stack'
import {responsiveStackSpaceStyle} from './styles'

vi.mock('./styles', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./styles')>()

  return {
    ...actual,
    responsiveStackSpaceStyle: vi.fn(actual.responsiveStackSpaceStyle),
  }
})

describe('primitives/stack', () => {
  const mockedResponsiveStackSpaceStyle = vi.mocked(responsiveStackSpaceStyle)
  beforeEach(() => {
    mockedResponsiveStackSpaceStyle.mockClear()
  })

  it('should support `gap`', () => {
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
})
