import {Card, Stack, Text} from '@sanity/ui'
import {defineScope, useAction, useSelect} from '@sanity/ui-workshop'
import React from 'react'

const SPACE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
}

export default defineScope('primitives/stack', 'Stack', [
  {name: 'plain', title: 'Plain', component: PlainStory},
])

function PlainStory() {
  return (
    <Stack onClick={useAction('onClick')} space={useSelect('Space', SPACE_OPTIONS, 0, 'Props')}>
      <Card padding={4}>
        <Text>Stack item</Text>
      </Card>

      <Card padding={4}>
        <Text>Stack item</Text>
      </Card>

      <Card padding={4}>
        <Text>Stack item</Text>
      </Card>
    </Stack>
  )
}
