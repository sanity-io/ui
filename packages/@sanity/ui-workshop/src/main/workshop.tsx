import {BoundaryElementProvider, Flex, PortalProvider, ToastProvider} from '@sanity/ui'
import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from 'react'
import {WORKSHOP_DEFAULT_FEATURES} from '../constants'
import {isRecord} from '../lib/isRecord'
import {decode as zlibDecode, encode as zlibEncode} from '../lib/zlib'
import {workshopReducer} from '../store'
import {WorkshopMsg} from '../store/types'
import {
  PropSchema,
  WorkshopCollection,
  WorkshopFeatures,
  WorkshopLocation,
  WorkshopScope,
} from '../types'
import {useFrame} from './useFrame'
import {WorkshopNavbar} from './workshopNavbar'
import {WorkshopProvider} from './workshopProvider'
import {WorkshopStoryCanvas} from './workshopStoryCanvas'
import {WorkshopStoryInspector} from './workshopStoryInspector'
import {WorkshopStoryNav} from './workshopStoryNav'

export interface WorkshopProps {
  collections?: WorkshopCollection[]
  features?: Partial<WorkshopFeatures>
  frameUrl: string
  location: WorkshopLocation
  onLocationPush: (loc: WorkshopLocation) => void
  onLocationReplace: (loc: WorkshopLocation) => void
  scheme: 'dark' | 'light'
  scopes: WorkshopScope[]
  setScheme: (scheme: 'dark' | 'light') => void
  title: string
}

function _sortScopes(a: WorkshopScope, b: WorkshopScope) {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1

  return 0
}

function encodeValue(val: any) {
  return zlibEncode(JSON.stringify(val))
}

function decodeValue(val: string) {
  return JSON.parse(zlibDecode(val))
}

export function Workshop(props: WorkshopProps): React.ReactElement {
  const {
    collections,
    features: featuresProp = {},
    frameUrl,
    location,
    onLocationPush,
    onLocationReplace,
    scheme,
    scopes: scopesProp,
    setScheme,
    title,
  } = props

  const features = useMemo(() => ({...WORKSHOP_DEFAULT_FEATURES, ...featuresProp}), [featuresProp])
  const {postMessage, ready, ref: frameRef, subscribe} = useFrame()
  const rawValue = location.query?.value
  const [encodedValue, setEncodedValue] = useState(typeof rawValue === 'string' ? rawValue : null)
  const encodedValueRef = useRef(encodedValue)
  const [state, dispatch] = useReducer(workshopReducer, {
    axeResults: null,
    schemas: [],
    value: encodedValue ? decodeValue(encodedValue) : {},
  })
  const [viewport, setViewport] = useState<string>('auto')
  const [zoom, setZoom] = useState(1)
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)
  const scopes = useMemo(() => scopesProp.sort(_sortScopes), [scopesProp])
  const locationRef = useRef(location)

  useEffect(() => {
    locationRef.current = location
  }, [location])

  useEffect(() => {
    const loc = locationRef.current

    if (encodedValue && loc.query?.value !== encodedValue) {
      const newLoc = {...loc, query: {...loc.query, value: encodedValue}}

      onLocationReplace(newLoc)
    } else if (loc.query?.value && !encodedValue) {
      const query = {...loc.query}

      delete query.value

      const newLoc = {...loc, query}

      onLocationReplace(newLoc)
    }
  }, [encodedValue, onLocationReplace])

  const registerProp = useCallback((schema: PropSchema) => {
    const msg: WorkshopMsg = {type: 'workshop/registerProp', schema}

    dispatch(msg)
  }, [])

  const unregisterProp = useCallback((name: string) => {
    const msg: WorkshopMsg = {type: 'workshop/unregisterProp', name}

    dispatch(msg)
  }, [])

  const setPropValue = useCallback(
    (name: string, value: any) => {
      const msg: WorkshopMsg = {type: 'workshop/setPropValue', name, value}

      dispatch(msg)
      postMessage(msg)
    },
    [postMessage]
  )

  useEffect(() => {
    const msg: WorkshopMsg = {
      type: 'workshop/main/setLocation',
      path: location.path,
      scheme,
    }

    postMessage(msg)
  }, [location.path, postMessage, scheme])

  useEffect(() => {
    function handleMsg(msg: any) {
      if (!isRecord(msg)) return
      if (typeof msg.type !== 'string') return
      if (!msg.type.startsWith('workshop/')) return
      dispatch(msg as any)
    }

    return subscribe(handleMsg)
  }, [subscribe])

  useEffect(() => {
    if (Object.keys(state.value).length) {
      const enc = encodeValue(state.value)

      setEncodedValue(enc)
      encodedValueRef.current = enc
    } else {
      setEncodedValue(null)
      encodedValueRef.current = null
    }
  }, [state.value])

  useEffect(() => {
    setEncodedValue(typeof rawValue === 'string' ? rawValue : null)
  }, [rawValue])

  useEffect(() => {
    if (encodedValue !== encodedValueRef.current) {
      const msg: WorkshopMsg = {
        type: 'workshop/setValue',
        value: encodedValue ? decodeValue(encodedValue) : {},
      }

      dispatch(msg)
      postMessage(msg)
    }
  }, [encodedValue, postMessage])

  const children = useMemo(
    () => (
      <>
        <Flex direction="column" height="fill" ref={setBoundaryElement}>
          {features.navbar && (
            <WorkshopNavbar
              scheme={scheme}
              setScheme={setScheme}
              setViewport={setViewport}
              setZoom={setZoom}
              viewport={viewport}
              zoom={zoom}
            />
          )}
          <Flex flex={1}>
            <WorkshopStoryNav collections={collections} />
            <WorkshopStoryCanvas
              frameRef={frameRef}
              ready={ready}
              scheme={scheme}
              viewport={viewport}
              zoom={zoom}
              // value={state.value}
            />
            <WorkshopStoryInspector />
          </Flex>
        </Flex>
        <div data-portal="" ref={setPortalElement} />
      </>
    ),
    [
      collections,
      features,
      frameRef,
      ready,
      scheme,
      setScheme,
      // state.axeResults,
      // state.value,
      viewport,
      zoom,
    ]
  )

  return (
    <ToastProvider>
      <BoundaryElementProvider element={boundaryElement}>
        <PortalProvider element={portalElement}>
          <WorkshopProvider
            axeResults={state.axeResults}
            features={features}
            frameUrl={frameUrl}
            location={location}
            onLocationPush={onLocationPush}
            onLocationReplace={onLocationReplace}
            schemas={state.schemas}
            scopes={scopes}
            registerProp={registerProp}
            setPropValue={setPropValue}
            title={title}
            unregisterProp={unregisterProp}
            value={state.value}
          >
            {children}
          </WorkshopProvider>
        </PortalProvider>
      </BoundaryElementProvider>
    </ToastProvider>
  )
}
