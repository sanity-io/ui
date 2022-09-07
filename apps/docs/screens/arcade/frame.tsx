import {useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {useApp} from '$components/app'
import {basePath} from '$config'
import {isRecord} from '$lib/types'

const Root = styled.iframe`
  background: none;
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
`

export function ArcadeFrame({hookCode, jsxCode}: {hookCode: string; jsxCode: string}) {
  const {colorScheme} = useApp()
  const [frame, setFrame] = useState<HTMLIFrameElement | null>(null)
  const [ready, setReady] = useState(false)
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
    (msg: any) => {
      if (!frame) return

      if (ready) {
        frame.contentWindow?.postMessage(msg, location.origin)
      } else {
        msgQueueRef.current.push(msg)
      }
    },
    [frame, ready]
  )

  // Send color scheme to frame
  useEffect(
    () => postMessage({type: 'arcadeFrame/colorScheme', colorScheme}),
    [colorScheme, postMessage]
  )

  // Send input to frame
  useEffect(
    () => postMessage({type: 'arcadeFrame/input', hookCode, jsxCode}),
    [hookCode, jsxCode, postMessage]
  )

  return <Root ref={setFrame} src={`${basePath}/arcade-frame`} />
}
