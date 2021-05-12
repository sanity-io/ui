import {Card, Flex, Stack, Text} from '@sanity/ui'
import {defineScope, useSelect} from '@sanity/ui-workshop'
import React from 'react'
import {Container} from '../container'

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
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width={0}>
        <Stack space={useSelect('Space', SPACE_OPTIONS, 0, 'Props')}>
          <Card padding={[2, 3, 4]} shadow={1}>
            <Text align="center" muted>
              Stack item
            </Text>
          </Card>

          <Card padding={[2, 3, 4]} shadow={1}>
            <Text align="center" muted>
              Stack item
            </Text>
          </Card>

          <Card padding={[2, 3, 4]} shadow={1}>
            <Text align="center" muted>
              Stack item
            </Text>
          </Card>
        </Stack>
      </Container>
    </Flex>
  )
}
