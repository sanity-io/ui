import {describe, expect, it} from 'vitest'

import {hues} from '../generator/defaults'
import {presets} from '../generator/presets'
import {expandHex, MID_POINTS, roundMidPoint, sameHues, stepMidPoint} from './hues'

describe('roundMidPoint', () => {
  it('snaps the range input to the nearest tint', () => {
    expect(roundMidPoint(50)).toBe(50)
    expect(roundMidPoint(74)).toBe(50)
    expect(roundMidPoint(75)).toBe(100)
    expect(roundMidPoint(149)).toBe(100)
    expect(roundMidPoint(150)).toBe(200)
    expect(roundMidPoint(537)).toBe(500)
    expect(roundMidPoint(925)).toBe(900)
    expect(roundMidPoint(926)).toBe(950)
    expect(roundMidPoint(950)).toBe(950)
  })

  it('keeps every tint in place', () => {
    for (const midPoint of MID_POINTS) {
      expect(roundMidPoint(midPoint)).toBe(midPoint)
    }
  })
})

describe('stepMidPoint', () => {
  it('moves one tint along the ramp and stops at the ends', () => {
    expect(stepMidPoint(50, 1)).toBe(100)
    expect(stepMidPoint(100, 1)).toBe(200)
    expect(stepMidPoint(900, 1)).toBe(950)
    expect(stepMidPoint(950, 1)).toBe(950)
    expect(stepMidPoint(950, -1)).toBe(900)
    expect(stepMidPoint(100, -1)).toBe(50)
    expect(stepMidPoint(50, -1)).toBe(50)
  })
})

describe('sameHues', () => {
  it('matches the default hues to the default preset only', () => {
    const matches = presets.filter((preset) => sameHues(preset.hues, hues)).map((p) => p.slug)

    expect(matches).toEqual(['default'])
  })

  it('ignores color casing', () => {
    expect(sameHues(hues, {...hues, primary: {...hues.primary, mid: '#2276FC'}})).toBe(true)
  })

  it('notices a changed mid point', () => {
    expect(sameHues(hues, {...hues, primary: {...hues.primary, midPoint: 400}})).toBe(false)
  })
})

describe('expandHex', () => {
  it('expands short hex colors for the color input', () => {
    expect(expandHex('#fff')).toBe('#ffffff')
    expect(expandHex('#1a2')).toBe('#11aa22')
    expect(expandHex('#101112')).toBe('#101112')
  })
})
