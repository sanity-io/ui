import {Box, Button, Card, Flex, Text, Tooltip, useTheme} from '@sanity/ui'
import React from 'react'

export default function PropsStory() {
  const {dark} = useTheme().sanity.color

  return (
    <Card height="fill" scheme={dark ? 'light' : 'dark'}>
      <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
        <Tooltip
          content={
            <Box padding={2}>
              <Text size={1}>Tooltip content</Text>
            </Box>
          }
          placement="top"
          portal
          scheme={dark ? 'dark' : 'light'}
        >
          <Button mode="bleed" text="Hover me" />
        </Tooltip>
      </Flex>
    </Card>
  )
}
