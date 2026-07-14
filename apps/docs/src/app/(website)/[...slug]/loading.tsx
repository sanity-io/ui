'use client'

import {Card, Text} from '@sanity/ui'

// Content-area-only fallback: the banner/navbar/footer chrome is rendered by
// the (website) layout and stays visible while the page streams in
export default function SlugLoading() {
  return (
    <Card flex={1} padding={[4, 4, 5]}>
      <Text muted size={1}>
        Loading…
      </Text>
    </Card>
  )
}
