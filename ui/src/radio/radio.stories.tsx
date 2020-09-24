import {withCentered} from '~/storybook/decorators'
import {Radio} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {boolean, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Radio',
  decorators: [withCentered, withKnobs],
}

const radioProps = () => ({
  id: 'radioStory',
  name: 'radioStory',
  checked: boolean('Checked?', false),
  disabled: boolean('Disabled?', false),
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
})

export const plain = () => <Radio {...radioProps()} />
