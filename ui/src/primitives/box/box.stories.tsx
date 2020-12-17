import {Box, Card, Text} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Box',
  decorators: [withCentered, withKnobs],
}

export const props = () => {
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
    <Card border tone="inherit">
      <Box onClick={action('onClick')} padding={padding}>
        <Text>
          Box with <code>padding={padding}</code>
        </Text>
      </Box>
    </Card>
  )
}

export const custom = () => {
  return <Box padding={3}>Custom</Box>
}

export const responsive = () => {
  return (
    <Box id="responsive-box" display={['none', 'block', 'none', 'block', 'none', 'block']}>
      Content!
    </Box>
  )
}
