import {Box, Flex, Root, useMediaIndex} from '@sanity/ui'
import type {ColorScheme} from '@sanity/ui/theme'
import debounce from 'lodash/debounce'
import {memo, startTransition, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import type {WorkshopConfig} from './config/types'
import {DEFAULT_VIEWPORT_VALUE, DEFAULT_ZOOM_VALUE} from './constants'
import {WorkshopInspector} from './inspector/WorkshopInspector'
import {createPubsub} from './lib/pubsub'
import type {WorkshopLocationStore} from './location/LocationStore'
import {WorkshopNavbar} from './navbar/WorkshopNavbar'
import {WorkshopNavigator} from './navigator/WorkshopNavigator'
import type {WorkshopLocation, WorkshopQuery} from './types/location'
import type {WorkshopMsg} from './types/msg'
import type {WorkshopState} from './types/state'
import {WorkshopCanvas} from './WorkshopCanvas'
import {createWorkshopFrameController} from './WorkshopFrameController'
import {WorkshopProvider} from './WorkshopProvider'
import {workshopReducer} from './workshopReducer'

/** @public */
export interface WorkshopProps {
  config: WorkshopConfig
  locationStore: WorkshopLocationStore
  initialScheme: ColorScheme
}

function getStateFromLocation(
  loc: Omit<WorkshopLocation, 'type'>,
  schemeProp: ColorScheme,
  frameReady?: boolean,
): WorkshopState {
  const path = loc.path
  const query = loc.query ?? {}
  const {scheme, viewport, zoom, ...payload} = query

  return {
    context: 'main',
    frameReady: frameReady ?? false,
    path,
    payload,
    scheme: typeof scheme === 'string' ? (scheme as ColorScheme) : schemeProp,
    viewport: typeof viewport === 'string' ? viewport : 'auto',
    zoom: typeof zoom === 'string' ? Number(zoom) : 1,
  }
}

function getQueryFromState(state: WorkshopState): WorkshopQuery {
  const {payload, scheme, viewport, zoom} = state

  const query: WorkshopQuery = {scheme}

  if (viewport && viewport !== DEFAULT_VIEWPORT_VALUE) {
    query['viewport'] = viewport
  }

  if (zoom && zoom !== DEFAULT_ZOOM_VALUE) {
    query['zoom'] = zoom
  }

  for (const [key, val] of Object.entries(payload)) {
    if (['schema', 'viewport', 'zoom'].includes(key)) {
      // eslint-disable-next-line no-console
      console.warn(
        `Workshop: the payload cannot contain a property named "${key}" (protected name)`,
      )
    } else {
      query[key] = val
    }
  }

  return query
}

/** @public */
export const Workshop = memo(function Workshop(props: WorkshopProps): React.ReactNode {
  const {config, locationStore, initialScheme} = props
  const withNavbar = config.features?.navbar ?? true
  const channel = useMemo(() => createPubsub<WorkshopMsg>(), [])
  const frame = useMemo(() => createWorkshopFrameController(), [])

  const [{frameReady, path, payload, scheme, viewport, zoom}, setState] = useState<WorkshopState>(
    () => getStateFromLocation(locationStore.get(), initialScheme),
  )
  const mediaIndex = useMediaIndex()
  const [navigatorExpanded, setNavigatorExpanded] = useState(false)
  const [inspectorExpanded, setInspectorExpanded] = useState(false)
  const frameReadyRef = useRef(frameReady)

  const schemeRef = useRef(scheme)
  const pathRef = useRef(path)
  const viewportRef = useRef(viewport)
  const zoomRef = useRef(zoom)
  const payloadRef = useRef(JSON.stringify(payload))

  const broadcast = useCallback(
    (msg: WorkshopMsg) => {
      // Handle msg
      channel.publish(msg)

      // Pass message to frame
      frame.message.publish(msg)
    },
    [channel, frame],
  )

  const _pushLocation = useMemo(
    () => debounce((loc: Omit<WorkshopLocation, 'type'>) => locationStore.push(loc), 150),
    [locationStore],
  )

  const _replaceLocation = useMemo(
    () => debounce((loc: Omit<WorkshopLocation, 'type'>) => locationStore.replace(loc), 150),
    [locationStore],
  )

  const handleNavigatorToggle = useCallback(() => {
    setNavigatorExpanded((v) => !v)
    setInspectorExpanded(false)
  }, [])

  const handleInspectorToggle = useCallback(() => {
    setNavigatorExpanded(false)
    setInspectorExpanded((v) => !v)
  }, [])

  const mediaIndexRef = useRef(mediaIndex)

  useEffect(() => {
    const prevMediaIndex = mediaIndexRef.current

    if (prevMediaIndex < 2 && mediaIndex >= 2) {
      startTransition(() => {
        setNavigatorExpanded(false)
        setInspectorExpanded(false)
      })
    }

    mediaIndexRef.current = mediaIndex
  }, [mediaIndex])

  useEffect(() => {
    startTransition(() => setNavigatorExpanded(false))
  }, [path])

  // Cancel debounced functions
  useEffect(() => () => _pushLocation.cancel(), [_pushLocation])
  useEffect(() => () => _replaceLocation.cancel(), [_replaceLocation])

  // Update refs when state changes
  useEffect(() => {
    if (
      pathRef.current !== path ||
      schemeRef.current !== scheme ||
      viewportRef.current !== viewport ||
      zoomRef.current !== zoom ||
      payloadRef.current !== JSON.stringify(payload)
    ) {
      const nextLocation = {
        path,
        query: getQueryFromState({
          context: 'main',
          frameReady,
          path,
          payload,
          scheme,
          viewport,
          zoom,
        }),
      }

      // Determine if we should push or replace based on path change
      if (pathRef.current !== path) {
        _pushLocation(nextLocation)
      } else {
        _replaceLocation(nextLocation)
      }

      pathRef.current = path
      schemeRef.current = scheme
      viewportRef.current = viewport
      zoomRef.current = zoom
      payloadRef.current = JSON.stringify(payload)
    }
  }, [_pushLocation, _replaceLocation, frameReady, path, payload, scheme, viewport, zoom])

  // Subscribe to global message channel
  useEffect(
    () =>
      channel.subscribe((msg) => {
        setState((prevState) => workshopReducer(prevState, msg))
      }),
    [channel],
  )

  // Pipe messages from frame to channel
  useEffect(() => frame.message.subscribe(channel.publish), [channel, frame])

  useEffect(() => {
    frameReadyRef.current = frameReady
  }, [frameReady])

  if (!config.scopes) {
    return <>No scopes</>
  }

  return (
    <WorkshopProvider
      config={config}
      broadcast={broadcast}
      channel={channel}
      frameReady={frameReady}
      origin="main"
      path={path}
      payload={payload}
      scheme={scheme}
      viewport={viewport}
      zoom={zoom}
    >
      <Root height="fill" scheme={scheme} tone="default">
        <Box display="flex" flexDirection="column" height="fill">
          {withNavbar && (
            <WorkshopNavbar
              inspectorExpanded={inspectorExpanded}
              navigatorExpanded={navigatorExpanded}
              onInspectorToggle={handleInspectorToggle}
              onNavigatorToggle={handleNavigatorToggle}
            />
          )}

          <Flex flex={1}>
            <WorkshopNavigator collections={config.collections} expanded={navigatorExpanded} />
            <WorkshopCanvas
              frameRef={frame.setElement}
              hidden={navigatorExpanded || inspectorExpanded}
            />
            <WorkshopInspector expanded={inspectorExpanded} />
          </Flex>
        </Box>
      </Root>
    </WorkshopProvider>
  )
})
