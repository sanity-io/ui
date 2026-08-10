/** @vitest-environment jsdom */

import {type ComponentProps} from 'react'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {responsiveGridItemStyle} from '../../styles/grid/gridItemStyle'
import {Box} from './box'

vi.mock('../../styles/grid/gridItemStyle', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../styles/grid/gridItemStyle')>()

  return {
    ...actual,
    responsiveGridItemStyle: vi.fn(actual.responsiveGridItemStyle),
  }
})

describe('<Box />', () => {
  const mockedResponsiveGridItemStyle = vi.mocked(responsiveGridItemStyle)

  beforeEach(() => {
    mockedResponsiveGridItemStyle.mockClear()
  })

  it('uses gridColumn when provided', () => {
    render(<Box gridColumn={4} />)

    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$column: [4]}),
    )
  })

  it('supports responsive arrays with gridColumn', () => {
    const gridColumn: ComponentProps<typeof Box>['gridColumn'] = [2, 'full']

    render(<Box gridColumn={gridColumn} />)

    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$column: [2, 'full']}),
    )
  })

  it('uses gridColumnStart when provided', () => {
    render(<Box gridColumnStart={4} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$columnStart: [4]}),
    )
  })

  it('uses gridColumnEnd when provided', () => {
    render(<Box gridColumnEnd={5} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$columnEnd: [5]}),
    )
  })

  it('uses gridRow when provided', () => {
    render(<Box gridRow={2} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(expect.objectContaining({$row: [2]}))
  })

  it('uses gridRowStart when provided', () => {
    render(<Box gridRowStart={4} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$rowStart: [4]}),
    )
  })

  it('uses gridRowEnd when provided', () => {
    render(<Box gridRowEnd={5} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$rowEnd: [5]}),
    )
  })
})
