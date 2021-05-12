import {Card, Code, Flex} from '@sanity/ui'
import {defineScope, useSelect} from '@sanity/ui-workshop'
import React from 'react'
import styled from 'styled-components'

const FLEX_DIRECTION_OPTIONS: {[key: string]: 'row' | 'column'} = {
  Row: 'row',
  Column: 'column',
}

export default defineScope('primitives/flex', 'Flex', [
  {name: 'plain', title: 'Plain', component: PlainStory},
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
