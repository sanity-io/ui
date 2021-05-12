import {Button, Flex, Box, Text} from '@sanity/ui'
import React from 'react'
import {FigmaLogo} from '$components/assets/figmaLogo'

export function FigmaButton(props: any) {
  const {url} = props.node || {}

  if (!url) {
    return null
  }

  return (
    <Button as="a" href={url} mode="ghost" rel="noreferrer" target="_blank">
      <Flex padding={3}>
        <Text size={2}>
          <FigmaLogo />
        </Text>
        <Box marginLeft={3}>
          <Text size={2}>{props.node.title}</Text>
        </Box>
      </Flex>
    </Button>
  )
}
