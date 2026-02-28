import {Flex, Root, useMediaIndex} from '@sanity/ui'
import type {ColorScheme} from '@sanity/ui/tokens'
import {debounce, isEqual} from 'lodash'
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
  onSchemeChange: (nextScheme: ColorScheme) => void
  scheme?: ColorScheme
}

function getStateFromLocation(
  loc: Omit<WorkshopLocation, 'type'>,
  schemeProp?: ColorScheme,
  frameReady?: boolean,
): WorkshopState {
  const path = loc.path
  const query = loc.query || {}
  const {scheme, viewport, zoom, ...payload} = query

  return {
    frameReady: frameReady || false,
    path,
    payload,
    scheme: schemeProp || (typeof scheme === 'string' ? (scheme as ColorScheme) : 'light'),
    viewport: typeof viewport === 'string' ? viewport : 'auto',
    zoom: typeof zoom === 'number' ? zoom : 1,
  }
}

function getQueryFromState(state: WorkshopState, withPayload = true): WorkshopQuery {
  const {payload, scheme, viewport, zoom} = state

  const query: WorkshopQuery = {scheme}

  if (viewport && viewport !== DEFAULT_VIEWPORT_VALUE) {
    query['viewport'] = viewport
  }

  if (zoom && zoom !== DEFAULT_ZOOM_VALUE) {
    query['zoom'] = zoom
  }

  if (withPayload) {
    for (const [key, val] of Object.entries(payload)) {
      if (['schema', 'viewport', 'zoom'].includes(key)) {
        // eslint-disable-next-line no-console
        console.warn(
          `Workshop: the payload cannot contain a property named "${key}" (protected name)`,
        )
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        query[key] = val as any
      }
    }
  }

  return query
}

/** @public */
export const Workshop = memo(function Workshop(props: WorkshopProps): React.ReactNode {
  const {config, locationStore, onSchemeChange, scheme: schemeProp} = props
  const withNavbar = config.features?.navbar ?? true
  const channel = useMemo(() => createPubsub<WorkshopMsg>(), [])
  const frame = useMemo(() => createWorkshopFrameController(), [])
  const [{frameReady, path, payload, scheme, viewport, zoom}, setState] = useState<WorkshopState>(
    () => getStateFromLocation(locationStore.get(), schemeProp),
  )
  const mediaIndex = useMediaIndex()
  const [navigatorExpanded, setNavigatorExpanded] = useState(false)
  const [inspectorExpanded, setInspectorExpanded] = useState(false)
  const frameReadyRef = useRef(frameReady)

  const schemeRef = useRef(scheme)
  const pathRef = useRef(path)
  const queryRef = useRef<WorkshopQuery>({scheme, viewport, zoom, ...payload})

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

  // Subscribe to global message channel
  useEffect(
    () =>
      channel.subscribe((msg) => {
        // Update state
        setState((prevState) => {
          const nextState = workshopReducer(prevState, msg)
          const changed = !isEqual(prevState, nextState)

          if (changed) {
            // Update URL location
            if (msg.type === 'workshop/setPath') {
              if (pathRef.current !== nextState.path) {
                pathRef.current = nextState.path

                // query without payload
                const nextQuery = getQueryFromState(nextState, false)

                _pushLocation({path: nextState.path, query: nextQuery})
              }
            } else if (msg.type !== 'workshop/setState') {
              // query with payload
              const nextQuery = getQueryFromState(nextState)

              if (!isEqual(queryRef.current, nextQuery)) {
                queryRef.current = nextQuery

                _replaceLocation({path: nextState.path, query: nextQuery})
              }
            }
          }

          return changed ? nextState : prevState
        })
      }),
    [_pushLocation, _replaceLocation, channel, locationStore],
  )

  // Pipe messages from frame to channel
  useEffect(() => frame.message.subscribe(channel.publish), [channel, frame])

  useEffect(() => {
    frameReadyRef.current = frameReady
  }, [frameReady])

  // Handle location updates
  useEffect(
    () =>
      locationStore.subscribe((loc) => {
        const nextState = getStateFromLocation(loc, undefined, frameReady)

        broadcast({type: 'workshop/setState', value: nextState})
      }),
    [broadcast, frameReady, locationStore],
  )

  // Observe `scheme` state
  useEffect(() => {
    schemeRef.current = scheme

    // Call the `onSchemeChange` callback when `scheme` changes
    onSchemeChange(scheme)
  }, [onSchemeChange, scheme])

  // Broadcast changes to `scheme` property
  useEffect(() => {
    if (schemeProp) {
      if (schemeRef.current !== schemeProp) {
        schemeRef.current = schemeProp
        broadcast({type: 'workshop/setScheme', value: schemeProp})
      }
    }
  }, [broadcast, schemeProp])

  if (!config.scopes) {
    return <>No scopes</>
  }

  return (
    <Root height="fill" lang="en" scheme={scheme}>
      <WorkshopProvider
        broadcast={broadcast}
        channel={channel}
        config={config}
        frameReady={frameReady}
        origin="main"
        path={path}
        payload={payload}
        scheme={scheme}
        viewport={viewport}
        zoom={zoom}
      >
        <Flex direction="column" height="fill" style={{minWidth: 320}}>
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
              frameRef={frame.setElement}
              hidden={navigatorExpanded || inspectorExpanded}
            />
            <WorkshopInspector expanded={inspectorExpanded} />
          </Flex>
        </Flex>
      </WorkshopProvider>
    </Root>
  )
})
