import {useCallback, useEffect, useRef, useState} from 'react'
import {isRecord} from '../isRecord'

export function useFrame() {
  const [frameElement, setFrameElement] = useState<HTMLIFrameElement | null>(null)
  const [ready, setReady] = useState(false)
  const msgQueueRef = useRef<Record<string, unknown>[]>([])

  useEffect(() => {
    if (!frameElement) return

    const handleMessage = (event: MessageEvent) => {
      const msg = event.data

      if (isRecord(msg)) {
        if (msg.type === 'workshop/frame/ready') {
          setReady(true)

          if (msgQueueRef.current.length) {
            for (const queuedMsg of msgQueueRef.current) {
              frameElement.contentWindow?.postMessage(queuedMsg, location.origin)
            }

            msgQueueRef.current = []
          }

          window.removeEventListener('message', handleMessage)

          return
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [frameElement])

  const postMessage = useCallback(
    (msg: Record<string, unknown>) => {
      if (frameElement && ready) {
        frameElement.contentWindow?.postMessage(msg, location.origin)
      } else {
        msgQueueRef.current.push(msg)
      }
    },
    [frameElement, ready]
  )

  const subscribe = useCallback((subscriber: (msg: Record<string, unknown>) => void) => {
    const handleMessage = (event: MessageEvent) => {
      const msg = event.data

      if (isRecord(msg)) {
        subscriber(msg)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return {postMessage, ready, ref: setFrameElement, subscribe}
}
