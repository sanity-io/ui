import {Card, studioTheme, ThemeColorSchemeKey, ThemeProvider, ToastProvider} from '@sanity/ui'
import axe from 'axe-core'
import React, {createElement, useCallback, useEffect, useMemo, useReducer, useState} from 'react'
import {isRecord} from '../isRecord'
import {knobsReducer} from '../knobs/reducer'
import {resolveLocation} from '../resolveLocation'
import {ScopeProvider} from '../scopeProvider'
import {KnobSchema, WorkshopContextValue, WorkshopLocation, WorkshopScope} from '../types'
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

export function WorkshopFrame(props: {frameUrl: string; scopes: WorkshopScope[]; title: string}) {
  const {frameUrl, scopes, title} = props
  const query = useMemo(() => qs.parse(window.location.search.substr(1)), [])
  const [path, setPath] = useState(query.path || '/')
  const [scheme, setScheme] = useState<ThemeColorSchemeKey>(
    (query.scheme as ThemeColorSchemeKey) || 'light'
  )
  const [knobs, dispatch] = useReducer(knobsReducer, [])
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

        if (msg.type === 'workshop/setKnobValue') {
          dispatch({
            type: 'setKnobValue',
            knobName: msg.knobName as string,
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

  const registerKnob = useCallback(
    (knobSchema: KnobSchema) => {
      postMessage({type: 'workshop/frame/registerKnob', knobSchema})
      dispatch({type: 'registerKnob', knobSchema})
    },
    [postMessage]
  )

  const unregisterKnob = useCallback(
    (knobName: string) => {
      postMessage({type: 'workshop/frame/unregisterKnob', knobName})
      dispatch({type: 'unregisterKnob', knobName})
    },
    [postMessage]
  )

  const setKnobValue = useCallback(
    (knobName: string, value: any) => {
      postMessage({type: 'workshop/frame/setKnobValue', knobName, value})
      dispatch({type: 'setKnobValue', knobName, value})
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
            knobs={knobs}
            registerKnob={registerKnob}
            scope={scope}
            setKnobValue={setKnobValue}
            story={story}
            title={title}
            unregisterKnob={unregisterKnob}
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
