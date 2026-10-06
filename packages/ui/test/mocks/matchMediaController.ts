import {type Mock, vi} from 'vitest'

type ChangeListener = (event: MediaQueryListEvent) => void

interface ControlledList {
  matches: boolean
  listeners: Set<ChangeListener>
}

export interface MatchMediaController {
  /** The installed `window.matchMedia`, for counting how often each query was evaluated */
  matchMedia: Mock<(query: string) => MediaQueryList>
  /** Number of `change` listeners attached across every list created for `query` */
  listenerCount: (query: string) => number
  /** Flips `query` and fires the `change` listeners of every list created for it */
  setMatches: (query: string, matches: boolean) => void
  restore: () => void
}

/**
 * Installs a `window.matchMedia` whose queries can be flipped and whose `change` listeners can
 * be counted. Unlike `matchMedia.mock.ts`, every call creates a new list, so the call count on
 * `matchMedia` shows exactly how often a query was evaluated.
 */
export function installMatchMedia(
  initialMatches: Record<string, boolean> = {},
): MatchMediaController {
  const originalMatchMedia = window.matchMedia
  const lists = new Map<string, ControlledList[]>()

  const matchMedia = vi.fn((query: string): MediaQueryList => {
    const controlled: ControlledList = {
      matches: initialMatches[query] ?? false,
      listeners: new Set(),
    }

    lists.set(query, [...(lists.get(query) ?? []), controlled])

    return {
      get matches() {
        return controlled.matches
      },
      media: query,
      onchange: null,
      // Untyped mocks, like the hydration tests use: a typed implementation is not assignable
      // to the overloaded `addEventListener` signature
      addEventListener: vi.fn().mockImplementation((_type: string, listener: ChangeListener) => {
        controlled.listeners.add(listener)
      }),
      removeEventListener: vi.fn().mockImplementation((_type: string, listener: ChangeListener) => {
        controlled.listeners.delete(listener)
      }),
      // oxlint-disable-next-line no-deprecated -- MediaQueryList requires this legacy method
      addListener: vi.fn(),
      // oxlint-disable-next-line no-deprecated -- MediaQueryList requires this legacy method
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(() => true),
    }
  })

  window.matchMedia = matchMedia

  return {
    matchMedia,
    listenerCount: (query) =>
      (lists.get(query) ?? []).reduce((count, list) => count + list.listeners.size, 0),
    setMatches: (query, matches) => {
      for (const list of lists.get(query) ?? []) {
        list.matches = matches

        for (const listener of list.listeners) {
          listener(Object.assign(new Event('change'), {matches, media: query}))
        }
      }
    },
    restore: () => {
      window.matchMedia = originalMatchMedia
    },
  }
}
