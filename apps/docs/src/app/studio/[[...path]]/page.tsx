'use client'

import {lazy} from 'react'

import {useApp} from '@/app/useApp'

import studioConfig from '../../../../sanity.config'

const Studio = lazy(() => import('./studio'))

export default function StudioRoute() {
  const {colorScheme, setColorScheme} = useApp()

  return (
    <Studio
      basePath="/ui/studio"
      config={studioConfig}
      onSchemeChange={(nextScheme) => setColorScheme(nextScheme)}
      scheme={colorScheme}
    />
  )
}
