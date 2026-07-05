/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test'
import {inlineSpaceStyle} from '../../primitives/inline/styles'
import {Tab} from './tab'
import {TabList} from './tabList'

vi.mock('../../primitives/inline/styles', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../primitives/inline/styles')>()

  return {
    ...actual,
    inlineSpaceStyle: vi.fn(actual.inlineSpaceStyle),
  }
})

describe('components/tabList', () => {
  const mockedInlineSpaceStyle = vi.mocked(inlineSpaceStyle)

  beforeEach(() => {
    mockedInlineSpaceStyle.mockClear()
  })

  function renderTabList(
    props: Partial<React.ComponentProps<typeof TabList>> = {},
  ): ReturnType<typeof render> {
    return render(
      <TabList {...props}>
        <Tab aria-controls="tab-panel-a" id="tab-a" label="Tab A" />
        <Tab aria-controls="tab-panel-b" id="tab-b" label="Tab B" />
      </TabList>,
    )
  }

  it('should support `space` and `gap` with the same behavior', () => {
    renderTabList({space: 2})
    expect(mockedInlineSpaceStyle).toHaveBeenCalledWith(expect.objectContaining({$space: [2]}))

    mockedInlineSpaceStyle.mockClear()
    renderTabList({gap: 2})
    expect(mockedInlineSpaceStyle).toHaveBeenCalledWith(expect.objectContaining({$space: [2]}))
  })

  it('should prefer `gap` over `space` when both are provided', () => {
    renderTabList({gap: 3, space: 1})
    expect(mockedInlineSpaceStyle).toHaveBeenCalledWith(expect.objectContaining({$space: [3]}))
  })
})
