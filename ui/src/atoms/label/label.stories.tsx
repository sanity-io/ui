import {withCentered} from '~/storybook/decorators'
import {Label} from '@sanity/ui'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Atoms/Label',
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
      <Label size={size}>Hello, world</Label>
      <Label size={size}>Hello, world</Label>
      <Label size={size}>Hello, world</Label>
    </div>
  )
}
