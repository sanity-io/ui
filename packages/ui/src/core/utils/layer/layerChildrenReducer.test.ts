import {describe, expect, it} from 'vitest'

import {
  INITIAL_LAYER_CHILDREN_STATE,
  layerChildrenReducer,
  LayerChildrenState,
} from './layerChildrenReducer'

function reduce(
  actions: Parameters<typeof layerChildrenReducer>[1][],
  initial: LayerChildrenState = INITIAL_LAYER_CHILDREN_STATE,
): LayerChildrenState {
  return actions.reduce(layerChildrenReducer, initial)
}

describe('layerChildrenReducer', () => {
  it('starts empty', () => {
    expect(INITIAL_LAYER_CHILDREN_STATE).toEqual({anonymous: 0, counts: {}, size: 0})
  })

  it('registers a new level and increments size once', () => {
    expect(reduce([{type: 'register', level: 2}])).toEqual({
      anonymous: 0,
      counts: {2: 1},
      size: 1,
    })
  })

  it('does not increment size when another layer registers at an existing level', () => {
    expect(
      reduce([
        {type: 'register', level: 2},
        {type: 'register', level: 2},
      ]),
    ).toEqual({anonymous: 0, counts: {2: 2}, size: 1})
  })

  it('increments size for each distinct level', () => {
    expect(
      reduce([
        {type: 'register', level: 2},
        {type: 'register', level: 3},
        {type: 'register', level: 3},
      ]),
    ).toEqual({anonymous: 0, counts: {2: 1, 3: 2}, size: 2})
  })

  it('keeps size when unregistering a non-last occupant of a level', () => {
    expect(
      reduce([
        {type: 'register', level: 2},
        {type: 'register', level: 2},
        {type: 'unregister', level: 2},
      ]),
    ).toEqual({anonymous: 0, counts: {2: 1}, size: 1})
  })

  it('drops the level and decrements size when the last occupant unregisters', () => {
    expect(
      reduce([
        {type: 'register', level: 2},
        {type: 'register', level: 3},
        {type: 'unregister', level: 2},
      ]),
    ).toEqual({anonymous: 0, counts: {3: 1}, size: 1})
  })

  it('returns to the initial state after a matching register/unregister pair', () => {
    expect(
      reduce([
        {type: 'register', level: 2},
        {type: 'unregister', level: 2},
      ]),
    ).toEqual(INITIAL_LAYER_CHILDREN_STATE)
  })

  it('returns the same state reference when unregistering an unknown level', () => {
    const state = reduce([{type: 'register', level: 2}])

    expect(layerChildrenReducer(state, {type: 'unregister', level: 9})).toBe(state)
  })

  it('treats a missing level as anonymous and bumps size for each registration', () => {
    expect(reduce([{type: 'register'}, {type: 'register'}])).toEqual({
      anonymous: 2,
      counts: {},
      size: 2,
    })
  })

  it('decrements size for anonymous unregisters', () => {
    expect(reduce([{type: 'register'}, {type: 'register'}, {type: 'unregister'}])).toEqual({
      anonymous: 1,
      counts: {},
      size: 1,
    })
  })

  it('no-ops anonymous unregister when none are registered', () => {
    const withLevel = reduce([{type: 'register', level: 2}])

    expect(layerChildrenReducer(INITIAL_LAYER_CHILDREN_STATE, {type: 'unregister'})).toBe(
      INITIAL_LAYER_CHILDREN_STATE,
    )
    expect(layerChildrenReducer(withLevel, {type: 'unregister'})).toBe(withLevel)
  })

  it('combines anonymous registrations with unique levels', () => {
    expect(
      reduce([{type: 'register'}, {type: 'register', level: 2}, {type: 'register', level: 2}]),
    ).toEqual({anonymous: 1, counts: {2: 2}, size: 2})
  })

  it('reuses the counts object for anonymous updates', () => {
    const state = reduce([{type: 'register', level: 2}])
    const next = layerChildrenReducer(state, {type: 'register'})

    expect(next.counts).toBe(state.counts)
    expect(next).toEqual({anonymous: 1, counts: state.counts, size: 2})
  })

  it('handles level 0 as a real level, not anonymous', () => {
    expect(reduce([{type: 'register', level: 0}])).toEqual({
      anonymous: 0,
      counts: {0: 1},
      size: 1,
    })
  })

  it('is safe under React Strict Mode double-invoke (pure)', () => {
    const once = layerChildrenReducer(INITIAL_LAYER_CHILDREN_STATE, {type: 'register', level: 1})
    const twice = layerChildrenReducer(INITIAL_LAYER_CHILDREN_STATE, {type: 'register', level: 1})

    expect(once).toEqual(twice)
    expect(once).not.toBe(twice)
  })
})
