import icons from '@sanity/icons'
import {Box, Button, Card, Flex, Icon, IconSymbol, Text} from '@sanity/ui'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Icon',
  decorators: [withCentered, withKnobs],
}

const symbolOptions = Object.keys(icons).reduce((acc: {[key: string]: string}, key) => {
  acc[key] = key
  return acc
}, {})

export const plain = () => {
  const symbol = select('Symbol', symbolOptions, 'add-circle', 'Props') as IconSymbol

  return (
    <Card padding={2}>
      <Flex>
        <Card padding={2} marginRight={2} tone="transparent">
          <Text>Text</Text>
        </Card>
        <Card as="button" marginRight={2} padding={2} radius={2} tone="transparent">
          <Text>
            <Icon symbol={symbol} />
          </Text>
        </Card>
        <Box>
          <Button icon={symbol} padding={2} />
        </Box>
      </Flex>
    </Card>
  )
}
