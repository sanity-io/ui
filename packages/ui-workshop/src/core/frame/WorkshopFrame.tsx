import {
  BoundaryElementProvider,
  Card,
  PortalProvider,
  ThemeColorSchemeKey,
  ToastProvider,
} from '@sanity/ui'
import {memo, useCallback, useEffect, useMemo, useState} from 'react'
import {WorkshopConfig} from '../config'
import {createPubsub} from '../lib/pubsub'
import {qs} from '../lib/qs'
import {WorkshopMsg, WorkshopState} from '../types'
import {WorkshopProvider} from '../WorkshopProvider'
import {workshopReducer} from '../workshopReducer'
import {WorkshopCanvas} from './WorkshopCanvas'
import {createMainController} from './WorkshopMainController'

/** @internal */
export interface WorkshopFrameProps {
  config: WorkshopConfig
  setScheme: (nextScheme: ThemeColorSchemeKey) => void
}

function getStateFromLocation(): WorkshopState {
  const query = typeof window === 'undefined' ? {} : qs.parse(window.location.search.slice(1))
  const {path = '/', scheme, viewport, zoom, ...payload} = query

  return {
    frameReady: false,
    path,
    payload,
    scheme: typeof scheme === 'string' ? (scheme as ThemeColorSchemeKey) : 'light',
    viewport: typeof viewport === 'string' ? viewport : 'auto',
    zoom: typeof zoom === 'string' ? Number(zoom) : 1,
  }
}

/** @internal */
export const WorkshopFrame = memo(function WorkshopFrame(
  props: WorkshopFrameProps,
): React.ReactElement {
  const {config, setScheme} = props
  const main = useMemo(() => createMainController(), [])
  const channel = useMemo(() => createPubsub<WorkshopMsg>(), [])
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

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

  // Update scheme
  useEffect(() => setScheme(scheme), [setScheme, scheme])

  // Inform `main` that the frame is ready
  useEffect(() => broadcast({type: 'workshop/frameReady'}), [broadcast])

  return (
    <ToastProvider>
      <BoundaryElementProvider element={boundaryElement}>
        <PortalProvider element={portalElement}>
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
            <Card height="fill" ref={setBoundaryElement}>
              <WorkshopCanvas />
              <div data-portal="" ref={setPortalElement} />
            </Card>
          </WorkshopProvider>
        </PortalProvider>
      </BoundaryElementProvider>
    </ToastProvider>
  )
})
