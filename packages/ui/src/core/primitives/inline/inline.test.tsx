/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Inline} from './inline'
import {inlineSpaceStyle} from './styles'

vi.mock('./styles', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./styles')>()

  return {
    ...actual,
    inlineSpaceStyle: vi.fn(actual.inlineSpaceStyle),
  }
})

describe('primitives/inline', () => {
  const mockedInlineSpaceStyle = vi.mocked(inlineSpaceStyle)

  beforeEach(() => {
    mockedInlineSpaceStyle.mockClear()
  })

  it('should support `gap`', () => {
    render(
      <Inline gap={2}>
        <span>One</span>
        <span>Two</span>
      </Inline>,
    )
    expect(mockedInlineSpaceStyle).toHaveBeenCalledWith(expect.objectContaining({$space: [2]}))
  })
})
