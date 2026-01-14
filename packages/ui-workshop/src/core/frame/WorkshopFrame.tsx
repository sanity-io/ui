import {Root, usePrefersDark} from '@sanity/ui'
import type {ColorScheme} from '@sanity/ui/theme'
import {memo, useCallback, useEffect, useReducer, useState} from 'react'
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
    context: 'frame',
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
  const [main] = useState(() => createMainController())
  const [channel] = useState(() => createPubsub<WorkshopMsg>())
  const prefersDark = usePrefersDark()
  const scheme = prefersDark ? 'dark' : 'light'

  // Publish messages to both `frame` and `main`
  const broadcast = useCallback(
    (msg: WorkshopMsg) => {
      channel.publish(msg)

      main.message.publish(msg)
    },
    [channel, main],
  )

  const [initialState] = useState(getStateFromLocation)
  const [state, dispatch] = useReducer(workshopReducer, initialState)

  const {frameReady, path, payload, viewport, zoom} = state

  // Subscribe to message channel
  useEffect(() => channel.subscribe(dispatch), [channel])

  // Pipe messages from `main` to message channel
  useEffect(() => main.message.subscribe(channel.publish), [channel, main])

  // Inform `main` that `frame` is ready
  useEffect(() => broadcast({type: 'workshop/frameReady'}), [broadcast])

  return (
    <WorkshopProvider
      broadcast={broadcast}
      config={config}
      channel={channel}
      frameReady={frameReady}
      origin="frame"
      path={path}
      payload={payload}
      scheme={scheme}
      viewport={viewport}
      zoom={zoom}
    >
      <Root height="fill" overflow="auto" scheme={scheme} tone="default">
        <WorkshopCanvas />
      </Root>
    </WorkshopProvider>
  )
})
