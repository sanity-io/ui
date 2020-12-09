import {Card, Stack, Text} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Stack',
  decorators: [withCentered, withKnobs],
}

export const plain = () => (
  <Stack
    onClick={action('onClick')}
    space={select(
      'Space',
      {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
      },
      0,
      'Props'
    )}
  >
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
