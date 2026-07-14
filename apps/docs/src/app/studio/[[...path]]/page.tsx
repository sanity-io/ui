'use client'

import dynamic from 'next/dynamic'
import {use} from 'react'

import {ColorSchemeContext} from '#context/color-scheme'

import studioConfig from '../../../../sanity.config'

const Studio = dynamic(() => import('./studio'), {ssr: false})

const basePath = (process.env.__NEXT_ROUTER_BASEPATH as string) || ''
export default function StudioRoute() {
  const scheme = use(ColorSchemeContext)
  return <Studio basePath={`${basePath}/studio`} config={studioConfig} scheme={scheme} />
}
