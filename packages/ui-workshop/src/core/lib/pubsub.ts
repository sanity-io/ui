/** @public */
export interface Pubsub<Msg = unknown> {
  publish: (msg: Msg) => void
  subscribe: (subscriber: (msg: Msg) => void) => () => void
}

/** @internal */
export function createPubsub<Msg = unknown>(): Pubsub<Msg> {
  const subscribers = new Set<(msg: Msg) => void>()

  return {
    publish(msg: Msg) {
      for (const subscriber of subscribers) {
        subscriber(msg)
      }
    },

    subscribe(subscriber: (msg: Msg) => void) {
      subscribers.add(subscriber)

      return () => {
        subscribers.delete(subscriber)
      }
    },
  }
}
