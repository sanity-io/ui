import {Card, Flex, Inline, Text} from '@sanity/ui'
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

export default defineScope('primitives/inline', 'Inline', [
  {name: 'plain', title: 'Plain', component: PlainStory},
])

function PlainStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Inline onClick={useAction('onClick')} space={useSelect('Space', SPACE_OPTIONS, 0, 'Props')}>
        <Card padding={1} shadow={1}>
          <Text>Inline item</Text>
        </Card>

        <Card padding={2} shadow={1}>
          <Text>Inline item</Text>
        </Card>

        <Card padding={3} shadow={1}>
          <Text>Inline item</Text>
        </Card>
      </Inline>
    </Flex>
  )
}
