import {Card, Heading, Icon} from '@sanity/ui'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Heading',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const size = select(
    'Size',
    {'0': 0, '1': 1, '2 (default)': undefined, '3': 3, '4': 4},
    undefined,
    'Props'
  )

  return (
    <Card>
      <Heading size={size}>
        <Icon symbol="add" /> Hello, world
      </Heading>
    </Card>
  )
}
