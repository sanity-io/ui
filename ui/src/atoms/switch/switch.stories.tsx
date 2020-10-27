import {Box, Card, Container, Flex, Switch, Text} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {withKnobs, boolean} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Switch',
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

  return (
    <Container width={0}>
      <Card as="label" padding={4} radius={2} shadow={2}>
        <Flex align="center">
          <Box flex={1} marginRight={3}>
            <Text>Click here to toggle</Text>
          </Box>
          <Box>
            <Switch {...props} style={{verticalAlign: 'top'}} />
          </Box>
        </Flex>
      </Card>
    </Container>
  )
}
