import {AxeResults} from 'axe-core'
import React, {useMemo} from 'react'
import {resolveLocation} from '../resolveLocation'
import {ScopeProvider} from '../scopeProvider'
import {PropSchema, WorkshopFeatures, WorkshopLocation, WorkshopScope} from '../types'
import {WorkshopContext} from '../workshopContext'

export interface WorkshopProviderProps {
  axeResults: AxeResults | null
  children: React.ReactNode
  features?: WorkshopFeatures
  frameUrl: string
  location: WorkshopLocation
  onLocationPush: (loc: WorkshopLocation) => void
  onLocationReplace: (loc: WorkshopLocation) => void
  registerProp: (PropSchema: PropSchema) => void
  schemas: PropSchema[]
  scopes: WorkshopScope[]
  setPropValue: (PropName: string, value: any) => void
  title: string
  unregisterProp: (PropName: string) => void
  value: any
}

export function WorkshopProvider(props: WorkshopProviderProps): React.ReactElement {
  const {
    axeResults,
    children,
    features = {},
    frameUrl,
    location,
    onLocationPush,
    onLocationReplace,
    registerProp,
    schemas,
    scopes,
    setPropValue,
    title,
    unregisterProp,
    value,
  } = props

  const workshop = useMemo(() => {
    const {scope, story} = resolveLocation(scopes, location.path)

    return {
      features,
      frameUrl,
      location,
      pushLocation: onLocationPush,
      replaceLocation: onLocationReplace,
      scope,
      scopes,
      story,
      title,
    }
  }, [features, frameUrl, location, onLocationPush, onLocationReplace, scopes, title])

  return (
    <WorkshopContext.Provider value={workshop}>
      <ScopeProvider
        axeResults={axeResults}
        registerProp={registerProp}
        schemas={schemas}
        scope={workshop.scope}
        setPropValue={setPropValue}
        story={workshop.story}
        title={title}
        unregisterProp={unregisterProp}
        value={value}
      >
        {children}
      </ScopeProvider>
    </WorkshopContext.Provider>
  )
}
