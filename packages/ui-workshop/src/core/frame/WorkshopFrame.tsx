import {Root} from '@sanity/ui'
import type {ColorScheme} from '@sanity/ui/tokens'
import {memo, useCallback, useEffect, useMemo, useState} from 'react'

import type {WorkshopConfig} from '../config/types'
import {createPubsub} from '../lib/pubsub'
import {qs} from '../lib/qs'
import type {WorkshopMsg} from '../types/msg'
import type {WorkshopState} from '../types/state'
import {WorkshopProvider} from '../WorkshopProvider'
import {workshopReducer} from '../workshopReducer'
import {WorkshopCanvas} from './WorkshopCanvas'
import {createMainController} from './WorkshopMainController'

/** @internal */
export interface WorkshopFrameProps {
  config: WorkshopConfig
}

function getStateFromLocation(): WorkshopState {
  const query = typeof window === 'undefined' ? {} : qs.parse(window.location.search.slice(1))
  const {path = '/', scheme, viewport, zoom, ...payload} = query

  return {
    frameReady: false,
    path,
    payload,
    scheme: typeof scheme === 'string' ? (scheme as ColorScheme) : 'light',
    viewport: typeof viewport === 'string' ? viewport : 'auto',
    zoom: typeof zoom === 'string' ? Number(zoom) : 1,
  }
}

/** @internal */
export const WorkshopFrame = memo(function WorkshopFrame(
  props: WorkshopFrameProps,
): React.ReactNode {
  const {config} = props
  const main = useMemo(() => createMainController(), [])
  const channel = useMemo(() => createPubsub<WorkshopMsg>(), [])

  // Publish messages to both frame+main
  const broadcast = useCallback(
    (msg: WorkshopMsg) => {
      // Handle msg
      channel.publish(msg)

      // Pass message to main
      main.message.publish(msg)
    },
    [channel, main],
  )

  const [{frameReady, path, payload, scheme, viewport, zoom}, setState] = useState<WorkshopState>(
    () => getStateFromLocation(),
  )

  // Subscribe to global messages
  useEffect(() => channel.subscribe((msg) => setState((s) => workshopReducer(s, msg))), [channel])

  // Pipe messages from main to channel
  useEffect(() => main.message.subscribe(channel.publish), [channel, main])

  // Inform `main` that the frame is ready
  useEffect(() => broadcast({type: 'workshop/frameReady'}), [broadcast])

  return (
    <Root height="fill" lang="en" overflow="auto" scheme={scheme}>
      <WorkshopProvider
        broadcast={broadcast}
        channel={channel}
        config={config}
        frameReady={frameReady}
        origin="frame"
        path={path}
        payload={payload}
        scheme={scheme}
        viewport={viewport}
        zoom={zoom}
      >
        <WorkshopCanvas />
      </WorkshopProvider>
    </Root>
  )
})
