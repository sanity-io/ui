/** @vitest-environment jsdom */

import {type Dimensions, type MiddlewareState} from '@floating-ui/react-dom'
import {describe, expect, it, vi} from 'vitest'

import {naturalHeight} from './size'

const NATURAL_DIMENSIONS: Dimensions = {width: 260, height: 400}

function createState({
  floatingHeight,
  floatingWidth = 240,
  maxHeight,
  maxWidth = '300px',
  middlewareData = {},
}: {
  floatingHeight: number
  floatingWidth?: number
  maxHeight: string
  maxWidth?: string
  middlewareData?: MiddlewareState['middlewareData']
}) {
  const floating = document.createElement('div')
  const reference = document.createElement('button')
  const stylesSeenWhileMeasuring: {maxHeight: string; maxWidth: string}[] = []

  floating.style.maxHeight = maxHeight
  floating.style.maxWidth = maxWidth

  const getDimensions = vi.fn(async () => {
    stylesSeenWhileMeasuring.push({
      maxHeight: floating.style.maxHeight,
      maxWidth: floating.style.maxWidth,
    })

    return NATURAL_DIMENSIONS
  })

  const state = {
    elements: {floating, reference},
    initialPlacement: 'bottom',
    middlewareData,
    placement: 'bottom',
    platform: {
      detectOverflow: vi.fn(),
      getClippingRect: vi.fn(),
      getDimensions,
      getElementRects: vi.fn(),
    },
    rects: {
      floating: {x: 0, y: 0, width: floatingWidth, height: floatingHeight},
      reference: {x: 0, y: 0, width: 100, height: 32},
    },
    strategy: 'fixed',
    x: 0,
    y: 0,
  } satisfies MiddlewareState

  return {floating, getDimensions, state, stylesSeenWhileMeasuring}
}

// Positions depend on layout, which jsdom lacks: `popoverContentChange.test.tsx` in the Storybook
// app checks where the popover ends up and that its content keeps its scroll position.
describe('naturalHeight', () => {
  it('measures a popover that fills its max height without that max height, keeping its max width', async () => {
    const {state, stylesSeenWhileMeasuring} = createState({
      floatingHeight: 120,
      maxHeight: '120.5px',
    })

    const result = await naturalHeight().fn(state)

    expect(stylesSeenWhileMeasuring).toEqual([{maxHeight: '', maxWidth: '300px'}])
    expect(result).toEqual({
      data: {measured: true},
      reset: {
        rects: {
          reference: state.rects.reference,
          floating: {x: 0, y: 0, width: 240, height: NATURAL_DIMENSIONS.height},
        },
      },
    })
  })

  it('leaves a popover that only fills its max width alone', async () => {
    const {getDimensions, state} = createState({
      floatingHeight: 80,
      floatingWidth: 300,
      maxHeight: '120.5px',
    })

    await expect(naturalHeight().fn(state)).resolves.toEqual({})
    expect(getDimensions).not.toHaveBeenCalled()
  })

  it('puts the max height back after measuring', async () => {
    const {floating, state} = createState({floatingHeight: 120, maxHeight: '120.5px'})

    await naturalHeight().fn(state)

    expect(floating.style.maxHeight).toBe('120.5px')
  })

  it('leaves a popover shorter than its max height alone', async () => {
    const {getDimensions, state} = createState({floatingHeight: 80, maxHeight: '120.5px'})

    await expect(naturalHeight().fn(state)).resolves.toEqual({})
    expect(getDimensions).not.toHaveBeenCalled()
  })

  it('leaves a popover without a max height alone', async () => {
    const {getDimensions, state} = createState({floatingHeight: 120, maxHeight: ''})

    await expect(naturalHeight().fn(state)).resolves.toEqual({})
    expect(getDimensions).not.toHaveBeenCalled()
  })

  it('measures once per update, so the max height applied after it sticks', async () => {
    const {getDimensions, state} = createState({
      floatingHeight: 120,
      maxHeight: '120.5px',
      middlewareData: {'@sanity/ui/natural-height': {measured: true}},
    })

    await expect(naturalHeight().fn(state)).resolves.toEqual({})
    expect(getDimensions).not.toHaveBeenCalled()
  })
})
