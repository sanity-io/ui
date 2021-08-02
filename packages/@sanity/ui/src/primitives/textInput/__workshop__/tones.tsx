import {Card, Stack, TextInput} from '@sanity/ui'
import React from 'react'

export default function TonesStory() {
  return (
    <Stack space={4}>
      <Card padding={3}>
        <TextInput placeholder="default" />
      </Card>
      <Card padding={3} tone="transparent">
        <TextInput placeholder="transparent" />
      </Card>
      <Card padding={3} tone="primary">
        <TextInput placeholder="primary" />
      </Card>
      <Card padding={3} tone="positive">
        <TextInput placeholder="positive" />
      </Card>
      <Card padding={3} tone="caution">
        <TextInput placeholder="caution" />
      </Card>
      <Card padding={3} tone="critical">
        <TextInput placeholder="critical" />
      </Card>
    </Stack>
  )
}
