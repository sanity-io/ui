/**
 * @beta
 */
export interface ElementRectValue {
  width: number
  height: number
}

/**
 * @beta
 */
export interface ElementSize {
  content: ElementRectValue
  border: ElementRectValue

  /** @deprecated INTERNAL ONLY */
  _contentRect: DOMRectReadOnly
}

/**
 * @internal
 */
export type _ElementSizeSubscriber = (elementRect: ElementSize) => void

/**
 * @internal
 */
export interface _ElementSizeObserver {
  subscribe: (element: HTMLElement, subscriber: _ElementSizeSubscriber) => () => void
}

/**
 * @internal
 */
export interface _ElementSizeListener {
  subscribe: (element: HTMLElement, subscriber: _ElementSizeSubscriber) => () => void
}

// Initialize element size observer
// NOTE: this should NOT have size effects
/**
 * @internal
 */
export const _elementSizeObserver = _createElementSizeObserver()

function _createElementRectValueListener(): _ElementSizeListener {
  return {
    subscribe(element, subscriber) {
      const resizeObserver = new ResizeObserver(([entry]) => {
        subscriber({
          // oxlint-disable-next-line no-deprecated
          _contentRect: entry.contentRect,
          border: {
            width: entry.borderBoxSize[0].inlineSize,
            height: entry.borderBoxSize[0].blockSize,
          },
          content: {
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          },
        })
      })

      resizeObserver.observe(element)

      return () => {
        resizeObserver.unobserve(element)
        resizeObserver.disconnect()
      }
    },
  }
}

function _createElementSizeObserver(): _ElementSizeObserver {
  const disposeCache = new WeakMap<HTMLElement, () => void>()
  const subscribersCache = new WeakMap<HTMLElement, _ElementSizeSubscriber[]>()

  return {
    subscribe(element, subscriber) {
      let subscribers = subscribersCache.get(element)

      if (!subscribers) {
        const currentSubscribers: _ElementSizeSubscriber[] = []

        subscribers = currentSubscribers
        subscribersCache.set(element, subscribers)

        const listener = _createElementRectValueListener()

        // listen
        disposeCache.set(
          element,
          listener.subscribe(element, (elementRect) => {
            for (const sub of currentSubscribers) {
              sub(elementRect)
            }
          }),
        )
      }

      subscribers.push(subscriber)

      return () => {
        // dispose

        const idx = subscribers.indexOf(subscriber)

        if (idx > -1) {
          subscribers.splice(idx, 1)
        }

        // The last subscriber of this element leaving stops the observation and forgets the
        // element, so that a later subscriber starts a new one. (The guard keeps a stale
        // unsubscribe from disposing an observation that a later subscriber started.)
        if (subscribers.length === 0 && subscribersCache.get(element) === subscribers) {
          // unlisten
          disposeCache.get(element)?.()
          disposeCache.delete(element)
          subscribersCache.delete(element)
        }
      }
    },
  }
}
