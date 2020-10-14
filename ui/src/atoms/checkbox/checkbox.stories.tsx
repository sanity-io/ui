import {Checkbox} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {boolean, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Checkbox',
  decorators: [withCentered, withKnobs],
}

const checkboxProps = () => {
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
  const props = checkboxProps()
  return <Checkbox {...props} />
}
