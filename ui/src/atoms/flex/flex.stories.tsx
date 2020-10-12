import {withCentered} from '~/storybook/decorators'
import {Card, Flex, Text} from '@sanity/ui'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import styled from 'styled-components'

export default {
  title: 'Atoms/Flex',
  decorators: [withCentered, withKnobs],
}

const DebugCard = styled(Card)`
  outline: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const plain = () => (
  <div style={{width: '100%', height: '100%'}}>
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
      style={{height: '100%'}}
    >
      <DebugCard flex={1}>
        <Text>1</Text>
      </DebugCard>

      <DebugCard flex={3}>
        <Text>3</Text>
      </DebugCard>

      <DebugCard flex={1}>
        <Text>1</Text>
      </DebugCard>
    </Flex>
  </div>
)
