import {Box, Card, Text} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Box',
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

  return (
    <Card border>
      <Box onClick={action('onClick')} padding={padding}>
        <Text>
          Box with <code>padding={padding}</code>
        </Text>
      </Box>
    </Card>
  )
}
