'use client'

import dynamic from 'next/dynamic'

import {useApp} from '@/app/useApp'

import studioConfig from '../../../../sanity.config'

const Studio = dynamic(() => import('./studio'), {ssr: false})

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
