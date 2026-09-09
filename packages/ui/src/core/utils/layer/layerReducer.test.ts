import {describe, expect, it} from 'vitest'

import {initialLayerState, LayerAction, layerReducer, LayerState} from './layerReducer'

function reduce(actions: LayerAction[], state: LayerState = initialLayerState): LayerState {
  return actions.reduce(layerReducer, state)
}

describe('utils/layer', () => {
  describe('layerReducer', () => {
    it('should start without child layers', () => {
      expect(initialLayerState).toEqual({childLayers: {}, size: 0})
    })

    describe('child/register', () => {
      it('should count a child on a new level towards the size', () => {
        expect(reduce([{type: 'child/register', level: 2}])).toEqual({
          childLayers: {2: 1},
          size: 1,
        })
      })

      it('should count children on different levels separately', () => {
        expect(
          reduce([
            {type: 'child/register', level: 2},
            {type: 'child/register', level: 3},
            {type: 'child/register', level: 4},
          ]),
        ).toEqual({childLayers: {2: 1, 3: 1, 4: 1}, size: 3})
      })

      it('should not grow the size when another child registers on an existing level', () => {
        expect(
          reduce([
            {type: 'child/register', level: 2},
            {type: 'child/register', level: 2},
            {type: 'child/register', level: 2},
          ]),
        ).toEqual({childLayers: {2: 3}, size: 1})
      })

      it('should count each child without a level towards the size', () => {
        expect(reduce([{type: 'child/register'}, {type: 'child/register'}])).toEqual({
          childLayers: {},
          size: 2,
        })
      })

      it('should add up children with and without a level', () => {
        expect(
          reduce([
            {type: 'child/register', level: 2},
            {type: 'child/register'},
            {type: 'child/register', level: 2},
          ]),
        ).toEqual({childLayers: {2: 2}, size: 2})
      })
    })

    describe('child/unregister', () => {
      it('should drop a level when its last child unregisters', () => {
        const state = reduce([
          {type: 'child/register', level: 2},
          {type: 'child/register', level: 3},
        ])

        expect(reduce([{type: 'child/unregister', level: 3}], state)).toEqual({
          childLayers: {2: 1},
          size: 1,
        })
      })

      it('should keep the level and size while other children remain on it', () => {
        const state = reduce([
          {type: 'child/register', level: 2},
          {type: 'child/register', level: 2},
        ])

        expect(reduce([{type: 'child/unregister', level: 2}], state)).toEqual({
          childLayers: {2: 1},
          size: 1,
        })
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

      it('should uncount a child without a level from the size', () => {
        const state = reduce([{type: 'child/register'}, {type: 'child/register'}])

        expect(reduce([{type: 'child/unregister'}], state)).toEqual({childLayers: {}, size: 1})
      })

      it('should ignore a level that has no registered children', () => {
        const state = reduce([{type: 'child/register', level: 2}])

        expect(layerReducer(state, {type: 'child/unregister', level: 3})).toBe(state)
        expect(layerReducer(initialLayerState, {type: 'child/unregister', level: 2})).toBe(
          initialLayerState,
        )
      })
    })

    it('should not mutate the previous state', () => {
      const state: LayerState = {childLayers: {2: 1, 3: 2}, size: 2}
      const snapshot = structuredClone(state)

      layerReducer(state, {type: 'child/register', level: 2})
      layerReducer(state, {type: 'child/register', level: 4})
      layerReducer(state, {type: 'child/register'})
      layerReducer(state, {type: 'child/unregister', level: 2})
      layerReducer(state, {type: 'child/unregister', level: 3})
      layerReducer(state, {type: 'child/unregister'})

      expect(state).toEqual(snapshot)
    })

    it('should track the levels of a nested layer tree as seen from the root', () => {
      // Root (level 1) > A (level 2) > B (level 3), where A and B each also register with Root
      const opened = reduce([
        {type: 'child/register', level: 2},
        {type: 'child/register', level: 3},
      ])

      expect(opened.size).toBe(2)

      // A sibling of A opens: same level, so the root is still two levels deep
      const withSibling = layerReducer(opened, {type: 'child/register', level: 2})

      expect(withSibling.size).toBe(2)

      // B closes: only level 2 remains below the root
      const closedB = layerReducer(withSibling, {type: 'child/unregister', level: 3})

      expect(closedB).toEqual({childLayers: {2: 2}, size: 1})
    })
  })
})
