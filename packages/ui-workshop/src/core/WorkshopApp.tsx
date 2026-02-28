import {usePrefersDark} from '@sanity/ui'
import type {ColorScheme} from '@sanity/ui/theme'
import {startTransition, useEffect, useMemo, useState} from 'react'

import type {WorkshopConfig} from './config/types'
import {createLocationStore} from './location/LocationStore'
import {Workshop} from './Workshop'

export function WorkshopApp(props: {config: WorkshopConfig}) {
  const {config} = props
  const prefersDark = usePrefersDark()
  const [scheme, setScheme] = useState<ColorScheme>(prefersDark ? 'dark' : 'light')
  const locationStore = useMemo(() => createLocationStore(), [])

  useEffect(() => {
    startTransition(() => setScheme(prefersDark ? 'dark' : 'light'))
  }, [prefersDark])

  return (
    <Workshop
      config={config}
      locationStore={locationStore}
      scheme={scheme}
      onSchemeChange={setScheme}
    />
  )
}
