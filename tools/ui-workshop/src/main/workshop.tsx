import {Flex, studioTheme, ThemeProvider, usePrefersDark} from '@sanity/ui'
import {AxeResults} from 'axe-core'
import React, {useCallback, useEffect, useReducer, useState} from 'react'
import {knobsReducer} from '../knobs/reducer'
import {KnobSchema, WorkshopLocation, WorkshopScope} from '../types'
import {useFrame} from './useFrame'
import {WorkshopNavbar} from './workshopNavbar'
import {WorkshopProvider} from './workshopProvider'
import {WorkshopStoryCanvas} from './workshopStoryCanvas'
import {WorkshopStoryKnobs} from './workshopStoryKnobs'
import {WorkshopStoryNav} from './workshopStoryNav'

export interface WorkshopProps {
  collections?: {name: string; title: string}[]
  frameUrl: string
  location: WorkshopLocation
  onLocationPush: (loc: WorkshopLocation) => void
  onLocationReplace: (loc: WorkshopLocation) => void
  scopes: WorkshopScope[]
  title: string
}

export function Workshop(props: WorkshopProps) {
  const {collections, frameUrl, location, onLocationPush, onLocationReplace, scopes, title} = props
  const {postMessage, ready, ref: frameRef, subscribe} = useFrame()
  const [knobs, dispatch] = useReducer(knobsReducer, [])
  const [axeResults, setAxeResults] = useState<AxeResults | null>(null)
  const [viewport, setViewport] = useState<number | 'auto'>('auto')
  const [zoom, setZoom] = useState(1)
  const prefersDark = usePrefersDark()
  const [scheme, setScheme] = useState<'light' | 'dark'>(prefersDark ? 'dark' : 'light')

  const registerKnob = useCallback((knobSchema: KnobSchema) => {
    dispatch({type: 'registerKnob', knobSchema})
  }, [])

  const unregisterKnob = useCallback((knobName: string) => {
    dispatch({type: 'unregisterKnob', knobName})
  }, [])

  const setKnobValue = useCallback(
    (knobName: string, value: any) => {
      dispatch({type: 'setKnobValue', knobName, value})
      postMessage({type: 'workshop/setKnobValue', knobName, value})
    },
    [postMessage]
  )

  useEffect(() => {
    postMessage({type: 'workshop/setLocation', path: location.path, scheme, zoom})
  }, [location.path, postMessage, scheme, zoom])

  useEffect(() => {
    return subscribe((msg) => {
      if (typeof msg.type === 'string' && msg.type.startsWith('workshop/')) {
        if (msg.type === 'workshop/frame/axe/results') {
          setAxeResults(msg.results as any)
        }

        if (msg.type === 'workshop/frame/registerKnob') {
          registerKnob(msg.knobSchema as any)
        }

        if (msg.type === 'workshop/frame/setKnobValue') {
          setKnobValue(msg.knobName as string, msg.value)
        }

        if (msg.type === 'workshop/frame/unregisterKnob') {
          unregisterKnob(msg.knobName as any)
        }
      }
    })
  }, [registerKnob, setKnobValue, subscribe, unregisterKnob])

  return (
    <ThemeProvider scheme={scheme} theme={studioTheme}>
      <WorkshopProvider
        frameUrl={frameUrl}
        location={location}
        onLocationPush={onLocationPush}
        onLocationReplace={onLocationReplace}
        scopes={scopes}
        knobs={knobs}
        registerKnob={registerKnob}
        setKnobValue={setKnobValue}
        title={title}
        unregisterKnob={unregisterKnob}
      >
        <Flex direction="column" height="fill">
          <WorkshopNavbar
            scheme={scheme}
            setScheme={setScheme}
            setViewport={setViewport}
            setZoom={setZoom}
            viewport={viewport}
            zoom={zoom}
          />
          <Flex flex={1}>
            <WorkshopStoryNav collections={collections} />
            <WorkshopStoryCanvas
              frameRef={frameRef}
              ready={ready}
              scheme={scheme}
              viewport={viewport}
            />
            <WorkshopStoryKnobs axeResults={axeResults} />
          </Flex>
        </Flex>
      </WorkshopProvider>
    </ThemeProvider>
  )
}
