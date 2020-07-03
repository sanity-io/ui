import {withCentered} from '~/storybook/decorators'
import {Icon} from '@sanity/ui'
import {withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Icon',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  return (
    <div style={{background: '#fff'}}>
      <Icon symbol="add-circle" />
    </div>
  )
}
