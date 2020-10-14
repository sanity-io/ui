import {Card, Container, Text} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Container',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const width = select(
    'Width',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
    },
    0,
    'Props'
  )

  return (
    <div style={{width: '100%'}}>
      <Container onClick={action('onClick')} width={width}>
        <Card padding={4}>
          <Text>
            Container with <code>max-width={width}</code>
          </Text>
        </Card>
      </Container>
    </div>
  )
}
