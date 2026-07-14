'use client'

import dynamic from 'next/dynamic'

import {useApp} from '@/app/useApp'

import studioConfig from '../../../../sanity.config'

const Studio = dynamic(() => import('./studio'), {ssr: false})

const basePath = (process.env.__NEXT_ROUTER_BASEPATH as string) || ''
export default function StudioRoute() {
  const {colorScheme, setColorScheme} = useApp()

  return (
    <Studio
      basePath={`${basePath}/studio`}
      config={studioConfig}
      onSchemeChange={(nextScheme) => setColorScheme(nextScheme)}
      scheme={colorScheme}
    />
  )
}
