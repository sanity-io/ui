import {withCentered} from '~/storybook/decorators'
import {Box, Button, Card, Code, Flex, Layer, Stack, Text, useLayer} from '@sanity/ui'
import React, {useCallback, useState} from 'react'
import {LayerProvider} from './provider'

export default {
  title: 'Utils/Layer',
  decorators: [withCentered],
}

export const plain = () => {
  return (
    <LayerProvider>
      <Example />
    </LayerProvider>
  )
}

function Example() {
  const layer = useLayer()
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <Card radius={2}>
      <Box padding={3}>
        <Text>
          <strong>Root layer</strong>
        </Text>
      </Box>
      <Box padding={3}>
        <Stack space={3}>
          <Code>
            depth={layer.depth}, size={layer.size}
          </Code>
          <Button mode="ghost" onClick={handleOpen}>
            Open layer 1
          </Button>
          {open && (
            <Layer style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Layer1 onClose={handleClose} />
            </Layer>
          )}
        </Stack>
      </Box>
    </Card>
  )
}

function Layer1({onClose}: {onClose: () => void}) {
  const layer = useLayer()
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <Card radius={2} shadow={3}>
      <Flex>
        <Box flex={1} padding={3}>
          <Text>
            <strong>Layer 1</strong>
          </Text>
        </Box>
        <Box padding={1}>
          <Button icon="close" mode="bleed" onClick={onClose} padding={2} />
        </Box>
      </Flex>
      <Box padding={3}>
        <Stack space={3}>
          <Code>
            depth={layer.depth}, size={layer.size}
          </Code>
          <Button mode="ghost" onClick={handleOpen}>
            Open layer 2
          </Button>
          {open && (
            <Layer style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Layer2 onClose={handleClose} />
            </Layer>
          )}
        </Stack>
      </Box>
    </Card>
  )
}

function Layer2({onClose}: {onClose: () => void}) {
  const layer = useLayer()

  return (
    <Card radius={2} shadow={3}>
      <Flex>
        <Box flex={1} padding={3}>
          <Text>
            <strong>Layer 2</strong>
          </Text>
        </Box>
        <Box padding={1}>
          <Button icon="close" mode="bleed" onClick={onClose} padding={2} />
        </Box>
      </Flex>
      <Box padding={3}>
        <Stack space={3}>
          <Code>
            depth={layer.depth}, size={layer.size}
          </Code>
        </Stack>
      </Box>
    </Card>
  )
}
