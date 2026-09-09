import {describe, expect, it} from 'vitest'

import {initialLayerState, LayerAction, layerReducer, LayerState} from './layerReducer'

function reduce(actions: LayerAction[], state: LayerState = initialLayerState): LayerState {
  return actions.reduce(layerReducer, state)
}

function layerState(childLayers: [level: number, count: number][], childrenWithoutLevel = 0) {
  return {childLayers: new Map(childLayers), childrenWithoutLevel}
}

describe('utils/layer', () => {
  describe('layerReducer', () => {
    it('should start without child layers', () => {
      expect(initialLayerState).toEqual(layerState([]))
    })

    describe('child/register', () => {
      it('should add a level for the first child on it', () => {
        expect(reduce([{type: 'child/register', level: 2}])).toEqual(layerState([[2, 1]]))
      })

      it('should count children on different levels separately', () => {
        expect(
          reduce([
            {type: 'child/register', level: 2},
            {type: 'child/register', level: 3},
            {type: 'child/register', level: 4},
          ]),
        ).toEqual(
          layerState([
            [2, 1],
            [3, 1],
            [4, 1],
          ]),
        )
      })

      it('should count further children on the same level', () => {
        expect(
          reduce([
            {type: 'child/register', level: 2},
            {type: 'child/register', level: 2},
            {type: 'child/register', level: 2},
          ]),
        ).toEqual(layerState([[2, 3]]))
      })

      it('should count children without a level separately from the levels', () => {
        expect(
          reduce([
            {type: 'child/register', level: 2},
            {type: 'child/register'},
            {type: 'child/register'},
          ]),
        ).toEqual(layerState([[2, 1]], 2))
      })
    })

    describe('child/unregister', () => {
      it('should drop a level when its last child unregisters', () => {
        const state = reduce([
          {type: 'child/register', level: 2},
          {type: 'child/register', level: 3},
        ])

        expect(reduce([{type: 'child/unregister', level: 3}], state)).toEqual(layerState([[2, 1]]))
      })

      it('should keep a level while other children remain on it', () => {
        const state = reduce([
          {type: 'child/register', level: 2},
          {type: 'child/register', level: 2},
        ])

        expect(reduce([{type: 'child/unregister', level: 2}], state)).toEqual(layerState([[2, 1]]))
      })

      it('should uncount a child without a level', () => {
        const state = reduce([{type: 'child/register'}, {type: 'child/register'}])

        expect(reduce([{type: 'child/unregister'}], state)).toEqual(layerState([], 1))
      })

      it('should return to the initial state once every child has unregistered', () => {
        expect(
          reduce([
            {type: 'child/register', level: 2},
            {type: 'child/register', level: 2},
            {type: 'child/register', level: 3},
            {type: 'child/register'},
            {type: 'child/unregister', level: 3},
            {type: 'child/unregister'},
            {type: 'child/unregister', level: 2},
            {type: 'child/unregister', level: 2},
          ]),
        ).toEqual(initialLayerState)
      })
    })

    it('should not mutate the previous state', () => {
      const state = layerState(
        [
          [2, 1],
          [3, 2],
        ],
        1,
      )
      const snapshot = structuredClone(state)

      layerReducer(state, {type: 'child/register', level: 2})
      layerReducer(state, {type: 'child/register', level: 4})
      layerReducer(state, {type: 'child/register'})
      layerReducer(state, {type: 'child/unregister', level: 2})
      layerReducer(state, {type: 'child/unregister', level: 3})
      layerReducer(state, {type: 'child/unregister'})

      expect(state).toEqual(snapshot)
    })
  })
})
