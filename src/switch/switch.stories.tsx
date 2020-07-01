import {withCentered} from '~/storybook/decorators'
import {Switch} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {withKnobs, boolean} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Switch',
  decorators: [withCentered, withKnobs],
}

const switchProps = () => {
  const indeterminate = boolean('Indeterminate', false, 'Props')
  const checked = boolean('Checked', false, 'Props')

  return {
    checked: indeterminate ? undefined : checked,
    disabled: boolean('Disabled', false, 'Props'),
    onChange: action('onChange'),
    onFocus: action('onFocus'),
    onBlur: action('onBlur'),
  }
}

export const plain = () => {
  const props = switchProps()

  return <Switch {...props} />
}
