import {Box, Button, Card, Flex, Text, Tooltip} from '@sanity/ui'
import {useSelect, useText} from '@sanity/ui-workshop'
import React from 'react'
import {WORKSHOP_PLACEMENT_OPTIONS} from '../../../__workshop__/constants'

export default function PropsStory() {
  const content = useText('Content', 'Tooltip content')
  const placement = useSelect('Placement', WORKSHOP_PLACEMENT_OPTIONS, 'top')

  return (
    <Card height="fill">
      <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
        <Tooltip
          content={
            <Box padding={2}>
              <Text size={1}>{content}</Text>
            </Box>
          }
          placement={placement}
          portal
        >
          <Button mode="bleed" text="Hover me" />
        </Tooltip>
      </Flex>
    </Card>
  )
}
