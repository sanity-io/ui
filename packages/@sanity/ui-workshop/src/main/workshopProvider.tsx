import React, {useMemo} from 'react'
import {resolveLocation} from '../resolveLocation'
import {ScopeProvider} from '../scopeProvider'
import {PropSchema, StoryProp, WorkshopLocation, WorkshopScope} from '../types'
import {WorkshopContext} from '../workshopContext'

export interface WorkshopProviderProps {
  children?: React.ReactNode
  frameUrl: string
  location: WorkshopLocation
  onLocationPush: (loc: WorkshopLocation) => void
  onLocationReplace: (loc: WorkshopLocation) => void
  props: StoryProp[]
  registerProp: (PropSchema: PropSchema) => void
  scopes: WorkshopScope[]
  setPropValue: (PropName: string, value: any) => void
  title: string
  unregisterProp: (PropName: string) => void
}

export function WorkshopProvider(_props: WorkshopProviderProps) {
  const {
    children,
    frameUrl,
    props,
    location,
    onLocationPush,
    onLocationReplace,
    registerProp,
    scopes,
    setPropValue,
    title,
    unregisterProp,
  } = _props

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
        props={props}
        registerProp={registerProp}
        scope={workshop.scope}
        setPropValue={setPropValue}
        story={workshop.story}
        title={title}
        unregisterProp={unregisterProp}
      >
        {children}
      </ScopeProvider>
    </WorkshopContext.Provider>
  )
}
