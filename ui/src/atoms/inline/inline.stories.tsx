import {withCentered} from '~/storybook/decorators'
import {Card, Inline, Text} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Atoms/Inline',
  decorators: [withCentered, withKnobs],
}

export const plain = () => (
  <Inline
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
    <Card padding={1}>
      <Text>Inline item</Text>
    </Card>

    <Card padding={2}>
      <Text>Inline item</Text>
    </Card>

    <Card padding={3}>
      <Text>Inline item</Text>
    </Card>
  </Inline>
)
