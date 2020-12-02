import {Preview} from '@sanity/components'
import {Card} from '@sanity/ui'
import React from 'react'

export function ListItem() {
  return (
    <Card as="button" paddingX={3} paddingY={2} radius={2} tabIndex={0}>
      <Preview />
    </Card>
  )
}
