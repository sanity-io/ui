/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test'
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

  it('should support `space` and `gap` with the same behavior', () => {
    render(
      // oxlint-disable-next-line no-deprecated
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
      // oxlint-disable-next-line no-deprecated
      <Inline gap={3} space={1}>
        <span>One</span>
        <span>Two</span>
      </Inline>,
    )
    expect(mockedInlineSpaceStyle).toHaveBeenCalledWith(expect.objectContaining({$space: [3]}))
  })
})
