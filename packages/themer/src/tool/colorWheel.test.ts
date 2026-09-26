import {describe, expect, it} from 'vitest'

import {
  ANIMATION_DURATION,
  isSliceFilled,
  SLICE_COLORS,
  SLICE_COUNT,
  wheelRotation,
} from './colorWheel'

const SLICES = Array.from({length: SLICE_COUNT}, (_, index) => index)

/** The acts the animation is made of: fill the top half, spin while filling the bottom half, clear */
const TOTAL_ACTS = 2.5

/** The progress at which each act ends */
const TOP_HALF_FILLED = 1 / TOTAL_ACTS
const SPUN = 2 / TOTAL_ACTS

const STEPS = 20_000
const STEP = 1 / STEPS

/** The first progress, in steps of `STEP`, at which `predicate` holds */
function firstProgress(predicate: (progress: number) => boolean): number {
  for (let step = 0; step <= STEPS; step++) {
    const progress = step / STEPS

    if (predicate(progress)) return progress
  }

  throw new Error('never')
}

/** When a slice pops in */
function fillTime(index: number): number {
  return firstProgress((progress) => isSliceFilled(progress, index))
}

/** When a slice pops out again */
function clearTime(index: number): number {
  return firstProgress((progress) => progress >= SPUN && !isSliceFilled(progress, index))
}

function filledSlices(progress: number): number[] {
  return SLICES.filter((index) => isSliceFilled(progress, index))
}

describe('color wheel animation', () => {
  it('has a color of its own for every slice', () => {
    expect(SLICE_COLORS).toHaveLength(SLICE_COUNT)
    expect(new Set(SLICE_COLORS).size).toBe(SLICE_COUNT)
  })

  it('takes two and a half acts', () => {
    expect(ANIMATION_DURATION).toBeCloseTo(0.55 * TOTAL_ACTS)
  })

  it('starts and ends with a blank, upright wheel', () => {
    expect(wheelRotation(0)).toBe(0)
    expect(wheelRotation(1)).toBe(0)
    expect(filledSlices(0)).toEqual([])
    expect(filledSlices(1)).toEqual([])
  })

  it('pops the slices in whole, one at a time, clockwise from 12 o’clock at a steady pace', () => {
    // Four slices per act: the top half in the first, the bottom half in the second
    const beat = TOP_HALF_FILLED / (SLICE_COUNT / 2)

    for (const index of SLICES) {
      const time = fillTime(index)

      expect(time, `slice ${index}`).toBeCloseTo(index * beat, 3)
      expect(filledSlices(time)).toEqual(SLICES.slice(0, index + 1))
      expect(filledSlices(time - STEP)).toEqual(SLICES.slice(0, index))
    }
  })

  it('stands still until the 6 o’clock slice pops in', () => {
    const sixOClock = SLICE_COUNT / 2

    expect(wheelRotation(TOP_HALF_FILLED / 2)).toBe(0)
    expect(wheelRotation(TOP_HALF_FILLED)).toBe(0)
    expect(filledSlices(TOP_HALF_FILLED)).toEqual(SLICES.slice(0, sixOClock))

    const spinning = fillTime(sixOClock)

    expect(spinning).toBeCloseTo(TOP_HALF_FILLED, 3)
    expect(wheelRotation(spinning)).toBeGreaterThan(0)
  })

  it('spins up with a cubic ease-in while the bottom half pop in', () => {
    const halfway = (TOP_HALF_FILLED + SPUN) / 2

    expect(wheelRotation(halfway)).toBeCloseTo(360 * 0.5 ** 3)
    // ...as the 9 o'clock slice pops in
    expect(filledSlices(halfway - STEP)).toEqual(SLICES.slice(0, (SLICE_COUNT * 3) / 4))
    expect(filledSlices(halfway + STEP)).toEqual(SLICES.slice(0, (SLICE_COUNT * 3) / 4 + 1))

    // Back upright, at top speed, with every slice filled
    expect(wheelRotation(SPUN - 1e-9)).toBeCloseTo(360)
    expect(wheelRotation(SPUN)).toBe(0)
    expect(filledSlices(SPUN)).toEqual(SLICES)
  })

  it('pops the slices out the same way round, on an ease-out that starts at the speed of the spin', () => {
    // Where a cubic ease-out over a full turn, from the spin's top speed, is
    // as it reaches each slice's leading edge
    const easeOutTime = (index: number) =>
      SPUN + (1 - Math.cbrt(1 - index / SLICE_COUNT)) / TOTAL_ACTS

    let previousGap = 0

    for (const index of SLICES) {
      const time = clearTime(index)

      expect(time, `slice ${index}`).toBeCloseTo(easeOutTime(index), 3)
      expect(filledSlices(time)).toEqual(SLICES.slice(index + 1))
      expect(wheelRotation(time)).toBe(0)

      if (index > 0) {
        const gap = time - clearTime(index - 1)

        expect(gap, `gap before slice ${index}`).toBeGreaterThan(previousGap)
        previousGap = gap
      }
    }
  })

  it('ends as the last slice pops out', () => {
    expect(isSliceFilled(1 - STEP, SLICE_COUNT - 1)).toBe(true)
    expect(isSliceFilled(1, SLICE_COUNT - 1)).toBe(false)
  })
})
