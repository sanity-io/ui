import {isArray} from './lib/isArray'
import {isRecord} from './lib/isRecord'
import {Pubsub} from './lib/pubsub'
import {WorkshopMsg} from './types'

/** @internal */
export interface WorkshopFrameController {
  message: Pubsub<WorkshopMsg>
  setElement: (el: HTMLIFrameElement | null) => void
}

/** @internal */
export function createWorkshopFrameController(): WorkshopFrameController {
  const _subscribers = new Set<(msg: WorkshopMsg) => void>()

  let _frameElement: HTMLIFrameElement | null = null
  let _msgQueue: WorkshopMsg[] = []
  let _flushTimeout: NodeJS.Timeout | null = null

  function _flush() {
    if (_flushTimeout) {
      clearInterval(_flushTimeout)
    }

    _flushTimeout = setTimeout(() => {
      _frameElement?.contentWindow?.postMessage(_msgQueue, window.location.origin)
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
    if (_frameElement?.contentWindow) {
      window.addEventListener('message', _handleMessage)
    }
  }

  function _unmount(el: HTMLIFrameElement) {
    if (el?.contentWindow) {
      window.removeEventListener('message', _handleMessage)
    }
  }

  return {
    message: {
      publish(msg) {
        _msgQueue.push(msg)
        _flush()
      },
      subscribe(subscriber) {
        _subscribers.add(subscriber)

        return () => {
          _subscribers.delete(subscriber)
        }
      },
    },
    setElement(el) {
      const prevFrameElement = _frameElement

      _frameElement = el

      if (el) {
        _mount()
      } else if (prevFrameElement) {
        _unmount(prevFrameElement)
      }
    },
  }
}
