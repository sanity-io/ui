import qs from 'qs'
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'

interface LocationProviderProps {
  children: React.ReactNode
}

interface LocationState {
  path: string
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: {[key: string]: any}
}

interface PartialLocationState {
  path?: string
  title?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: {[key: string]: any}
}

interface LocationContextType extends LocationState {
  handleLinkClick: (evt: React.MouseEvent<HTMLElement>) => void
  pushState: (newState: PartialLocationState) => void
  replaceState: (newState: PartialLocationState) => void
  segments: string[]
}

export const LocationContext = React.createContext<LocationContextType>({
  path: '/',
  title: '',
  query: {},
  segments: [],
  handleLinkClick: () => undefined,
  pushState: () => undefined,
  replaceState: () => undefined,
})

function getStateFromWindow(): LocationState {
  const query = qs.parse(window.location.search.substr(1))

  return {
    path: window.location.pathname,
    query,
    title: window.document.title,
  }
}

function getNewState(state: LocationState, params: LocationState) {
  return {
    path: params.path || '/',
    title: params.title || state.title,
    query: params.query || {},
  }
}

function getUrlFromState(state: LocationState) {
  const searchString = qs.stringify(state.query)

  if (searchString) {
    return `${state.path}?${searchString}`
  }

  return state.path
}

export function LocationProvider(props: LocationProviderProps) {
  const [state, setState] = useState(getStateFromWindow())
  const stateRef = useRef(state)

  const segments = useMemo(() => state.path.split('/').slice(1).filter(Boolean), [state.path])

  useEffect(() => {
    const handlePopState = () => setState(getStateFromWindow())

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    stateRef.current = state
  }, [state])

  const pushState = useCallback((params) => {
    const newState = getNewState(stateRef.current, params)
    const url = getUrlFromState(newState)

    window.history.pushState(null, newState.title, url)

    setState(newState)
  }, [])

  const replaceState = useCallback((params) => {
    const newState = getNewState(stateRef.current, params)
    const url = getUrlFromState(newState)

    window.history.replaceState(null, newState.title, url)

    setState(newState)
  }, [])

  const handleLinkClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!(event.ctrlKey || event.metaKey || event.shiftKey)) {
        const target = event.currentTarget as HTMLAnchorElement

        if (target) {
          event.preventDefault()
          pushState({path: target.pathname})
        }
      }
    },
    [pushState]
  )

  return (
    <LocationContext.Provider
      value={{...state, handleLinkClick, pushState, replaceState, segments}}
    >
      {props.children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  return useContext(LocationContext)
}
