/** @jest-environment jsdom */

import {type ComponentProps} from 'react'

import {render} from '../../../../test'
import {responsiveGridItemStyle} from '../../styles/internal'
import {Box} from './box'

jest.mock('../../styles/internal', () => {
  const actual = jest.requireActual('../../styles/internal')

  return {
    ...actual,
    responsiveGridItemStyle: jest.fn(actual.responsiveGridItemStyle),
  }
})

describe('<Box />', () => {
  const mockedResponsiveGridItemStyle = jest.mocked(responsiveGridItemStyle)

  beforeEach(() => {
    mockedResponsiveGridItemStyle.mockClear()
  })

  it('uses column when gridColumn is not provided', () => {
    render(<Box column={3} />)

    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(expect.objectContaining({$column: [3]}))
  })

  it('uses gridColumn when provided', () => {
    render(<Box gridColumn={4} />)

    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(expect.objectContaining({$column: [4]}))
  })

  it('prefers gridColumn over column when both are provided', () => {
    render(<Box column={3} gridColumn={5} />)

    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(expect.objectContaining({$column: [5]}))
    expect(mockedResponsiveGridItemStyle).not.toHaveBeenCalledWith(expect.objectContaining({$column: [3]}))
  })

  it('supports responsive arrays with gridColumn', () => {
    const gridColumn: ComponentProps<typeof Box>['gridColumn'] = [2, 'full']

    render(<Box gridColumn={gridColumn} />)

    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$column: [2, 'full']}),
    )
  })

  it('uses columnStart when gridColumnStart is not provided', () => {
    render(<Box columnStart={2} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$columnStart: [2]}),
    )
  })

  it('prefers gridColumnStart over columnStart when both are provided', () => {
    render(<Box columnStart={2} gridColumnStart={4} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$columnStart: [4]}),
    )
    expect(mockedResponsiveGridItemStyle).not.toHaveBeenCalledWith(
      expect.objectContaining({$columnStart: [2]}),
    )
  })

  it('uses columnEnd when gridColumnEnd is not provided', () => {
    render(<Box columnEnd={3} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$columnEnd: [3]}),
    )
  })

  it('prefers gridColumnEnd over columnEnd when both are provided', () => {
    render(<Box columnEnd={3} gridColumnEnd={5} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$columnEnd: [5]}),
    )
    expect(mockedResponsiveGridItemStyle).not.toHaveBeenCalledWith(
      expect.objectContaining({$columnEnd: [3]}),
    )
  })

  it('uses row when gridRow is not provided', () => {
    render(<Box row={1} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(expect.objectContaining({$row: [1]}))
  })

  it('prefers gridRow over row when both are provided', () => {
    render(<Box row={1} gridRow={2} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(expect.objectContaining({$row: [2]}))
    expect(mockedResponsiveGridItemStyle).not.toHaveBeenCalledWith(
      expect.objectContaining({$row: [1]}),
    )
  })

  it('uses rowStart when gridRowStart is not provided', () => {
    render(<Box rowStart={2} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$rowStart: [2]}),
    )
  })

  it('prefers gridRowStart over rowStart when both are provided', () => {
    render(<Box rowStart={2} gridRowStart={4} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$rowStart: [4]}),
    )
    expect(mockedResponsiveGridItemStyle).not.toHaveBeenCalledWith(
      expect.objectContaining({$rowStart: [2]}),
    )
  })

  it('uses rowEnd when gridRowEnd is not provided', () => {
    render(<Box rowEnd={3} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$rowEnd: [3]}),
    )
  })

  it('prefers gridRowEnd over rowEnd when both are provided', () => {
    render(<Box rowEnd={3} gridRowEnd={5} />)
    expect(mockedResponsiveGridItemStyle).toHaveBeenCalledWith(
      expect.objectContaining({$rowEnd: [5]}),
    )
    expect(mockedResponsiveGridItemStyle).not.toHaveBeenCalledWith(
      expect.objectContaining({$rowEnd: [3]}),
    )
  })
})
