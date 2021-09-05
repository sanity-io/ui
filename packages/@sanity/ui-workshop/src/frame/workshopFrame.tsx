import {
  BoundaryElementProvider,
  Card,
  PortalProvider,
  ThemeColorSchemeKey,
  ToastProvider,
} from '@sanity/ui'
import React, {
  createElement,
  forwardRef,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import {useAxeResults} from '../axe/useAxeResults'
import {features} from '../features'
import {isRecord} from '../lib/isRecord'
import {qs} from '../lib/qs'
import {propsReducer} from '../props/reducer'
import {resolveLocation} from '../resolveLocation'
import {ScopeProvider} from '../scopeProvider'
import {PropSchema, WorkshopContextValue, WorkshopLocation, WorkshopScope} from '../types'
import {WorkshopContext} from '../workshopContext'
import {useParent} from './useParent'

interface WorkshopFrameProps {
  frameUrl: string
  scopes: WorkshopScope[]
  setScheme: (scheme: 'dark' | 'light') => void
  title: string
}

export function WorkshopFrame(_props: WorkshopFrameProps): React.ReactElement {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <ToastProvider>
      <BoundaryElementProvider element={boundaryElement}>
        <PortalProvider element={portalElement}>
          <InnerWorkshopFrame {..._props} ref={setBoundaryElement} />
          <div data-portal="" ref={setPortalElement} />
        </PortalProvider>
      </BoundaryElementProvider>
    </ToastProvider>
  )
}

const InnerWorkshopFrame = forwardRef(function InnerWorkshopFrame(
  _props: WorkshopFrameProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {frameUrl, scopes, setScheme, title} = _props
  const query = useMemo(() => {
    if (typeof window === 'undefined') return {}

    return qs.parse(window.location.search.substr(1))
  }, [])
  const [path, setPath] = useState(query.path || '/')
  const [props, dispatch] = useReducer(propsReducer, [])
  const {postMessage} = useParent()
  const {scope, story} = useMemo(() => resolveLocation(scopes, path), [path, scopes])
  const loc = useMemo(() => ({path}), [path])
  const axeResults = useAxeResults({
    enabled: features.axe && Boolean(story),
    key: story?.name || null,
  })
  const [mounted, setMounted] = useState(false)

  const pushLocation = useCallback(
    (newLoc: WorkshopLocation) => {
      postMessage({type: 'workshop/frame/pushLocation', location: newLoc})
    },
    [postMessage]
  )

  const replaceLocation = useCallback(
    (newLoc: WorkshopLocation) => {
      postMessage({type: 'workshop/frame/replaceLocation', location: newLoc})
    },
    [postMessage]
  )

  const registerProp = useCallback(
    (PropSchema: PropSchema) => {
      postMessage({type: 'workshop/frame/registerProp', PropSchema})
      dispatch({type: 'registerProp', PropSchema})
    },
    [postMessage]
  )

  const unregisterProp = useCallback(
    (PropName: string) => {
      postMessage({type: 'workshop/frame/unregisterProp', PropName})
      dispatch({type: 'unregisterProp', PropName})
    },
    [postMessage]
  )

  const setPropValue = useCallback(
    (PropName: string, value: any) => {
      postMessage({type: 'workshop/frame/setPropValue', PropName, value})
      dispatch({type: 'setPropValue', PropName, value})
    },
    [postMessage]
  )

  const contextValue: WorkshopContextValue = useMemo(() => {
    return {
      frameUrl,
      location: loc,
      pushLocation,
      replaceLocation,
      scope,
      scopes,
      story,
      title,
    }
  }, [frameUrl, loc, pushLocation, replaceLocation, scope, scopes, story, title])

  useEffect(() => {
    if (!features.axe) return
    postMessage({type: 'workshop/frame/axe/results', results: axeResults})
  }, [axeResults, postMessage])

  // Set mounted
  useEffect(() => setMounted(true), [])

  // Set initial scheme
  useEffect(() => setScheme(query.scheme as ThemeColorSchemeKey), [query.scheme, setScheme])

  useEffect(() => {
    postMessage({type: 'workshop/frame/ready', path})

    const handleMessage = (event: MessageEvent) => {
      const msg = event.data

      if (isRecord(msg)) {
        if (msg.type === 'workshop/setLocation') {
          setPath(msg.path as string)
          setScheme(msg.scheme as ThemeColorSchemeKey)

          return
        }

        if (msg.type === 'workshop/setPropValue') {
          dispatch({
            type: 'setPropValue',
            PropName: msg.PropName as string,
            value: msg.value,
          })

          return
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [path, postMessage, setScheme])

  if (!mounted) {
    return <></>
  }

  return (
    <WorkshopContext.Provider value={contextValue}>
      <ScopeProvider
        props={props}
        registerProp={registerProp}
        scope={scope}
        setPropValue={setPropValue}
        story={story}
        title={title}
        unregisterProp={unregisterProp}
      >
        <Suspense fallback={null}>
          <Card as="main" height="fill" ref={ref}>
            {story && createElement(story.component)}
          </Card>
        </Suspense>
      </ScopeProvider>
    </WorkshopContext.Provider>
  )
})
