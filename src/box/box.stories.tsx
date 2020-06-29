import {withCentered} from '~/storybook/decorators'
import {Box, Text} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Box',
  decorators: [withCentered, withKnobs],
}

export const plain = () => (
  <Box
    onClick={action('onClick')}
    padding={select(
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
    )}
    style={{background: '#fff'}}
  >
    <Text>Box</Text>
  </Box>
)
