/** @vitest-environment jsdom */

import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test'
import {responsiveGridStyle} from '../../styles/internal'
import {Grid} from './grid'

vi.mock('../../styles/internal', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../styles/internal')>()

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

  it('should support `columns` and `gridTemplateColumns` with the same behavior', () => {
    render(
      <Grid columns={2}>
        <div>A</div>
      </Grid>,
    )
    expect(mockedResponsiveGridStyle).toHaveBeenCalledWith(expect.objectContaining({$columns: [2]}))

    mockedResponsiveGridStyle.mockClear()
    render(
      <Grid gridTemplateColumns={2}>
        <div>A</div>
      </Grid>,
    )
    expect(mockedResponsiveGridStyle).toHaveBeenCalledWith(expect.objectContaining({$columns: [2]}))
  })

  it('should prefer `gridTemplateColumns` over `columns` when both are provided', () => {
    render(
      <Grid columns={1} gridTemplateColumns={3}>
        <div>A</div>
      </Grid>,
    )
    expect(mockedResponsiveGridStyle).toHaveBeenCalledWith(expect.objectContaining({$columns: [3]}))
    expect(mockedResponsiveGridStyle).not.toHaveBeenCalledWith(
      expect.objectContaining({$columns: [1]}),
    )
  })

  it('should support `rows` and `gridTemplateRows` with the same behavior', () => {
    render(
      <Grid rows={2}>
        <div>A</div>
      </Grid>,
    )
    expect(mockedResponsiveGridStyle).toHaveBeenCalledWith(expect.objectContaining({$rows: [2]}))

    mockedResponsiveGridStyle.mockClear()
    render(
      <Grid gridTemplateRows={2}>
        <div>A</div>
      </Grid>,
    )
    expect(mockedResponsiveGridStyle).toHaveBeenCalledWith(expect.objectContaining({$rows: [2]}))
  })

  it('should prefer `gridTemplateRows` over `rows` when both are provided', () => {
    render(
      <Grid gridTemplateRows={3} rows={1}>
        <div>A</div>
      </Grid>,
    )
    expect(mockedResponsiveGridStyle).toHaveBeenCalledWith(expect.objectContaining({$rows: [3]}))
    expect(mockedResponsiveGridStyle).not.toHaveBeenCalledWith(
      expect.objectContaining({$rows: [1]}),
    )
  })
})
