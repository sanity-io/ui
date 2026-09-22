import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {readStoredState, writeStoredState} from './storage'
import {initialThemerState, ThemerState} from './themes'

const STORAGE_KEY = 'sanityStudio:themer:state'
const LEGACY_STORAGE_KEY = 'sanityStudio:themer:options'

function createMemoryStorage(): Storage {
  const data = new Map<string, string>()

  return {
    get length() {
      return data.size
    },
    clear: () => data.clear(),
    getItem: (key) => data.get(key) ?? null,
    key: (index) => [...data.keys()][index] ?? null,
    removeItem: (key) => void data.delete(key),
    setItem: (key, value) => void data.set(key, value),
  }
}

describe('themer storage', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createMemoryStorage())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts from the initial state', () => {
    expect(readStoredState()).toEqual(initialThemerState)
  })

  it('round-trips the state', () => {
    const state: ThemerState = {
      active: 'custom-1',
      custom: [
        {
          slug: 'custom-1',
          title: 'Mine',
          options: {
            accent: '#ff0000',
            text: '#333333',
            background: {dark: '#000000'},
            contrast: 70,
          },
        },
      ],
      removed: ['verdant', 'custom-1'],
    }

    writeStoredState(state)

    expect(readStoredState()).toEqual(state)
  })

  it('drops what it cannot use', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        active: 42,
        custom: [
          {slug: 'custom-1', title: 'Valid', options: {accent: '#FF0000', contrast: 500}},
          {slug: 'custom-1', title: 'Duplicate', options: {accent: '#00ff00'}},
          {slug: 'verdant', title: 'Reserved slug', options: {accent: '#00ff00'}},
          {slug: 'config', title: 'Reserved slug', options: {accent: '#00ff00'}},
          {slug: 'custom-2', title: 'Bad accent', options: {accent: 'red'}},
          {slug: 'custom-3', title: '   ', options: {accent: '#00f', text: 'nope'}},
          'garbage',
        ],
        removed: ['verdant', 'verdant', 'unknown', 'config', 'custom-3', 7],
      }),
    )

    expect(readStoredState()).toEqual({
      active: null,
      custom: [
        {slug: 'custom-1', title: 'Valid', options: {accent: '#ff0000', contrast: 100}},
        {slug: 'custom-3', title: 'Untitled theme', options: {accent: '#00f'}},
      ],
      removed: ['verdant', 'custom-3'],
    })
  })

  it('falls back on corrupt storage', () => {
    localStorage.setItem(STORAGE_KEY, '{not json')

    expect(readStoredState()).toEqual(initialThemerState)
  })

  it('migrates the draft of earlier versions into a custom theme', () => {
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify({accent: '#1cb485', contrast: 70}))

    const state = readStoredState()

    expect(state.custom).toHaveLength(1)
    expect(state.custom[0]).toMatchObject({
      title: 'Draft theme',
      options: {accent: '#1cb485', contrast: 70},
    })
    expect(state.active).toBe(state.custom[0].slug)
    expect(state.removed).toEqual([])

    writeStoredState(state)

    expect(localStorage.getItem(LEGACY_STORAGE_KEY)).toBeNull()
    expect(readStoredState()).toEqual(state)
  })

  it('ignores an unusable legacy draft', () => {
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify({accent: 'blue'}))

    expect(readStoredState()).toEqual(initialThemerState)
  })
})
