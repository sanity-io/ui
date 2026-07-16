'use client'

import dynamic from 'next/dynamic'
import {use} from 'react'

import {ColorSchemeContext} from '#context/color-scheme'
import {basePath} from '@/constants'

import studioConfig from '../../../../sanity.config'

const Studio = dynamic(() => import('./studio'), {ssr: false})

export default function StudioRoute() {
  const scheme = use(ColorSchemeContext)
  return <Studio basePath={`${basePath}/studio`} config={studioConfig} scheme={scheme} />
}
