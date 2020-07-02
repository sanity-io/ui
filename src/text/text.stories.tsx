import {withCentered} from '~/storybook/decorators'
import {Text} from '@sanity/ui'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Text',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const size = select(
    'Size',
    {'0': 0, '1': 1, '2 (default)': undefined, '3': 3, '4': 4},
    undefined,
    'Props'
  )

  const weight = select(
    'Weight',
    {'Regular (default)': undefined, 'Semibold': 1, 'Bold': 2},
    undefined,
    'Props'
  )

  return (
    <div style={{background: '#fff'}}>
      <Text size={size} weight={weight}>Hello, world</Text>
      <Text size={size} weight={weight}>Hello, world</Text>
      <Text size={size} weight={weight}>Hello, world</Text>
    </div>
  )
}
