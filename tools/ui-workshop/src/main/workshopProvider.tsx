import React, {useMemo} from 'react'
import {resolveLocation} from '../resolveLocation'
import {ScopeProvider} from '../scopeProvider'
import {KnobSchema, StoryKnob, WorkshopLocation, WorkshopScope} from '../types'
import {WorkshopContext} from '../workshopContext'

export interface WorkshopProviderProps {
  children?: React.ReactNode
  frameUrl: string
  location: WorkshopLocation
  knobs: StoryKnob[]
  onLocationPush: (loc: WorkshopLocation) => void
  onLocationReplace: (loc: WorkshopLocation) => void
  registerKnob: (knobSchema: KnobSchema) => void
  scopes: WorkshopScope[]
  setKnobValue: (knobName: string, value: any) => void
  title: string
  unregisterKnob: (knobName: string) => void
}

export function WorkshopProvider(props: WorkshopProviderProps) {
  const {
    children,
    frameUrl,
    knobs,
    location,
    onLocationPush,
    onLocationReplace,
    registerKnob,
    scopes,
    setKnobValue,
    title,
    unregisterKnob,
  } = props

  const workshop = useMemo(() => {
    const {scope, story} = resolveLocation(scopes, location.path)

    return {
      frameUrl,
      location,
      pushLocation: onLocationPush,
      replaceLocation: onLocationReplace,
      scope,
      scopes,
      story,
      title,
    }
  }, [frameUrl, location, onLocationPush, onLocationReplace, scopes, title])

  return (
    <WorkshopContext.Provider value={workshop}>
      <ScopeProvider
        knobs={knobs}
        registerKnob={registerKnob}
        scope={workshop.scope}
        setKnobValue={setKnobValue}
        story={workshop.story}
        title={title}
        unregisterKnob={unregisterKnob}
      >
        {children}
      </ScopeProvider>
    </WorkshopContext.Provider>
  )
}
