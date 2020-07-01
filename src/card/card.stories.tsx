import {withCentered} from '~/storybook/decorators'
import {Card, Text} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Card',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const padding = select(
    'Padding',
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
  )

  const radius = select(
    'Radius',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
    },
    0,
    'Props'
  )

  const tone = select(
    'Tone',
    {
      Default: 'default',
      Transparent: 'transparent',
      Contrast: 'contrast',
    },
    'default',
    'Props'
  )

  return (
    <Card onClick={action('onClick')} padding={padding} radius={radius} tone={tone}>
      <Text>
        Card with <code>padding={padding}</code> and <code>tone={tone}</code>
      </Text>
    </Card>
  )
}
