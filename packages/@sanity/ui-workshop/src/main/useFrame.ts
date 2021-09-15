import React, {useCallback, useEffect, useRef, useState} from 'react'
import {isRecord} from '../lib/isRecord'

interface Frame {
  postMessage: (msg: any) => void
  ready: boolean
  ref: React.Dispatch<React.SetStateAction<HTMLIFrameElement | null>>
  subscribe: (subscriber: (msg: any) => void) => () => void
}

export function useFrame(): Frame {
  const [frameElement, setFrameElement] = useState<HTMLIFrameElement | null>(null)
  const [ready, setReady] = useState(false)
  const msgQueueRef = useRef<any[]>([])

  useEffect(() => {
    if (!frameElement) return

    const handleMessage = (event: MessageEvent) => {
      const msg = event.data

      if (isRecord(msg)) {
        if (msg.type === 'workshop/ready') {
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

        if (msg.type === 'queue') {
          for (const _msg of msg.queue as any) {
            handleMessage({data: _msg} as any)
          }
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [frameElement])

  const postMessage = useCallback(
    (msg: any) => {
      if (frameElement && ready) {
        frameElement.contentWindow?.postMessage(msg, location.origin)
      } else {
        msgQueueRef.current.push(msg)
      }
    },
    [frameElement, ready]
  )

  const subscribe = useCallback((subscriber: (msg: any) => void) => {
    const handleMessage = (event: MessageEvent) => {
      const msg = event.data

      if (isRecord(msg) && typeof msg.type === 'string' && msg.type.startsWith('workshop/')) {
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
