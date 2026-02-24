import {useMemo} from 'react'

import type {WorkshopConfig} from './config/types'
import {createLocationStore} from './location/LocationStore'
import {Workshop} from './Workshop'

export function WorkshopApp(props: {config: WorkshopConfig}) {
  const {config} = props
  const locationStore = useMemo(() => createLocationStore(), [])

  return <Workshop config={config} locationStore={locationStore} />
}
