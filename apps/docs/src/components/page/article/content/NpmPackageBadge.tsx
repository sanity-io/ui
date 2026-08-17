import {ReactElement} from 'react'

export function NpmPackageBadge(props: {name: string}): ReactElement {
  const {name} = props
  const href = `https://www.npmjs.com/package/${name}`
  const src = `https://img.shields.io/npm/v/${name}.svg?style=flat-square`

  return (
    <a href={href} rel="noreferrer" target="_blank">
      {/* oxlint-disable-next-line nextjs/no-img-element */}
      <img alt="" src={src} />
    </a>
  )
}
