import {describe, expect, it} from 'vitest'

import {
  getLayerChildrenSize,
  initialLayerChildrenState,
  layerChildrenReducer,
} from './layerChildrenReducer'

describe('layerChildrenReducer', () => {
  describe('getLayerChildrenSize', () => {
    it('should be 0 for the initial state', () => {
      expect(getLayerChildrenSize(initialLayerChildrenState)).toBe(0)
    })

    it('should count distinct levels, not total children', () => {
      expect(getLayerChildrenSize({counts: {2: 1}, legacyCount: 0})).toBe(1)
      expect(getLayerChildrenSize({counts: {2: 2}, legacyCount: 0})).toBe(1)
      expect(getLayerChildrenSize({counts: {2: 1, 3: 1}, legacyCount: 0})).toBe(2)
      expect(getLayerChildrenSize({counts: {2: 3, 3: 2, 4: 1}, legacyCount: 0})).toBe(3)
    })

    it('should count each legacy child', () => {
      expect(getLayerChildrenSize({counts: {}, legacyCount: 1})).toBe(1)
      expect(getLayerChildrenSize({counts: {}, legacyCount: 3})).toBe(3)
    })

    it('should add distinct levels and legacy children', () => {
      expect(getLayerChildrenSize({counts: {2: 2}, legacyCount: 1})).toBe(2)
      expect(getLayerChildrenSize({counts: {2: 1, 3: 1}, legacyCount: 2})).toBe(4)
    })
  })

  describe('add', () => {
    it('should add a level to the initial state', () => {
      const next = layerChildrenReducer(initialLayerChildrenState, {level: 2, type: 'add'})

      expect(next).toEqual({counts: {2: 1}, legacyCount: 0})
      expect(getLayerChildrenSize(next)).toBe(1)
    })

    it('should not mutate the previous state', () => {
      const prev = {counts: {2: 1}, legacyCount: 0}
      const prevCounts = prev.counts

      const next = layerChildrenReducer(prev, {level: 2, type: 'add'})

      expect(next.counts).not.toBe(prevCounts)
      expect(prev).toEqual({counts: {2: 1}, legacyCount: 0})
      expect(next).toEqual({counts: {2: 2}, legacyCount: 0})
    })

    it('should track multiple children on the same level as a single level', () => {
      const s1 = layerChildrenReducer(initialLayerChildrenState, {level: 2, type: 'add'})
      const s2 = layerChildrenReducer(s1, {level: 2, type: 'add'})

      expect(s2).toEqual({counts: {2: 2}, legacyCount: 0})
      expect(getLayerChildrenSize(s2)).toBe(1)
    })

    it('should track children on different levels separately', () => {
      const s1 = layerChildrenReducer(initialLayerChildrenState, {level: 2, type: 'add'})
      const s2 = layerChildrenReducer(s1, {level: 3, type: 'add'})

      expect(s2).toEqual({counts: {2: 1, 3: 1}, legacyCount: 0})
      expect(getLayerChildrenSize(s2)).toBe(2)
    })

    it('should add legacy children without touching level counts', () => {
      const prev = {counts: {2: 1}, legacyCount: 0}

      const next = layerChildrenReducer(prev, {type: 'add'})

      expect(next).toEqual({counts: {2: 1}, legacyCount: 1})
      expect(next.counts).toBe(prev.counts)
      expect(getLayerChildrenSize(next)).toBe(2)
    })

    it('should count each legacy child', () => {
      const s1 = layerChildrenReducer(initialLayerChildrenState, {type: 'add'})
      const s2 = layerChildrenReducer(s1, {type: 'add'})

      expect(s2).toEqual({counts: {}, legacyCount: 2})
      expect(getLayerChildrenSize(s2)).toBe(2)
    })
  })

  describe('remove', () => {
    it('should remove the last child of a level', () => {
      const prev = {counts: {2: 1, 3: 1}, legacyCount: 0}

      const next = layerChildrenReducer(prev, {level: 2, type: 'remove'})

      expect(next).toEqual({counts: {3: 1}, legacyCount: 0})
      expect(getLayerChildrenSize(next)).toBe(1)
    })

    it('should keep the level while other children remain on it', () => {
      const prev = {counts: {2: 2}, legacyCount: 0}

      const next = layerChildrenReducer(prev, {level: 2, type: 'remove'})

      expect(next).toEqual({counts: {2: 1}, legacyCount: 0})
      expect(getLayerChildrenSize(next)).toBe(1)
    })

    it('should be a no-op when removing a level that was never added', () => {
      const prev = {counts: {2: 1}, legacyCount: 0}

      const next = layerChildrenReducer(prev, {level: 3, type: 'remove'})

      expect(next).toBe(prev)
    })

    it('should be a no-op when removing from the initial state', () => {
      const next = layerChildrenReducer(initialLayerChildrenState, {level: 2, type: 'remove'})

      expect(next).toBe(initialLayerChildrenState)
    })

    it('should stay usable after an unbalanced remove', () => {
      const unbalanced = layerChildrenReducer(initialLayerChildrenState, {
        level: 2,
        type: 'remove',
      })
      const next = layerChildrenReducer(unbalanced, {level: 2, type: 'add'})

      expect(next).toEqual({counts: {2: 1}, legacyCount: 0})
      expect(getLayerChildrenSize(next)).toBe(1)
    })

    it('should remove legacy children', () => {
      const prev = {counts: {2: 1}, legacyCount: 2}

      const next = layerChildrenReducer(prev, {type: 'remove'})

      expect(next).toEqual({counts: {2: 1}, legacyCount: 1})
      expect(next.counts).toBe(prev.counts)
      expect(getLayerChildrenSize(next)).toBe(2)
    })

    it('should be a no-op when removing legacy children that were never added', () => {
      const next = layerChildrenReducer(initialLayerChildrenState, {type: 'remove'})

      expect(next).toBe(initialLayerChildrenState)
    })

    it('should not touch level counts when legacy removes are unbalanced', () => {
      const prev = {counts: {2: 1}, legacyCount: 0}

      const next = layerChildrenReducer(prev, {type: 'remove'})

      expect(next).toBe(prev)
      expect(getLayerChildrenSize(next)).toBe(1)
    })

    it('should be safe to dispose twice', () => {
      const added = layerChildrenReducer(initialLayerChildrenState, {level: 2, type: 'add'})
      const removed = layerChildrenReducer(added, {level: 2, type: 'remove'})
      const removedAgain = layerChildrenReducer(removed, {level: 2, type: 'remove'})

      expect(removed).toEqual({counts: {}, legacyCount: 0})
      expect(removedAgain).toBe(removed)

      const legacyAdded = layerChildrenReducer(initialLayerChildrenState, {type: 'add'})
      const legacyRemoved = layerChildrenReducer(legacyAdded, {type: 'remove'})
      const legacyRemovedAgain = layerChildrenReducer(legacyRemoved, {type: 'remove'})

      expect(legacyRemoved).toEqual({counts: {}, legacyCount: 0})
      expect(legacyRemovedAgain).toBe(legacyRemoved)
    })
  })

  describe('mixed levels and legacy children', () => {
    it('should track both independently', () => {
      const s1 = layerChildrenReducer(initialLayerChildrenState, {level: 2, type: 'add'})
      const s2 = layerChildrenReducer(s1, {type: 'add'})
      const s3 = layerChildrenReducer(s2, {level: 3, type: 'add'})

      expect(s3).toEqual({counts: {2: 1, 3: 1}, legacyCount: 1})
      expect(getLayerChildrenSize(s3)).toBe(3)

      const s4 = layerChildrenReducer(s3, {type: 'remove'})

      expect(s4).toEqual({counts: {2: 1, 3: 1}, legacyCount: 0})
      expect(getLayerChildrenSize(s4)).toBe(2)
    })
  })
})
