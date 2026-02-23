import {usePrefersDark} from '@sanity/ui'
import type {ColorScheme} from '@sanity/ui/theme'
import {useMemo, useState} from 'react'

import type {WorkshopConfig} from './config/types'
import {createLocationStore} from './location/LocationStore'
import {Workshop} from './Workshop'

export function WorkshopApp(props: {config: WorkshopConfig}) {
  const {config} = props

  const prefersDark = usePrefersDark()

  const locationStore = useMemo(() => createLocationStore(), [])

  const [initialScheme] = useState((): ColorScheme => (prefersDark ? 'dark' : 'light'))

  return <Workshop config={config} initialScheme={initialScheme} locationStore={locationStore} />
}
