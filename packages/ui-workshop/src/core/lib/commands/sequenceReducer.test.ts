import {describe, expect, test} from 'vitest'

import {findBestCandidate, isComplete, isPrefix, sequenceReducer} from './sequenceReducer'
import type {Candidate, SequenceBinding, SequenceState} from './types'

const noop = () => {}

describe('sequenceReducer', () => {
  const mockBinding1: SequenceBinding = {
    type: 'sequence',
    id: 'nav.home',
    keys: ['g', 'h'],
    handler: noop,
  }

  const mockBinding2: SequenceBinding = {
    type: 'sequence',
    id: 'nav.inbox',
    keys: ['g', 'i'],
    handler: noop,
  }

  const mockBinding3: SequenceBinding = {
    type: 'sequence',
    id: 'multi',
    keys: ['a', 'b', 'c'],
    handler: noop,
  }

  describe('sequence/reset', () => {
    test('resets to idle from idle', () => {
      const state: SequenceState = {kind: 'idle'}
      const result = sequenceReducer(state, {type: 'sequence/reset'})

      expect(result).toEqual({kind: 'idle'})
    })

    test('resets to idle from active', () => {
      const state: SequenceState = {
        kind: 'active',
        buffer: ['g'],
        deadline: 1000,
        candidates: [{binding: mockBinding1, layerName: 'global', priority: 1}],
      }
      const result = sequenceReducer(state, {type: 'sequence/reset'})

      expect(result).toEqual({kind: 'idle'})
    })
  })

  describe('sequence/key from idle', () => {
    test('remains idle when no candidates match', () => {
      const state: SequenceState = {kind: 'idle'}
      const result = sequenceReducer(state, {
        type: 'sequence/key',
        key: 'x',
        now: 1000,
        candidates: [{binding: mockBinding1, layerName: 'global', priority: 1}],
      })

      expect(result).toEqual({kind: 'idle'})
    })

    test('enters active state when first key matches', () => {
      const candidates: Candidate[] = [
        {binding: mockBinding1, layerName: 'global', priority: 1},
        {binding: mockBinding2, layerName: 'global', priority: 1},
      ]

      const state: SequenceState = {kind: 'idle'}
      const result = sequenceReducer(state, {
        type: 'sequence/key',
        key: 'g',
        now: 1000,
        candidates,
      })

      expect(result.kind).toBe('active')
      if (result.kind === 'active') {
        expect(result.buffer).toEqual(['g'])
        expect(result.deadline).toBe(1800) // 1000 + 800 default timeout
        expect(result.candidates).toHaveLength(2)
      }
    })

    test('uses custom timeout from binding', () => {
      const customBinding: SequenceBinding = {
        type: 'sequence',
        id: 'custom',
        keys: ['x'],
        timeoutMs: 500,
        handler: noop,
      }

      const candidates: Candidate[] = [{binding: customBinding, layerName: 'global', priority: 1}]

      const state: SequenceState = {kind: 'idle'}
      const result = sequenceReducer(state, {
        type: 'sequence/key',
        key: 'x',
        now: 1000,
        candidates,
      })

      expect(result.kind).toBe('active')
      if (result.kind === 'active') {
        expect(result.deadline).toBe(1500) // 1000 + 500 custom timeout
      }
    })
  })

  describe('sequence/key from active', () => {
    test('resets to idle when deadline exceeded', () => {
      const state: SequenceState = {
        kind: 'active',
        buffer: ['g'],
        deadline: 1000,
        candidates: [{binding: mockBinding1, layerName: 'global', priority: 1}],
      }

      const result = sequenceReducer(state, {
        type: 'sequence/key',
        key: 'h',
        now: 1100, // Past deadline
        candidates: [{binding: mockBinding1, layerName: 'global', priority: 1}],
      })

      expect(result).toEqual({kind: 'idle'})
    })

    test('appends key to buffer and filters candidates', () => {
      const candidates: Candidate[] = [
        {binding: mockBinding1, layerName: 'global', priority: 1},
        {binding: mockBinding2, layerName: 'global', priority: 1},
      ]

      const state: SequenceState = {
        kind: 'active',
        buffer: ['g'],
        deadline: 2000,
        candidates,
      }

      const result = sequenceReducer(state, {
        type: 'sequence/key',
        key: 'h',
        now: 1500,
        candidates,
      })

      expect(result.kind).toBe('active')
      if (result.kind === 'active') {
        expect(result.buffer).toEqual(['g', 'h'])
        expect(result.candidates).toHaveLength(1)
        expect(result.candidates[0].binding.id).toBe('nav.home')
      }
    })

    test('resets when no candidates match', () => {
      const state: SequenceState = {
        kind: 'active',
        buffer: ['g'],
        deadline: 2000,
        candidates: [{binding: mockBinding1, layerName: 'global', priority: 1}],
      }

      const result = sequenceReducer(state, {
        type: 'sequence/key',
        key: 'x', // Wrong key
        now: 1500,
        candidates: [{binding: mockBinding1, layerName: 'global', priority: 1}],
      })

      expect(result).toEqual({kind: 'idle'})
    })

    test('handles multi-key sequences', () => {
      const candidates: Candidate[] = [{binding: mockBinding3, layerName: 'global', priority: 1}]

      let state: SequenceState = {kind: 'idle'}

      // First key
      state = sequenceReducer(state, {type: 'sequence/key', key: 'a', now: 1000, candidates})
      expect(state.kind).toBe('active')
      if (state.kind === 'active') {
        expect(state.buffer).toEqual(['a'])
      }

      // Second key
      state = sequenceReducer(state, {type: 'sequence/key', key: 'b', now: 1100, candidates})
      expect(state.kind).toBe('active')
      if (state.kind === 'active') {
        expect(state.buffer).toEqual(['a', 'b'])
      }

      // Third key
      state = sequenceReducer(state, {type: 'sequence/key', key: 'c', now: 1200, candidates})
      expect(state.kind).toBe('active')
      if (state.kind === 'active') {
        expect(state.buffer).toEqual(['a', 'b', 'c'])
      }
    })
  })
})

describe('isComplete', () => {
  test('returns true for exact match', () => {
    const binding: SequenceBinding = {
      type: 'sequence',
      id: 'test',
      keys: ['g', 'h'],
      handler: noop,
    }

    expect(isComplete(['g', 'h'], binding)).toBe(true)
  })

  test('returns false for partial match', () => {
    const binding: SequenceBinding = {
      type: 'sequence',
      id: 'test',
      keys: ['g', 'h'],
      handler: noop,
    }

    expect(isComplete(['g'], binding)).toBe(false)
  })

  test('returns false for wrong keys', () => {
    const binding: SequenceBinding = {
      type: 'sequence',
      id: 'test',
      keys: ['g', 'h'],
      handler: noop,
    }

    expect(isComplete(['g', 'x'], binding)).toBe(false)
  })

  test('returns false for too many keys', () => {
    const binding: SequenceBinding = {
      type: 'sequence',
      id: 'test',
      keys: ['g', 'h'],
      handler: noop,
    }

    expect(isComplete(['g', 'h', 'i'], binding)).toBe(false)
  })
})

describe('isPrefix', () => {
  test('returns true for valid prefix', () => {
    const binding: SequenceBinding = {
      type: 'sequence',
      id: 'test',
      keys: ['g', 'h'],
      handler: noop,
    }

    expect(isPrefix(['g'], binding)).toBe(true)
  })

  test('returns true for complete match', () => {
    const binding: SequenceBinding = {
      type: 'sequence',
      id: 'test',
      keys: ['g', 'h'],
      handler: noop,
    }

    expect(isPrefix(['g', 'h'], binding)).toBe(true)
  })

  test('returns false for wrong prefix', () => {
    const binding: SequenceBinding = {
      type: 'sequence',
      id: 'test',
      keys: ['g', 'h'],
      handler: noop,
    }

    expect(isPrefix(['x'], binding)).toBe(false)
  })

  test('returns false for too many keys', () => {
    const binding: SequenceBinding = {
      type: 'sequence',
      id: 'test',
      keys: ['g', 'h'],
      handler: noop,
    }

    expect(isPrefix(['g', 'h', 'i'], binding)).toBe(false)
  })
})

describe('findBestCandidate', () => {
  test('returns highest priority complete candidate', () => {
    const binding1: SequenceBinding = {
      type: 'sequence',
      id: 'cmd1',
      keys: ['g', 'h'],
      handler: noop,
    }
    const binding2: SequenceBinding = {
      type: 'sequence',
      id: 'cmd2',
      keys: ['g', 'h'],
      handler: noop,
    }

    const candidates: Candidate[] = [
      {binding: binding1, layerName: 'global', priority: 1},
      {binding: binding2, layerName: 'modal', priority: 2},
    ]

    const result = findBestCandidate(['g', 'h'], candidates)

    expect(result).toBeTruthy()
    expect(result?.binding.id).toBe('cmd2')
    expect(result?.priority).toBe(2)
  })

  test('returns null when no complete candidates', () => {
    const binding: SequenceBinding = {type: 'sequence', id: 'cmd1', keys: ['g', 'h'], handler: noop}
    const candidates: Candidate[] = [{binding, layerName: 'global', priority: 1}]

    const result = findBestCandidate(['g'], candidates)

    expect(result).toBeNull()
  })

  test('returns first candidate when priorities are equal', () => {
    const binding1: SequenceBinding = {
      type: 'sequence',
      id: 'cmd1',
      keys: ['g', 'h'],
      handler: noop,
    }
    const binding2: SequenceBinding = {
      type: 'sequence',
      id: 'cmd2',
      keys: ['g', 'h'],
      handler: noop,
    }

    const candidates: Candidate[] = [
      {binding: binding1, layerName: 'layer1', priority: 1},
      {binding: binding2, layerName: 'layer2', priority: 1},
    ]

    const result = findBestCandidate(['g', 'h'], candidates)

    expect(result).toBeTruthy()
    expect(result?.binding.id).toBe('cmd1')
  })
})
