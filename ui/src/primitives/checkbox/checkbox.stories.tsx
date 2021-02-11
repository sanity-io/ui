import {Box, Checkbox, Flex, Text} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {boolean, withKnobs} from '@storybook/addon-knobs'
import React, {useCallback, useState} from 'react'
import {Card} from '../card'
import {withCentered} from '$storybook/decorators'

export default {
  title: 'Atoms/Checkbox',
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
    readOnly: boolean('Read only', false, 'Props'),
  }

  return (
    <Card padding={4}>
      <Flex align="center" as="label">
        <Checkbox {...props} />
        <Box marginLeft={3}>
          <Text>Label</Text>
        </Box>
      </Flex>
    </Card>
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
    <Card padding={4}>
      <Flex align="center" as="label">
        <Checkbox
          checked={checked || false}
          indeterminate={indeterminate}
          onChange={handleChange}
        />
        <Box marginLeft={3}>
          <Text>Label</Text>
        </Box>
      </Flex>
    </Card>
  )
}

export const readOnly = () => {
  return (
    <Card padding={4}>
      <Flex align="center" as="label">
        <Checkbox id="checkbox-example" readOnly />
        <Box marginLeft={3}>
          <Text>Label</Text>
        </Box>
      </Flex>
    </Card>
  )
}
