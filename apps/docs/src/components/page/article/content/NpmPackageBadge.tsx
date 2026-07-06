import {unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import React from 'react'

import {NpmPackageBadgeData} from '@/lib/data'

export function NpmPackageBadge(props: {data: WrappedValue<NpmPackageBadgeData>}) {
  const {name} = unwrapData(props.data)
  const href = `https://www.npmjs.com/package/${name}`
  const src = `https://img.shields.io/npm/v/${name}.svg?style=flat-square`

  return (
    <a href={href} rel="noreferrer" target="_blank">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={src} />
    </a>
  )
}
