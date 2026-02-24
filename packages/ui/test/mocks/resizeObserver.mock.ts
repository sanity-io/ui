import {vi} from 'vitest'

class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.ResizeObserver = ResizeObserverMock as any
