import {Box, Flex, Root, Text, useMediaIndex, usePrefersDark} from '@sanity/ui'
import type {ColorScheme} from '@sanity/ui/tokens'
import debounce from 'lodash/debounce'
import {startTransition, useCallback, useEffect, useMemo, useRef, useState} from 'react'

import type {WorkshopConfig} from './config/types'
import {DEFAULT_SCHEME_VALUE, DEFAULT_VIEWPORT_VALUE, DEFAULT_ZOOM_VALUE} from './constants'
import {WorkshopInspector} from './inspector/WorkshopInspector'
import {detectPlatform} from './lib/platform'
import {createPubsub} from './lib/pubsub'
import {startViewTransition} from './lib/startViewTransition'
import type {WorkshopLocationStore} from './location/LocationStore'
import {WorkshopNavbar} from './navbar/WorkshopNavbar'
import {WorkshopNavigator} from './navigator/WorkshopNavigator'
import type {WorkshopLocation, WorkshopQuery} from './types/location'
import type {WorkshopMsg} from './types/msg'
import type {WorkshopState} from './types/state'
import {WorkshopCanvas} from './WorkshopCanvas'
import {WorkshopCommands} from './WorkshopCommands'
import {createWorkshopFrameController} from './WorkshopFrameController'
import {WorkshopProvider} from './WorkshopProvider'
import {workshopReducer} from './workshopReducer'

/** @public */
export interface WorkshopProps {
  config: WorkshopConfig
  locationStore: WorkshopLocationStore
}

function getStateFromLocation(
  loc: Omit<WorkshopLocation, 'type'>,
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
    scheme: typeof scheme === 'string' ? (scheme as ColorScheme) : 'system',
    viewport: typeof viewport === 'string' ? viewport : 'auto',
    zoom: typeof zoom === 'string' ? Number(zoom) : 1,
  }
}

function getQueryFromState(state: WorkshopState): WorkshopQuery {
  const {payload, scheme, viewport, zoom} = state

  const query: WorkshopQuery = {}

  if (scheme && scheme !== DEFAULT_SCHEME_VALUE) {
    query['scheme'] = scheme
  }

  if (viewport && viewport !== DEFAULT_VIEWPORT_VALUE) {
    query['viewport'] = viewport
  }

  if (zoom && zoom !== DEFAULT_ZOOM_VALUE) {
    query['zoom'] = zoom
  }

  for (const [key, val] of Object.entries(payload)) {
    if (['scheme', 'viewport', 'zoom'].includes(key)) {
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
export function Workshop(props: WorkshopProps) {
  const {config, locationStore} = props
  const platform = detectPlatform()
  const prefersDark = usePrefersDark()
  const withNavbar = config.features?.navbar ?? true
  const [channel] = useState(() => createPubsub<WorkshopMsg>())
  const frame = useMemo(() => createWorkshopFrameController(), [])
  const [{frameReady, path, payload, scheme, viewport, zoom}, setState] = useState<WorkshopState>(
    () => getStateFromLocation(locationStore.get()),
  )
  const mediaIndex = useMediaIndex()
  const [navigatorExpanded, setNavigatorExpanded] = useState(false)
  const [inspectorExpanded, setInspectorExpanded] = useState(false)
  const frameReadyRef = useRef(frameReady)
  const pathRef = useRef(path)
  const schemeRef = useRef(scheme)
  const viewportRef = useRef(viewport)
  const zoomRef = useRef(zoom)
  const payloadRef = useRef(JSON.stringify(payload))

  const [rootScheme, setRootScheme] = useState(() =>
    scheme === 'system' ? (prefersDark ? 'dark' : 'light') : scheme,
  )

  useEffect(() => {
    startViewTransition(() => {
      setRootScheme(scheme === 'system' ? (prefersDark ? 'dark' : 'light') : scheme)
    })
  }, [scheme, prefersDark])

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
  useEffect(() => {
    return channel.subscribe((msg) => {
      setState((prevState) => workshopReducer(prevState, msg))
    })
  }, [channel])

  // Pipe messages from frame to channel
  useEffect(() => frame.message.subscribe(channel.publish), [channel, frame])

  useEffect(() => {
    frameReadyRef.current = frameReady
  }, [frameReady])

  const iframeElementRef = useRef<HTMLIFrameElement>(null)

  // Handle iframe ref changes
  const handleFrameRef = useCallback(
    (el: HTMLIFrameElement | null) => {
      frame.setElement(el)
      iframeElementRef.current = el
    },
    [frame],
  )

  if (!config.scopes) {
    return (
      <Root height="fill" lang="en" padding={4} scheme={rootScheme}>
        <Text size={1}>No scopes</Text>
      </Root>
    )
  }

  return (
    <Root data-workshop="" data-workshop-zoom={zoom} height="fill" lang="en" scheme={rootScheme}>
      <WorkshopProvider
        broadcast={broadcast}
        channel={channel}
        config={config}
        frameReady={frameReady}
        origin="main"
        path={path}
        payload={payload}
        platform={platform}
        scheme={scheme}
        viewport={viewport}
        zoom={zoom}
      >
        <WorkshopCommands
          handleInspectorToggle={handleInspectorToggle}
          handleNavigatorToggle={handleNavigatorToggle}
          iframeElementRef={iframeElementRef}
        />

        <Box display="flex" flexDirection="column" height="fill">
          {withNavbar && (
            <WorkshopNavbar
              inspectorExpanded={inspectorExpanded}
              navigatorExpanded={navigatorExpanded}
              onInspectorToggle={handleInspectorToggle}
              onNavigatorToggle={handleNavigatorToggle}
            />
          )}

          <Flex flex={1} overflow="hidden">
            <WorkshopNavigator collections={config.collections} expanded={navigatorExpanded} />
            <WorkshopCanvas
              frameRef={handleFrameRef}
              hidden={navigatorExpanded || inspectorExpanded}
            />
            <WorkshopInspector expanded={inspectorExpanded} />
          </Flex>
        </Box>
      </WorkshopProvider>
    </Root>
  )
}
