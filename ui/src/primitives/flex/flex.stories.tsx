import {Card, Code, Flex} from '@sanity/ui'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import styled from 'styled-components'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Flex',
  decorators: [withCentered, withKnobs],
}

const DebugCard = styled(Card)`
  outline: 1px solid red;
  &:not([hidden]) {
    display: flex;
  }
  align-items: center;
  justify-content: center;
`

export const plain = () => (
  <Flex
    direction={select(
      'Direction',
      {
        'Row (default)': 'row',
        Column: 'column',
      },
      'row',
      'Props'
    )}
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
