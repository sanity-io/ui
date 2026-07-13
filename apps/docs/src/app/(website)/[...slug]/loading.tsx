'use client'

import {Card, Text} from '@sanity/ui'

import {Layout} from '@/components/Layout'

export default function SlugLoading() {
  return (
    <Layout path={[]}>
      <Card flex={1} padding={[4, 4, 5]}>
        <Text muted size={1}>
          Loading…
        </Text>
      </Card>
    </Layout>
  )
}
