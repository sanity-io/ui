import {describe, expect, it} from 'vitest'

import {SLICE_COLORS, SLICE_COUNT, sliceDash, wheelRotation} from './colorWheel'

const SLICES = Array.from({length: SLICE_COUNT}, (_, index) => index)

/** The stretch of the circumference one slice takes up */
const SLICE = 1 / SLICE_COUNT

/** The progress at which the first two acts of the animation end */
const TOP_HALF_FILLED = 1 / 3
const SPUN = 2 / 3

const FULL = {offset: 0, length: SLICE}
const EMPTY = {offset: 0, length: 0}
const CLEARED = {offset: SLICE, length: 0}

function expectDash(progress: number, index: number, expected: {offset: number; length: number}) {
  const dash = sliceDash(progress, index)

  expect(dash.offset, `offset of slice ${index} at ${progress}`).toBeCloseTo(expected.offset, 9)
  expect(dash.length, `length of slice ${index} at ${progress}`).toBeCloseTo(expected.length, 9)
}

/** How far round the clearing sweep has come, in degrees */
function clearedAngle(progress: number): number {
  return SLICES.reduce((sum, index) => sum + sliceDash(progress, index).offset, 0) * 360
}

describe('color wheel animation', () => {
  it('has a color of its own for every slice', () => {
    expect(SLICE_COLORS).toHaveLength(SLICE_COUNT)
    expect(new Set(SLICE_COLORS).size).toBe(SLICE_COUNT)
  })

  it('starts and ends with a blank, upright wheel', () => {
    expect(wheelRotation(0)).toBe(0)
    expect(wheelRotation(1)).toBe(0)

    for (const index of SLICES) {
      expectDash(0, index, EMPTY)
      expectDash(1, index, CLEARED)
    }
  })

  it('fills the slices clockwise from 12 o’clock at a steady pace', () => {
    // A quarter of the way into the fill, one and a half slices are in
    const progress = TOP_HALF_FILLED * (1.5 / (SLICE_COUNT / 2))

    expectDash(progress, 0, FULL)
    expectDash(progress, 1, {offset: 0, length: SLICE / 2})
    expectDash(progress, 2, EMPTY)
  })

  it('stands still until the fill reaches 6 o’clock', () => {
    expect(wheelRotation(TOP_HALF_FILLED / 2)).toBe(0)
    expect(wheelRotation(TOP_HALF_FILLED)).toBe(0)

    for (const index of SLICES) {
      expectDash(TOP_HALF_FILLED, index, index < SLICE_COUNT / 2 ? FULL : EMPTY)
    }
  })

  it('spins up with a cubic ease-in while the bottom half fills', () => {
    const halfway = (TOP_HALF_FILLED + SPUN) / 2

    expect(wheelRotation(halfway)).toBeCloseTo(360 * 0.5 ** 3)

    for (const index of SLICES) {
      expectDash(halfway, index, index < (SLICE_COUNT * 3) / 4 ? FULL : EMPTY)
    }

    // Back upright, at top speed, with every slice filled
    expect(wheelRotation(SPUN - 1e-9)).toBeCloseTo(360)
    expect(wheelRotation(SPUN)).toBe(0)

    for (const index of SLICES) {
      expectDash(SPUN, index, FULL)
    }
  })

  it('clears the slices the same way round, easing out', () => {
    const halfway = (SPUN + 1) / 2

    // Half an act into a cubic ease-out is seven eighths of the way round
    for (const index of SLICES) {
      expectDash(halfway, index, index < SLICE_COUNT - 1 ? CLEARED : FULL)
    }

    expect(wheelRotation(halfway)).toBe(0)
  })

  it('hands the speed of the spin over to the clearing, and comes to rest', () => {
    const step = 1e-5
    const spinSpeed = (wheelRotation(SPUN - step) - wheelRotation(SPUN - 2 * step)) / step
    const clearingSpeed = (clearedAngle(SPUN + 2 * step) - clearedAngle(SPUN + step)) / step

    expect(spinSpeed).toBeGreaterThan(0)
    expect(clearingSpeed / spinSpeed).toBeCloseTo(1, 3)
    expect((clearedAngle(1) - clearedAngle(1 - step)) / step).toBeCloseTo(0, 1)
  })

  it('never fills a slice outside its own eighth', () => {
    for (let step = 0; step <= 300; step++) {
      const progress = step / 300

      for (const index of SLICES) {
        const {offset, length} = sliceDash(progress, index)

        expect(length).toBeGreaterThanOrEqual(0)
        expect(offset).toBeGreaterThanOrEqual(0)
        expect(offset + length).toBeLessThanOrEqual(SLICE + 1e-12)
      }
    }
  })
})
