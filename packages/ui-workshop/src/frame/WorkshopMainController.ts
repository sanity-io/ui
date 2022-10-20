import {isArray} from '../lib/isArray'
import {isRecord} from '../lib/isRecord'
import {Pubsub} from '../lib/pubsub'
import {WorkshopMsg} from '../types'

export interface WorkshopMainController {
  message: Pubsub<WorkshopMsg>
}

/** @internal */
export function createMainController(): WorkshopMainController {
  const _subscribers = new Set<(msg: WorkshopMsg) => void>()

  let _msgQueue: WorkshopMsg[] = []
  let _flushTimeout: NodeJS.Timeout | null = null

  function _flush() {
    if (_flushTimeout) {
      clearInterval(_flushTimeout)
    }

    _flushTimeout = setTimeout(() => {
      window.parent.postMessage(_msgQueue)
      _msgQueue = []
      _flushTimeout = null
    }, 0)
  }

  function _handleMessage(event: MessageEvent<unknown>) {
    const msgs = event.data

    if (isArray(msgs)) {
      for (const msg of msgs) {
        if (isRecord(msg) && typeof msg.type === 'string' && msg.type.startsWith('workshop/')) {
          for (const subscriber of _subscribers) {
            subscriber(msg as unknown as WorkshopMsg)
          }
        }
      }
    }
  }

  function _mount() {
    window.addEventListener('message', _handleMessage, false)
  }

  function _unmount() {
    window.removeEventListener('message', _handleMessage, false)
  }

  return {
    message: {
      publish(msg: WorkshopMsg) {
        _msgQueue.push(msg)
        _flush()
      },
      subscribe(subscriber) {
        _subscribers.add(subscriber)

        if (_subscribers.size === 1) {
          _mount()
        }

        return () => {
          _subscribers.delete(subscriber)

          if (_subscribers.size === 0) {
            _unmount()
          }
        }
      },
    },
  }
}
