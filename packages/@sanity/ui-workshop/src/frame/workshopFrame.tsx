import {UndoIcon} from '@sanity/icons'
import {
  BoundaryElementProvider,
  Button,
  Card,
  Code,
  Container,
  ErrorBoundary,
  PortalProvider,
  Stack,
  Text,
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
import {useAxeResults} from '../axe'
import {features} from '../features'
import {isRecord} from '../lib/isRecord'
import {qs} from '../lib/qs'
import {resolveLocation} from '../resolveLocation'
import {ScopeProvider} from '../scopeProvider'
import {workshopReducer} from '../store'
import {WorkshopMsg} from '../store/types'
import {PropSchema, WorkshopContextValue, WorkshopLocation, WorkshopScope} from '../types'
import {WorkshopContext} from '../workshopContext'
import {useParent} from './useParent'

interface WorkshopFrameProps {
  frameUrl: string
  scopes: WorkshopScope[]
  setScheme: (scheme: 'dark' | 'light') => void
  title: string
}

export function WorkshopFrame(props: WorkshopFrameProps): React.ReactElement {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <ToastProvider>
      <BoundaryElementProvider element={boundaryElement}>
        <PortalProvider element={portalElement}>
          <InnerWorkshopFrame {...props} ref={setBoundaryElement} />
          <div data-portal="" ref={setPortalElement} />
        </PortalProvider>
      </BoundaryElementProvider>
    </ToastProvider>
  )
}

const InnerWorkshopFrame = forwardRef(function InnerWorkshopFrame(
  props: WorkshopFrameProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {frameUrl, scopes, setScheme, title} = props
  const query = useMemo(() => {
    if (typeof window === 'undefined') return {}

    return qs.parse(window.location.search.substr(1))
  }, [])
  const value = useMemo(
    () => (query.value ? JSON.parse(decodeURIComponent(query.value)) : {}),
    [query]
  )
  const [path, setPath] = useState(query.path || '/')
  const [state, dispatch] = useReducer(workshopReducer, {axeResults: null, schemas: [], value})
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
      const msg: WorkshopMsg = {type: 'workshop/frame/pushLocation', location: newLoc}

      postMessage(msg)
    },
    [postMessage]
  )

  const replaceLocation = useCallback(
    (newLoc: WorkshopLocation) => {
      const msg: WorkshopMsg = {type: 'workshop/frame/replaceLocation', location: newLoc}

      postMessage(msg)
    },
    [postMessage]
  )

  const registerProp = useCallback(
    (schema: PropSchema) => {
      const msg: WorkshopMsg = {type: 'workshop/registerProp', schema}

      postMessage(msg)
      dispatch(msg)
    },
    [postMessage]
  )

  const unregisterProp = useCallback(
    (name: string) => {
      const msg: WorkshopMsg = {type: 'workshop/unregisterProp', name}

      postMessage(msg)
      dispatch(msg)
    },
    [postMessage]
  )

  const setPropValue = useCallback(
    (name: string, value: any) => {
      const msg: WorkshopMsg = {type: 'workshop/setPropValue', name, value}

      postMessage(msg)
      dispatch(msg)
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

    const msg: WorkshopMsg = {type: 'workshop/frame/setAxeResults', results: axeResults}

    postMessage(msg)
  }, [axeResults, postMessage])

  // Set initial scheme
  useEffect(() => setScheme(query.scheme as ThemeColorSchemeKey), [query.scheme, setScheme])

  useEffect(() => {
    const readyMsg: WorkshopMsg = {type: 'workshop/ready', path}

    postMessage(readyMsg)

    const handleMainMsg = (msg: WorkshopMsg) => {
      if (msg.type === 'workshop/main/setLocation') {
        setPath(msg.path)
        setScheme(msg.scheme)

        return
      }

      dispatch(msg)
    }

    const handleMessage = (event: MessageEvent) => {
      const msg = event.data

      if (isRecord(msg) && typeof msg.type === 'string' && msg.type.startsWith('workshop/')) {
        handleMainMsg(msg as any)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [path, postMessage, setScheme])

  // Set mounted
  useEffect(() => setMounted(true), [])

  const [errorParams, setErrorParams] = useState<{
    error: Error
    info: React.ErrorInfo
  } | null>(null)

  const {error, info: errorInfo} = errorParams || {}

  const handleReset = useCallback(() => setErrorParams(null), [])

  if (error) {
    return (
      <Container paddingX={4} paddingY={[5, 5, 6]} sizing="border">
        <Stack height="fill" space={5}>
          <Text as="h1" weight="bold">
            Workshop error
          </Text>

          <Stack>
            <Button icon={UndoIcon} onClick={handleReset} text="Retry" />
          </Stack>

          <Stack space={3}>
            <Text as="h2" size={1} weight="semibold">
              Error stack
            </Text>
            <Card border overflow="auto" padding={3} radius={2} tone="critical">
              <Code>{error.stack}</Code>
            </Card>
          </Stack>

          {errorInfo?.componentStack && (
            <Stack space={3}>
              <Text as="h2" size={1} weight="semibold">
                Component stack
              </Text>
              <Card border overflow="auto" padding={3} radius={2} tone="critical">
                <Code>{'    ' + errorInfo.componentStack.trim()}</Code>
              </Card>
            </Stack>
          )}
        </Stack>
      </Container>
    )
  }

  if (!mounted) {
    return <></>
  }

  return (
    <ErrorBoundary onCatch={setErrorParams}>
      <WorkshopContext.Provider value={contextValue}>
        <ScopeProvider
          axeResults={state.axeResults}
          schemas={state.schemas}
          registerProp={registerProp}
          scope={scope}
          setPropValue={setPropValue}
          story={story}
          title={title}
          unregisterProp={unregisterProp}
          value={state.value}
        >
          <Suspense fallback={null}>
            <Card as="main" height="fill" ref={ref}>
              {story && createElement(story.component)}
            </Card>
          </Suspense>
        </ScopeProvider>
      </WorkshopContext.Provider>
    </ErrorBoundary>
  )
})
