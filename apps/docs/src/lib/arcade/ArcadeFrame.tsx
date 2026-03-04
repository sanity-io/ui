import {Box} from '@sanity/ui'
import {ReactElement, useCallback, useEffect, useRef, useState} from 'react'

import {useApp} from '@/app/useApp'
import {isRecord} from '@/lib/common'

export function ArcadeFrame({
  hookCode,
  jsxCode,
}: {
  hookCode: string
  jsxCode: string
}): ReactElement {
  const {basePath, version} = useApp()

  const [frame, setFrame] = useState<HTMLIFrameElement | null>(null)
  const [ready, setReady] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const msgQueueRef = useRef<any[]>([])

  // Handle messages from frame
  useEffect(() => {
    if (!frame) return

    const handleMessage = (event: MessageEvent) => {
      const msg = event.data

      if (isRecord(msg)) {
        if (msg.type === 'arcadeFrame/ready') {
          setReady(true)

          if (msgQueueRef.current.length) {
            for (const queuedMsg of msgQueueRef.current) {
              frame.contentWindow?.postMessage(queuedMsg, location.origin)
            }

            msgQueueRef.current = []
          }

          return
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [frame])

  const postMessage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (msg: any) => {
      if (!frame) return

      if (ready) {
        frame.contentWindow?.postMessage(msg, location.origin)
      } else {
        msgQueueRef.current.push(msg)
      }
    },
    [frame, ready],
  )

  // Send input to frame
  useEffect(
    () => postMessage({type: 'arcadeFrame/input', hookCode, jsxCode}),
    [hookCode, jsxCode, postMessage],
  )

  return (
    <Box
      as="iframe"
      ref={setFrame}
      src={`${basePath}/arcade/frame?version=${version}`}
      height="fill"
      width="fill"
    />
  )
}
