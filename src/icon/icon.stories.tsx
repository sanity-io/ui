import {withCentered} from '~/storybook/decorators'
import {Icon} from '@sanity/ui'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Icon',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const size = select(
    'Size',
    {'1 (default)': undefined, '2': 2, '3': 3, '4': 4},
    undefined,
    'Props'
  )

  return (
    <div style={{background: '#fff'}}>
      <Icon symbol="add-circle" size={size} />
    </div>
  )
}
