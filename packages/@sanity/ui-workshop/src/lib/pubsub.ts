export interface Pubsub<Msg = any> {
  publish: (msg: Msg) => void
  subscribe: (subscriber: (msg: Msg) => void) => () => void
}

export function createPubsub<Msg = any>(): Pubsub<Msg> {
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
