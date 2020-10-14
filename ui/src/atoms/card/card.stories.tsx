import {Card, Text} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Card',
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

  const shadow = select(
    'Shadow',
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

  const tone = select(
    'Tone',
    {
      Default: 'default',
      Transparent: 'transparent',
    },
    'default',
    'Props'
  )

  return (
    <Card onClick={action('onClick')} padding={padding} radius={radius} shadow={shadow} tone={tone}>
      <Text>
        Card with <code>padding={padding}</code>, <code>tone={tone}</code>, and{' '}
        <code>shadow={shadow}</code>
      </Text>
    </Card>
  )
}
