import {describe, expect, it} from 'vitest'

import {INITIAL_LAYER_STATE, LayerAction, LayerState, layerReducer} from './layerReducer'

function apply(actions: LayerAction[], initial: LayerState = INITIAL_LAYER_STATE): LayerState {
  return actions.reduce(layerReducer, initial)
}

describe('layerReducer', () => {
  it('starts empty so the provider is the top layer', () => {
    expect(INITIAL_LAYER_STATE).toEqual({
      childLayers: {},
      legacy: 0,
      size: 0,
    })
  })

  it('does not mutate the previous state', () => {
    const next = layerReducer(INITIAL_LAYER_STATE, {type: 'register', level: 2})

    expect(INITIAL_LAYER_STATE).toEqual({
      childLayers: {},
      legacy: 0,
      size: 0,
    })
    expect(next).not.toBe(INITIAL_LAYER_STATE)
    expect(next.childLayers).not.toBe(INITIAL_LAYER_STATE.childLayers)
  })

  it('is a pure function', () => {
    const state: LayerState = {childLayers: {2: 1}, legacy: 0, size: 1}
    const action = {type: 'register', level: 2} as const

    expect(layerReducer(state, action)).toEqual(layerReducer(state, action))
    expect(state).toEqual({childLayers: {2: 1}, legacy: 0, size: 1})
  })

  describe('level occupancy', () => {
    it('treats size as the number of unique levels, not children', () => {
      const registered = apply([
        {type: 'register', level: 2},
        {type: 'register', level: 2},
      ])

      expect(registered).toEqual({
        childLayers: {2: 2},
        legacy: 0,
        size: 1,
      })

      const oneRemoved = layerReducer(registered, {type: 'unregister', level: 2})

      expect(oneRemoved).toEqual({
        childLayers: {2: 1},
        legacy: 0,
        size: 1,
      })

      expect(layerReducer(oneRemoved, {type: 'unregister', level: 2})).toEqual(INITIAL_LAYER_STATE)
    })

    it('increments size for each new unique level', () => {
      expect(
        apply([
          {type: 'register', level: 2},
          {type: 'register', level: 3},
        ]),
      ).toEqual({
        childLayers: {2: 1, 3: 1},
        legacy: 0,
        size: 2,
      })
    })

    it('decrements size only when the last child at a level unregisters', () => {
      const state = apply([
        {type: 'register', level: 2},
        {type: 'register', level: 3},
        {type: 'unregister', level: 2},
      ])

      expect(state).toEqual({
        childLayers: {3: 1},
        legacy: 0,
        size: 1,
      })
    })

    it('treats level 0 as a real level, not the legacy path', () => {
      expect(apply([{type: 'register', level: 0}])).toEqual({
        childLayers: {0: 1},
        legacy: 0,
        size: 1,
      })
    })

    it('returns the same state when unregistering an unknown level', () => {
      const state = apply([{type: 'register', level: 2}])

      expect(layerReducer(state, {type: 'unregister', level: 9})).toBe(state)
      expect(layerReducer(INITIAL_LAYER_STATE, {type: 'unregister', level: 2})).toBe(
        INITIAL_LAYER_STATE,
      )
    })
  })

  describe('legacy registerChild()', () => {
    it('increments and decrements size per call', () => {
      const registered = apply([{type: 'register'}, {type: 'register'}])

      expect(registered).toEqual({
        childLayers: {},
        legacy: 2,
        size: 2,
      })

      expect(layerReducer(registered, {type: 'unregister'})).toEqual({
        childLayers: {},
        legacy: 1,
        size: 1,
      })
    })

    it('returns the same state when unregistering with no legacy children', () => {
      expect(layerReducer(INITIAL_LAYER_STATE, {type: 'unregister'})).toBe(INITIAL_LAYER_STATE)
    })
  })

  describe('mixed registrations', () => {
    it('keeps unique-level occupancy and legacy counts independent', () => {
      const mixed = apply([{type: 'register', level: 2}, {type: 'register'}])

      expect(mixed).toEqual({
        childLayers: {2: 1},
        legacy: 1,
        size: 2,
      })

      expect(layerReducer(mixed, {type: 'unregister', level: 2})).toEqual({
        childLayers: {},
        legacy: 1,
        size: 1,
      })

      expect(layerReducer(mixed, {type: 'unregister'})).toEqual({
        childLayers: {2: 1},
        legacy: 0,
        size: 1,
      })
    })
  })
})
