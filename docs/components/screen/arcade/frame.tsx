import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {basePath} from '$config'
import {isRecord} from '$lib/types'

const Root = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
`

export function ArcadeFrame({hookCode, jsxCode}: {hookCode: string; jsxCode: string}) {
  const [frame, setFrame] = useState<HTMLIFrameElement | null>(null)
  const [ready, setReady] = useState(false)
  const msgQueueRef = useRef<any[]>([])

  // Handle messages from frame
  useEffect(() => {
    if (!frame) return

    const handleMessage = (event: MessageEvent) => {
      const msg = event.data

      // console.log('message from frame', msg)

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

  // Send data to frame
  useEffect(() => {
    if (!frame) return

    const msg = {type: 'arcadeFrame/input', hookCode, jsxCode}

    if (ready) {
      frame.contentWindow?.postMessage(msg, location.origin)
    } else {
      msgQueueRef.current.push(msg)
    }
  }, [frame, hookCode, jsxCode, ready])

  return <Root ref={setFrame} src={`${basePath}/arcade-frame`} />
}
