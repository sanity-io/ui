import {withCentered} from '~/storybook/decorators'
import {Switch} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {withKnobs, boolean} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Switch',
  decorators: [withCentered, withKnobs],
}

const switchProps = () => ({
  id: 'switchStory',
  isChecked: boolean('Checked?', false),
  disabled: boolean('Disabled?', false),
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
})

export const plain = () => <Switch {...switchProps()} />
