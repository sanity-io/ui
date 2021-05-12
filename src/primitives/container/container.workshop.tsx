import {Card, Container, Flex, Text} from '@sanity/ui'
import {defineScope, useAction, useSelect} from '@sanity/ui-workshop'
import React from 'react'

const CONTAINER_WIDTH_OPTIONS: {[key: string]: number | 'auto'} = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  auto: 'auto',
}

export default defineScope('primitives/container', 'Container', [
  {name: 'plain', title: 'Plain', component: PlainStory},
])

function PlainStory() {
  const width = useSelect('Width', CONTAINER_WIDTH_OPTIONS, 0, 'Props')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container onClick={useAction('onClick')} width={width}>
        <Card padding={4} shadow={1}>
          <Text>
            Container with <code>max-width={width}</code>
          </Text>
        </Card>
      </Container>
    </Flex>
  )
}
