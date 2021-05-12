import {Card, Code, Flex, Text} from '@sanity/ui'
import {defineScope, useSelect} from '@sanity/ui-workshop'
import React from 'react'
import styled from 'styled-components'

const FLEX_DIRECTION_OPTIONS: {[key: string]: 'row' | 'column'} = {
  Row: 'row',
  Column: 'column',
}

export default defineScope('primitives/flex', 'Flex', [
  {name: 'plain', title: 'Plain', component: PlainStory},
  {name: 'gap', title: 'Gap', component: GapStory},
])

const DebugCard = styled(Card)`
  outline: 1px solid red;
  &:not([hidden]) {
    display: flex;
  }
  align-items: center;
  justify-content: center;
`

function PlainStory() {
  return (
    <Flex
      direction={useSelect('Direction', FLEX_DIRECTION_OPTIONS, 'row', 'Props')}
      height="fill"
      style={{width: '100%'}}
    >
      <DebugCard flex={1}>
        <Code>1</Code>
      </DebugCard>

      <DebugCard flex={[1, 2, 3]}>
        <Code>[1,2,3]</Code>
      </DebugCard>

      <DebugCard flex={1}>
        <Code>1</Code>
      </DebugCard>
    </Flex>
  )
}

function GapStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" gap={[2, 3, 4]} justify="center" wrap="wrap">
        <Card padding={3} scheme="dark">
          <Text size={0}>Card 0</Text>
        </Card>
        <Card padding={3} scheme="dark">
          <Text size={1}>Card 1</Text>
        </Card>
        <Card padding={3} scheme="dark">
          <Text size={2}>Card 2</Text>
        </Card>
        <Card padding={3} scheme="dark">
          <Text size={3}>Card 3</Text>
        </Card>
        <Card padding={3} scheme="dark">
          <Text size={4}>Card 4</Text>
        </Card>
      </Flex>
    </Flex>
  )
}
