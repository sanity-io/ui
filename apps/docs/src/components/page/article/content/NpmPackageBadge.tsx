import {stegaClean} from 'next-sanity'

import type {PortableTextValue} from '@/types'

export function NpmPackageBadge(props: {
  data: Extract<PortableTextValue[number], {_type: 'npmPackageBadge'}>
}) {
  const {name} = stegaClean(props.data)
  const href = `https://www.npmjs.com/package/${name}`
  const src = `https://img.shields.io/npm/v/${name}.svg?style=flat-square`

  return (
    <a href={href} rel="noreferrer" target="_blank">
      {/* oxlint-disable-next-line nextjs/no-img-element */}
      <img alt="" src={src} />
    </a>
  )
}
