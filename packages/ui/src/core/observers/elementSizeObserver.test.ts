/** @vitest-environment jsdom */

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {_elementSizeObserver as observer} from './elementSizeObserver'

class RecordingResizeObserver {
  static instances: RecordingResizeObserver[] = []

  callback: ResizeObserverCallback
  targets = new Set<Element>()
  disconnected = false

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
    RecordingResizeObserver.instances.push(this)
  }

  observe(target: Element) {
    this.targets.add(target)
  }

  unobserve(target: Element) {
    this.targets.delete(target)
  }

  disconnect() {
    this.targets.clear()
    this.disconnected = true
  }

  resize(target: Element, width: number) {
    const size = {inlineSize: width, blockSize: 10}

    this.callback(
      [
        {
          target,
          contentRect: target.getBoundingClientRect(),
          borderBoxSize: [size],
          contentBoxSize: [size],
          devicePixelContentBoxSize: [size],
        },
      ],
      this,
    )
  }
}

// The observer is a module singleton keyed by element, so every test uses an element of its own
describe('_elementSizeObserver', () => {
  let element: HTMLDivElement

  beforeEach(() => {
    element = document.createElement('div')
    RecordingResizeObserver.instances = []
    vi.stubGlobal('ResizeObserver', RecordingResizeObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shares one observation per element between its subscribers', () => {
    const first = vi.fn()
    const second = vi.fn()

    observer.subscribe(element, first)
    observer.subscribe(element, second)

    expect(RecordingResizeObserver.instances).toHaveLength(1)

    RecordingResizeObserver.instances[0].resize(element, 300)

    expect(first).toHaveBeenCalledWith(expect.objectContaining({border: {width: 300, height: 10}}))
    expect(second).toHaveBeenCalledWith(expect.objectContaining({border: {width: 300, height: 10}}))
  })

  it('stops observing when the last subscriber leaves, whichever subscribed first', () => {
    const unsubscribeFirst = observer.subscribe(element, vi.fn())
    const unsubscribeSecond = observer.subscribe(element, vi.fn())

    unsubscribeFirst()

    expect(RecordingResizeObserver.instances[0].disconnected).toBe(false)

    unsubscribeSecond()

    expect(RecordingResizeObserver.instances[0].disconnected).toBe(true)
  })

  it('observes the element again for a subscriber that arrives after the last one left', () => {
    const unsubscribe = observer.subscribe(element, vi.fn())

    unsubscribe()

    const later = vi.fn()

    observer.subscribe(element, later)

    expect(RecordingResizeObserver.instances).toHaveLength(2)
    expect(RecordingResizeObserver.instances[1].targets.has(element)).toBe(true)

    RecordingResizeObserver.instances[1].resize(element, 200)

    expect(later).toHaveBeenCalledWith(expect.objectContaining({border: {width: 200, height: 10}}))
  })

  it('ignores a stale unsubscribe once a later subscriber has started a new observation', () => {
    const unsubscribe = observer.subscribe(element, vi.fn())

    unsubscribe()
    observer.subscribe(element, vi.fn())
    unsubscribe()

    expect(RecordingResizeObserver.instances[1].disconnected).toBe(false)
  })
})
