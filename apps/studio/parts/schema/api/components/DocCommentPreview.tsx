import {FormField} from '@sanity/base/components'
import {Card, Code} from '@sanity/ui'
import React from 'react'

interface DocCommentPreview {
  type: {
    title: string
    description?: string
  }
  value?: string
}

export function DocCommentPreview(props: DocCommentPreview) {
  return (
    <FormField title={props.type.title} description={props.type.description}>
      <Card border padding={3} overflow="auto" radius={1}>
        <Code>{props.value}</Code>
      </Card>
    </FormField>
  )
}
