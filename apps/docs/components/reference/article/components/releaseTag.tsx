import {Badge} from '@sanity/ui'

export function ReleaseTag(props: {tag: string}) {
  const {tag} = props

  if (tag === 'public') {
    return <Badge tone="positive">Public</Badge>
  }

  if (tag === 'alpha') {
    return <Badge tone="caution">Alpha</Badge>
  }

  if (tag === 'beta') {
    return <Badge tone="caution">Beta</Badge>
  }

  if (tag === 'internal') {
    return <Badge tone="critical">Internal</Badge>
  }

  return null
}
