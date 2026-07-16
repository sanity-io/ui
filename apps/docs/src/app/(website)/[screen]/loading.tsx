'use client'

import {Card, Text} from '@sanity/ui'

export default function SlugLoading() {
  return (
    <Card flex={1} padding={[4, 4, 5]}>
      <Text muted size={1}>
        Loading…
      </Text>
    </Card>
  )
}
