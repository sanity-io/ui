import {useCallback, useMemo, useRef} from 'react'

export type Msg = Record<string, unknown>

export function useParent(): {postMessage: (msg: Msg) => void} {
  const messageQueueRef = useRef<Msg[]>([])
  const flushTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const _flushMessageQueue = useCallback(() => {
    if (flushTimeoutRef.current) return

    flushTimeoutRef.current = setTimeout(() => {
      const queue = messageQueueRef.current

      messageQueueRef.current = []
      flushTimeoutRef.current = null

      if (queue.length === 1) {
        parent?.postMessage(queue[0], window.location.origin)
      } else {
        parent?.postMessage({type: 'queue', queue}, window.location.origin)
      }
    }, 0)
  }, [])

  const postMessage = useCallback(
    (msg: Msg) => {
      messageQueueRef.current.push(msg)
      _flushMessageQueue()
    },
    [_flushMessageQueue]
  )

  return useMemo(() => ({postMessage}), [postMessage])
}
