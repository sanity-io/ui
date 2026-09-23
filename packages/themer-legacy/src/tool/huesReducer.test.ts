import {describe, expect, it} from 'vitest'

import {hues as defaultHues} from '../generator/defaults'
import {presets} from '../generator/presets'
import {Hues} from '../generator/types'
import {HuesAction, huesReducer} from './huesReducer'

const verdant = presets.find((preset) => preset.slug === 'verdant')!.hues
const dew = presets.find((preset) => preset.slug === 'dew')!.hues

function run(initial: Hues | null, actions: HuesAction[]): Hues | null {
  return actions.reduce(huesReducer, initial)
}

describe('huesReducer', () => {
  it('starts an edit of an untouched draft from the default preset', () => {
    expect(run(null, [{type: 'update', tone: 'primary', changes: {mid: '#22fca8'}}])).toEqual({
      ...defaultHues,
      primary: {...defaultHues.primary, mid: '#22fca8'},
    })
  })

  it('merges changes into the edited hue and leaves the others alone', () => {
    const next = run(verdant, [{type: 'update', tone: 'caution', changes: {midPoint: 400}}])

    expect(next).toEqual({...verdant, caution: {...verdant.caution, midPoint: 400}})
    expect(next?.primary).toBe(verdant.primary)
  })

  it('keeps quick successive edits of different hues', () => {
    expect(
      run(verdant, [
        {type: 'update', tone: 'primary', changes: {mid: '#22fca8'}},
        {type: 'update', tone: 'critical', changes: {darkest: '#100000'}},
      ]),
    ).toEqual({
      ...verdant,
      primary: {...verdant.primary, mid: '#22fca8'},
      critical: {...verdant.critical, darkest: '#100000'},
    })
  })

  it('lets a reset after an edit win', () => {
    expect(
      run(verdant, [
        {type: 'update', tone: 'primary', changes: {mid: '#22fca8'}},
        {type: 'set', hues: null},
      ]),
    ).toBeNull()
  })

  it('lets a preset after an edit win', () => {
    expect(
      run(verdant, [
        {type: 'update', tone: 'primary', changes: {mid: '#22fca8'}},
        {type: 'set', hues: dew},
      ]),
    ).toBe(dew)
  })

  it('applies an edit after a reset to the default preset, not the old draft', () => {
    expect(
      run(verdant, [
        {type: 'set', hues: null},
        {type: 'update', tone: 'primary', changes: {mid: '#22fca8'}},
      ]),
    ).toEqual({...defaultHues, primary: {...defaultHues.primary, mid: '#22fca8'}})
  })
})
