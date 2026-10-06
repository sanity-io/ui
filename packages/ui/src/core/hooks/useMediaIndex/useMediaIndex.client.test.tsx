/** @vitest-environment jsdom */

import {act, render, screen} from '@testing-library/react'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'

import {
  installMatchMedia,
  type MatchMediaController,
} from '../../../../test/mocks/matchMediaController'
import {buildTheme} from '../../../theme/build/buildTheme'
import {ThemeProvider} from '../../theme/themeProvider'
import {useMediaIndex} from './useMediaIndex'

const QUERIES = [
  'screen and (max-width: 599px)',
  'screen and (min-width: 600px) and (max-width: 899px)',
  'screen and (min-width: 900px)',
]

function Index({id}: {id: string}) {
  const mediaIndex = useMediaIndex()

  return <output data-testid={id}>{mediaIndex}</output>
}

function Indexes({count, media}: {count: number; media: number[]}) {
  const theme = buildTheme({media})

  return (
    <ThemeProvider theme={theme}>
      {Array.from({length: count}, (_, index) => (
        <Index key={index} id={`index-${index}`} />
      ))}
    </ThemeProvider>
  )
}

describe('useMediaIndex', () => {
  let controller: MatchMediaController

  beforeEach(() => {
    controller = installMatchMedia({[QUERIES[0]]: true})
  })

  afterEach(() => {
    controller.restore()
  })

  it('evaluates each breakpoint query once and shares one listener across components', () => {
    const {unmount} = render(<Indexes count={20} media={[600, 900]} />)

    expect(controller.matchMedia).toHaveBeenCalledTimes(QUERIES.length)

    for (const query of QUERIES) {
      expect(controller.matchMedia).toHaveBeenCalledWith(query)
      expect(controller.listenerCount(query)).toBe(1)
    }

    unmount()

    for (const query of QUERIES) {
      expect(controller.listenerCount(query)).toBe(0)
    }
  })

  it('shares the store between equal breakpoint arrays that are different instances', () => {
    render(
      <>
        <Indexes count={1} media={[600, 900]} />
        <Indexes count={1} media={[600, 900]} />
      </>,
    )

    expect(controller.matchMedia).toHaveBeenCalledTimes(QUERIES.length)

    for (const query of QUERIES) {
      expect(controller.listenerCount(query)).toBe(1)
    }
  })

  it('updates every component when the matching query changes', () => {
    render(<Indexes count={2} media={[600, 900]} />)

    expect(screen.getByTestId('index-0')).toHaveTextContent('0')
    expect(screen.getByTestId('index-1')).toHaveTextContent('0')

    act(() => {
      controller.setMatches(QUERIES[0], false)
      controller.setMatches(QUERIES[1], true)
    })

    expect(screen.getByTestId('index-0')).toHaveTextContent('1')
    expect(screen.getByTestId('index-1')).toHaveTextContent('1')

    act(() => {
      controller.setMatches(QUERIES[1], false)
      controller.setMatches(QUERIES[2], true)
    })

    expect(screen.getByTestId('index-0')).toHaveTextContent('2')
    expect(screen.getByTestId('index-1')).toHaveTextContent('2')

    // Rendering and subscribing never re-evaluate a query
    expect(controller.matchMedia).toHaveBeenCalledTimes(QUERIES.length)
  })

  it('subscribes afresh after every component unmounted', () => {
    render(<Indexes count={2} media={[600, 900]} />).unmount()

    for (const query of QUERIES) {
      expect(controller.listenerCount(query)).toBe(0)
    }

    const {unmount} = render(<Indexes count={2} media={[600, 900]} />)

    // The stores and their lists were evicted with the last subscriber, so each query is
    // evaluated once more, and the new subscribers get their updates
    expect(controller.matchMedia).toHaveBeenCalledTimes(QUERIES.length * 2)
    expect(screen.getByTestId('index-0')).toHaveTextContent('0')

    act(() => {
      controller.setMatches(QUERIES[0], false)
      controller.setMatches(QUERIES[2], true)
    })

    expect(screen.getByTestId('index-0')).toHaveTextContent('2')
    expect(screen.getByTestId('index-1')).toHaveTextContent('2')

    unmount()

    for (const query of QUERIES) {
      expect(controller.listenerCount(query)).toBe(0)
    }
  })
})
