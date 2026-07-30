/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {responsiveGridStyle} from '../../styles/grid/gridStyle'
import {Grid} from './grid'

vi.mock('../../styles/grid/gridStyle', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../styles/grid/gridStyle')>()

  return {
    ...actual,
    responsiveGridStyle: vi.fn(actual.responsiveGridStyle),
  }
})

describe('primitives/grid', () => {
  const mockedResponsiveGridStyle = vi.mocked(responsiveGridStyle)

  beforeEach(() => {
    mockedResponsiveGridStyle.mockClear()
  })

  it('should support `gridTemplateColumns`', () => {
    render(
      <Grid gridTemplateColumns={2}>
        <div>A</div>
      </Grid>,
    )
    expect(mockedResponsiveGridStyle).toHaveBeenCalledWith(expect.objectContaining({$columns: [2]}))
  })

  it('should support `gridTemplateRows`', () => {
    render(
      <Grid gridTemplateRows={2}>
        <div>A</div>
      </Grid>,
    )
    expect(mockedResponsiveGridStyle).toHaveBeenCalledWith(expect.objectContaining({$rows: [2]}))
  })
})
