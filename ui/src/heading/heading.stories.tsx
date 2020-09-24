import {withCentered} from '~/storybook/decorators'
import {Heading} from '@sanity/ui'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Heading',
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
    <div style={{background: '#fff'}}>
      <Heading size={size}>Hello, world</Heading>
      <Heading size={size}>Hello, world</Heading>
      <Heading size={size}>Hello, world</Heading>
    </div>
  )
}
