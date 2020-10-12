import {withCentered} from '~/storybook/decorators'
import {Icon, Text} from '@sanity/ui'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Atoms/Text',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const size = select('Size', {'0': 0, '1': 1, '2 (default)': 2, '3': 3, '4': 4}, 2, 'Props')

  const weight = select(
    'Weight',
    {'Regular (default)': undefined, Semibold: 'semibold', Bold: 'bold'},
    undefined,
    'Props'
  )

  return (
    <div style={{background: '#fff'}}>
      <Text size={size} weight={weight}>
        <Icon symbol="add" /> Hello, world
      </Text>
    </div>
  )
}
