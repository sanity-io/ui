import {vi} from 'vitest'

global.ResizeObserver = class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
