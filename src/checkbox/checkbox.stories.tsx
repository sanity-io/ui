import {withCentered} from '~/storybook/decorators'
import {Checkbox} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {boolean, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Checkbox',
  decorators: [withCentered, withKnobs],
}

const checkboxProps = () => ({
  id: 'checkboxStory',
  isChecked: boolean('Checked?', false),
  disabled: boolean('Disabled?', false),
  onChange: action('onChange'),
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
})

export const plain = () => <Checkbox {...checkboxProps()} />
