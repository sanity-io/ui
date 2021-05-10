import {Workshop, WorkshopLocation} from '@sanity/ui-workshop'
import React, {useCallback, useMemo} from 'react'
import ReactDOM from 'react-dom'
import Refractor from 'react-refractor'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import {LocationProvider, useLocation} from './location'
import {scopes} from '$workshop'

Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

const WORKSHOP_COLLECTIONS = [
  {
    name: 'components',
    title: 'Components',
  },
  {
    name: 'hooks',
    title: 'Hooks',
  },
  {
    name: 'primitives',
    title: 'Primitives',
  },
  {
    name: 'utils',
    title: 'Utils',
  },
]

function Root() {
  const {path, pushState, replaceState} = useLocation()

  const handleLocationPush = useCallback(
    (newLoc: WorkshopLocation) => pushState({path: newLoc.path}),
    [pushState]
  )

  const handleLocationReplace = useCallback(
    (newLoc: WorkshopLocation) => replaceState({path: newLoc.path}),
    [replaceState]
  )

  const studioLocation: WorkshopLocation = useMemo(() => ({path}), [path])

  return (
    <Workshop
      collections={WORKSHOP_COLLECTIONS}
      frameUrl="/frame/"
      location={studioLocation}
      onLocationPush={handleLocationPush}
      onLocationReplace={handleLocationReplace}
      scopes={scopes}
      title="Sanity UI Workshop"
    />
  )
}

ReactDOM.render(
  <LocationProvider>
    <Root />
  </LocationProvider>,
  document.getElementById('root')
)
