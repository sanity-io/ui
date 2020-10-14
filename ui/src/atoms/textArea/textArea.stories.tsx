import {TextArea} from '@sanity/ui'
import {withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/TextArea',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  return (
    <div style={{background: '#fff'}}>
      <TextArea />
    </div>
  )
}
