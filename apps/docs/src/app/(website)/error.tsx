'use client'

import {Card} from '@sanity/ui'

export default function WebsiteError(props: {error: Error & {digest?: string}}) {
  return (
    <Card flex={1}>
      <pre>{props.error.message}</pre>
    </Card>
  )
}
