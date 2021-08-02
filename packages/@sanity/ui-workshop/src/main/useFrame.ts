import React, {useCallback, useEffect, useRef, useState} from 'react'
import {isRecord} from '../lib/isRecord'

interface Frame {
  postMessage: (msg: Record<string, unknown>) => void
  ready: boolean
  ref: React.Dispatch<React.SetStateAction<HTMLIFrameElement | null>>
  subscribe: (subscriber: (msg: Record<string, unknown>) => void) => () => void
}

export function useFrame(): Frame {
  const [frameElement, setFrameElement] = useState<HTMLIFrameElement | null>(null)
  const [ready, setReady] = useState(false)
  const msgQueueRef = useRef<Record<string, unknown>[]>([])

  useEffect(() => {
    if (!frameElement) return

    const handleMessage = (msg: Record<string, unknown>) => {
      if (isRecord(msg)) {
        if (msg.type === 'workshop/frame/ready') {
          setReady(true)

          if (msgQueueRef.current.length) {
            for (const queuedMsg of msgQueueRef.current) {
              frameElement.contentWindow?.postMessage(queuedMsg, location.origin)
            }

            msgQueueRef.current = []
          }

          window.removeEventListener('message', _handleMessage)

          return
        }

        if (msg.type === 'queue') {
          const queue: any = msg.queue

          for (const _msg of queue) {
            handleMessage(_msg)
          }
        }
      }
    }

    const _handleMessage = (event: MessageEvent) => {
      handleMessage(event.data)
    }

    window.addEventListener('message', _handleMessage)

    return () => {
      window.removeEventListener('message', _handleMessage)
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
