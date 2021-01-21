import {Radio} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {boolean, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Radio',
  decorators: [withCentered, withKnobs],
}

const radioProps = () => ({
  id: 'radioStory',
  name: 'radioStory',
  checked: boolean('Checked?', false, 'Props'),
  disabled: boolean('Disabled?', false, 'Props'),
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
  readOnly: boolean('Read only', false, 'Props'),
})

export const plain = () => <Radio {...radioProps()} />
