import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {hasVisited, markVisited, readStoredState, writeStoredState} from './storage'
import {initialThemerState, ThemerState} from './themes'

const STORAGE_KEY = 'sanityStudio:themer:state'
const LEGACY_STORAGE_KEY = 'sanityStudio:themer:options'
const VISITED_STORAGE_KEY = 'sanityStudio:themer:visited'

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
            light: {accent: '#ff0000', text: '#333333', contrast: 70},
            dark: {background: '#000000'},
          },
        },
        {slug: 'custom-2', title: 'Stock', options: {}},
      ],
      removed: ['verdant', 'custom-1'],
      order: ['custom-2', 'config', 'verdant'],
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
          {
            slug: 'custom-1',
            title: 'Valid',
            options: {light: {accent: '#FF0000', contrast: 500}, dark: {background: 'nope'}},
          },
          {slug: 'custom-1', title: 'Duplicate', options: {light: {accent: '#00ff00'}}},
          {slug: 'verdant', title: 'Reserved slug', options: {light: {accent: '#00ff00'}}},
          {slug: 'config', title: 'Reserved slug', options: {light: {accent: '#00ff00'}}},
          {slug: 'custom-2', title: 'Stock', options: {}},
          {slug: 'custom-3', title: '   ', options: {dark: {accent: '#00f', text: 'nope'}}},
          {slug: 'custom-4', title: 'No options'},
          'garbage',
        ],
        removed: ['verdant', 'verdant', 'unknown', 'config', 'custom-3', 7],
        order: ['custom-3', 'unknown', 'dew', 'custom-3', 'custom-4', 'config', 3],
      }),
    )

    expect(readStoredState()).toEqual({
      active: null,
      custom: [
        {slug: 'custom-1', title: 'Valid', options: {light: {accent: '#ff0000', contrast: 100}}},
        {slug: 'custom-2', title: 'Stock', options: {}},
        {slug: 'custom-3', title: 'Untitled theme', options: {dark: {accent: '#00f'}}},
      ],
      removed: ['verdant', 'custom-3'],
      order: ['custom-3', 'dew', 'config'],
    })
  })

  it('keeps the image palette of a theme, dropping what is not a color', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        active: null,
        custom: [
          {
            slug: 'custom-1',
            title: 'From image',
            options: {},
            palette: {dominant: '#E11D48', vibrant: 'red', muted: null, extra: '#000000'},
          },
          {slug: 'custom-2', title: 'No colors', options: {}, palette: {vibrant: 'nope'}},
          {slug: 'custom-3', title: 'No palette', options: {}, palette: 'garbage'},
        ],
        removed: [],
      }),
    )

    expect(readStoredState().custom).toEqual([
      {
        slug: 'custom-1',
        title: 'From image',
        options: {},
        palette: {
          dominant: '#e11d48',
          vibrant: null,
          lightVibrant: null,
          darkVibrant: null,
          muted: null,
          lightMuted: null,
          darkMuted: null,
        },
      },
      {slug: 'custom-2', title: 'No colors', options: {}},
      {slug: 'custom-3', title: 'No palette', options: {}},
    ])
  })

  it('falls back on corrupt storage', () => {
    localStorage.setItem(STORAGE_KEY, '{not json')

    expect(readStoredState()).toEqual(initialThemerState)
  })

  it('migrates the draft of earlier versions into a custom theme', () => {
    localStorage.setItem(
      LEGACY_STORAGE_KEY,
      JSON.stringify({accent: '#1cb485', contrast: 70, background: {dark: '#0d1415'}}),
    )

    const state = readStoredState()

    expect(state.custom).toHaveLength(1)
    expect(state.custom[0]).toMatchObject({
      title: 'Draft theme',
      options: {
        light: {accent: '#1cb485', contrast: 70},
        dark: {accent: '#1cb485', contrast: 70, background: '#0d1415'},
      },
    })
    expect(state.active).toBe(state.custom[0].slug)
    expect(state.removed).toEqual([])
    expect(state.order).toEqual([])

    writeStoredState(state)

    expect(localStorage.getItem(LEGACY_STORAGE_KEY)).toBeNull()
    expect(readStoredState()).toEqual(state)
  })

  it('ignores an unusable legacy draft', () => {
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify({accent: 'blue'}))

    expect(readStoredState()).toEqual(initialThemerState)
  })

  it('converts custom themes stored with the flat options of earlier versions', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        active: 'custom-1',
        custom: [
          {
            slug: 'custom-1',
            title: 'Flat',
            options: {accent: '#1cb485', text: '#5c9199', background: {light: '#fcfdfd'}},
          },
        ],
        removed: [],
      }),
    )

    expect(readStoredState().custom).toEqual([
      {
        slug: 'custom-1',
        title: 'Flat',
        options: {
          light: {accent: '#1cb485', text: '#5c9199', background: '#fcfdfd'},
          dark: {accent: '#1cb485', text: '#5c9199'},
        },
      },
    ])
  })
})

describe('themer visit', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createMemoryStorage())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('is not noted until the sidebar has been opened', () => {
    expect(hasVisited()).toBe(false)

    markVisited()

    expect(hasVisited()).toBe(true)
  })

  it('keeps the time of the first visit', () => {
    vi.useFakeTimers()

    try {
      vi.setSystemTime(new Date('2026-09-25T12:00:00.000Z'))
      markVisited()
      vi.setSystemTime(new Date('2026-09-26T12:00:00.000Z'))
      markVisited()

      expect(localStorage.getItem(VISITED_STORAGE_KEY)).toBe('2026-09-25T12:00:00.000Z')
    } finally {
      vi.useRealTimers()
    }
  })

  it('counts any note as a visit', () => {
    localStorage.setItem(VISITED_STORAGE_KEY, 'yes')

    expect(hasVisited()).toBe(true)
  })

  it('does without storage', () => {
    vi.stubGlobal('localStorage', undefined)

    expect(hasVisited()).toBe(false)
    expect(() => markVisited()).not.toThrow()
  })

  it('shrugs off storage that throws', () => {
    const storage = createMemoryStorage()
    const throwing = () => {
      throw new Error('denied')
    }

    storage.getItem = throwing
    storage.setItem = throwing
    vi.stubGlobal('localStorage', storage)

    expect(hasVisited()).toBe(false)
    expect(() => markVisited()).not.toThrow()
  })
})
