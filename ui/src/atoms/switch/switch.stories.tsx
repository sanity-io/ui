import {Box, Flex, Switch, Text} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {boolean, withKnobs} from '@storybook/addon-knobs'
import React, {useCallback, useState} from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Switch',
  decorators: [withCentered, withKnobs],
}

export const props = () => {
  const props = {
    checked: boolean('Checked', false, 'Props'),
    disabled: boolean('Disabled', false, 'Props'),
    indeterminate: boolean('Indeterminate', false, 'Props'),
    onChange: action('onChange'),
    onFocus: action('onFocus'),
    onBlur: action('onBlur'),
  }

  return (
    <Flex align="center" as="label">
      <Switch {...props} />
      <Box marginLeft={3}>
        <Text>Label</Text>
      </Box>
    </Flex>
  )
}

export const example = () => {
  return <Example />
}

function Example() {
  const [checked, setChecked] = useState<boolean | undefined>(undefined)
  const [indeterminate] = useState(checked === undefined)
  const handleChange = useCallback(() => setChecked((val) => !val), [])

  return (
    <Flex align="center" as="label">
      <Switch checked={checked || false} indeterminate={indeterminate} onChange={handleChange} />
      <Box marginLeft={3}>
        <Text>Label</Text>
      </Box>
    </Flex>
  )
}
