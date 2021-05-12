import {Card, studioTheme, ThemeColorSchemeKey, ThemeProvider, ToastProvider} from '@sanity/ui'
import axe from 'axe-core'
import React, {createElement, useCallback, useEffect, useMemo, useReducer, useState} from 'react'
import {isRecord} from '../isRecord'
import {propsReducer} from '../props/reducer'
import {resolveLocation} from '../resolveLocation'
import {ScopeProvider} from '../scopeProvider'
import {PropSchema, WorkshopContextValue, WorkshopLocation, WorkshopScope} from '../types'
import {useWorkshop} from '../useWorkshop'
import {WorkshopContext} from '../workshopContext'

const qs = {
  parse(str: string): Record<string, string> {
    const params = new URLSearchParams('?' + str)
    const q: Record<string, string> = {}

    params.forEach((value, key) => {
      q[key] = value
    })

    return q
  },

  stringify(q: {[key: string]: any}) {
    return Object.entries(q)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  },
}

export function WorkshopFrame(_props: {frameUrl: string; scopes: WorkshopScope[]; title: string}) {
  const {frameUrl, scopes, title} = _props
  const query = useMemo(() => qs.parse(window.location.search.substr(1)), [])
  const [path, setPath] = useState(query.path || '/')
  const [scheme, setScheme] = useState<ThemeColorSchemeKey>(
    (query.scheme as ThemeColorSchemeKey) || 'light'
  )
  const [props, dispatch] = useReducer(propsReducer, [])
  const [zoom, setZoom] = useState(query.zoom ? Number(query.zoom) : 1)

  const postMessage = useCallback((msg: Record<string, unknown>) => {
    parent.postMessage(msg, window.location.origin)
  }, [])

  useEffect(() => {
    postMessage({type: 'workshop/frame/ready', path})

    const handleMessage = (event: MessageEvent) => {
      const msg = event.data

      if (isRecord(msg)) {
        if (msg.type === 'workshop/setLocation') {
          setPath(msg.path as string)
          setScheme(msg.scheme as ThemeColorSchemeKey)
          setZoom(msg.zoom as number)

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

        console.warn('unhandled msg', msg)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [path, postMessage])

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

  const {scope, story} = useMemo(() => resolveLocation(scopes, path), [path, scopes])

  const loc = useMemo(() => ({path}), [path])

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
    if (!story) return

    axe
      .run()
      .then((results) => {
        postMessage({type: 'workshop/frame/axe/results', results})
      })
      .catch((err) => {
        console.error('Something bad happened:', err.message)
      })
  }, [postMessage, story])

  useEffect(() => {
    document.body.style.zoom = String(zoom)
  }, [zoom])

  return (
    <ThemeProvider scheme={scheme} theme={studioTheme}>
      <ToastProvider>
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
            <RenderCanvas />
          </ScopeProvider>
        </WorkshopContext.Provider>
      </ToastProvider>
    </ThemeProvider>
  )
}

function RenderCanvas() {
  const studio = useWorkshop()

  if (studio.story) {
    return (
      <Card as="main" height="fill">
        {createElement(studio.story.component)}
      </Card>
    )
  }

  return null
}
